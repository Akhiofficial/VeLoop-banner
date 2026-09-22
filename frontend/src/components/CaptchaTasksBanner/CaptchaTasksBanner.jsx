import React, { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CaptchaTasksBanner.module.css';
import InteractiveButton from '../ui/InteractiveButton/InteractiveButton';
import btnStyles from '../ui/InteractiveButton/InteractiveButton.module.css';

import { useParallax } from '../../hooks/useParallax';
import veCoinImg from '../../assets/images/refer-earn/VE_single_coin.webp';

gsap.registerPlugin(ScrollTrigger);

function CaptchaTasksBanner() {
  const bannerRef = useRef(null);
  const visualRef = useRef(null);
  const captchaPanelRef = useRef(null);
  const coinRef1 = useRef(null);
  const coinRef2 = useRef(null);
  const quickToRefs = useRef({ panelX: null, panelY: null, coinX: null, coinY: null });

  const [isTouch, setIsTouch] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const parallaxTrigger = isTouch ? { current: null } : bannerRef;
  useParallax(visualRef, parallaxTrigger, { y: -15 });

  useEffect(() => {
    const checkTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
    setIsTouch(checkTouch);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // --- SCROLL REVEAL (GSAP ScrollTrigger) ---
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!bannerRef.current || !visualRef.current) return;
      
      const contentElements = bannerRef.current.querySelectorAll(
        `.${styles.badge}, .${styles.heading}, .${styles.desc}, .${styles.ctaWrap}, .${styles.featureStrip}`
      );
      const heroElement = visualRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 85%",
          once: true,
        }
      });

      // hero: opacity 0->1, y 15->0, scale .97->1
      gsap.set(heroElement, { opacity: 0, y: 15, scale: 0.97 });
      tl.to(heroElement, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power3.out",
      }, 0);

      // content: opacity 0->1, y 12->0
      if (contentElements.length) {
        gsap.set(contentElements, { opacity: 0, y: 12 });
        tl.to(contentElements, {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.1,
        }, 0.1);
      }
    });

    if (prefersReducedMotion || checkTouch) {
      return () => mm.revert();
    }

    if (captchaPanelRef.current) {
      quickToRefs.current.panelX = gsap.quickTo(captchaPanelRef.current, 'x', { duration: 0.5, ease: 'power2.out' });
      quickToRefs.current.panelY = gsap.quickTo(captchaPanelRef.current, 'y', { duration: 0.5, ease: 'power2.out' });
    }
    
    // Group coins for quickTo
    const coins = [coinRef1.current, coinRef2.current].filter(Boolean);
    if (coins.length > 0) {
      quickToRefs.current.coinX = gsap.quickTo(coins, 'x', { duration: 0.6, ease: 'power2.out' });
      quickToRefs.current.coinY = gsap.quickTo(coins, 'y', { duration: 0.6, ease: 'power2.out' });
    }

    return () => {
      mm.revert();
      if (captchaPanelRef.current) gsap.set(captchaPanelRef.current, { x: 0, y: 0 });
      if (coins.length > 0) gsap.set(coins, { x: 0, y: 0 });
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${y}px`);

    const normX = (x / rect.width - 0.5);
    const normY = (y / rect.height - 0.5);

    const qt = quickToRefs.current;
    
    // Captcha card: ±3px
    if (qt.panelX) qt.panelX(normX * 6);
    if (qt.panelY) qt.panelY(normY * 6);
    
    // VE Coins: ±7px
    if (qt.coinX) qt.coinX(normX * 14);
    if (qt.coinY) qt.coinY(normY * 14);

  }, []);

  const handleMouseLeave = useCallback(() => {
    const qt = quickToRefs.current;
    if (qt.panelX) qt.panelX(0);
    if (qt.panelY) qt.panelY(0);
    if (qt.coinX) qt.coinX(0);
    if (qt.coinY) qt.coinY(0);
  }, []);

  const handleVerifyClick = () => {
    if (isVerifying || isVerified || captchaInput.length === 0) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  let instructionText = "Click the field to enter the captcha";
  let instructionClass = styles.instructionText;

  if (isVerified) {
    instructionText = "Verified ✓";
    instructionClass = `${styles.instructionText} ${styles.success}`;
  } else if (isVerifying) {
    instructionText = "Verifying...";
  } else if (captchaInput.length > 0) {
    instructionText = "Click Verify to submit";
    instructionClass = `${styles.instructionText} ${styles.highlight}`;
  } else if (isFocused) {
    instructionText = "Enter the captcha code";
    instructionClass = `${styles.instructionText} ${styles.highlight}`;
  }

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="ctb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cursorLight} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* ════ LEFT — CONTENT ════ */}
      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          VELOOP REWARDS
        </span>

        <h2 id="ctb-heading" className={styles.heading}>
          Captcha Tasks
        </h2>

        <p className={styles.desc}>
          Complete available captcha tasks accurately and earn rewards for eligible submissions.
        </p>

        <div className={styles.ctaWrap}>
          <InteractiveButton variant="primary" className={styles.cta}>
            <span>Start Task</span>
            <span className={`${btnStyles.arrow} ${styles.ctaArrow}`} aria-hidden="true">→</span>
          </InteractiveButton>
        </div>

        {/* Optional Feature Strip */}
        <div className={styles.featureStrip}>
          <div className={styles.featureItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Accurate Tasks</span>
          </div>
          <div className={styles.featureItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Verified Submissions</span>
          </div>
          <div className={styles.featureItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>VE Rewards</span>
          </div>
        </div>
      </div>

      {/* ════ RIGHT — HERO VISUAL ════ */}
      <div ref={visualRef} className={styles.visual} aria-hidden="true">
        <div className={styles.scene}>

          {/* Background Elements */}
          <div className={styles.sceneGlowPrimary} />
          <div className={styles.sceneGlowSecondary} />

          {/* Main CAPTCHA Panel */}
          <div ref={captchaPanelRef} className={styles.captchaPanel} tabIndex="0">
            <div className={styles.panelGlow} />

            {/* Header */}
            <div className={styles.panelHeader}>
              <div className={styles.headerTitle}>
                <svg className={styles.shieldIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Security Verification</span>
              </div>
              <div className={styles.headerDots}>
                <span /><span /><span />
              </div>
            </div>

            {/* CAPTCHA Challenge Image (simulated) */}
            <div className={styles.challengeBox}>
              <span className={styles.char} style={{ "--rand": 0 }}>K</span>
              <span className={styles.char} style={{ "--rand": 1 }}>7</span>
              <span className={styles.char} style={{ "--rand": 0.5 }}>M</span>
              <span className={styles.char} style={{ "--rand": 1.2 }}>4</span>
              <div className={styles.noiseOverlay}></div>
            </div>

            {/* Input & Action */}
            <div className={styles.inputArea}>
              <input 
                type="text"
                className={styles.inputField} 
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={4}
                placeholder="____"
                disabled={isVerified || isVerifying}
                aria-label="Enter Captcha"
              />

              <InteractiveButton
                variant="verify"
                className={`${styles.verifyBtn} ${isVerifying ? styles.verifying : ''} ${isVerified ? styles.verified : ''}`}
                onClick={handleVerifyClick}
                tabIndex="0"
                disabled={isVerified || isVerifying || captchaInput.length === 0}
              >
                <span className={styles.verifyBtnText}>Verify</span>
                <div className={styles.verifyBtnBg}></div>
                <svg className={styles.checkIconBtn} viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </InteractiveButton>
            </div>
            <div className={instructionClass} aria-live="polite">
              {instructionText}
            </div>
          </div>

          {/* Coins In Front (Limited to 2) */}
          <img ref={coinRef1} src={veCoinImg} alt="" className={`${styles.veCoin} ${styles.coinFront1}`} />
          <img ref={coinRef2} src={veCoinImg} alt="" className={`${styles.veCoin} ${styles.coinFront2}`} />

          {/* Reward Unlocked Popup */}
          <div className={styles.rewardPopup}>
            <img src={veCoinImg} alt="" className={styles.popupCoin} />
            <div className={styles.popupContent}>
              <span className={styles.popupTitle}>VE REWARD</span>
              <span className={styles.popupSub}>Unlocked</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CaptchaTasksBanner;

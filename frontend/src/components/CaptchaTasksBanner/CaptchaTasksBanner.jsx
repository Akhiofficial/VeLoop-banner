import React, { useRef, useCallback } from 'react';
import styles from './CaptchaTasksBanner.module.css';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import veCoinImg from '../../assets/images/refer-earn/VE_single_coin.png';

function CaptchaTasksBanner() {
  const bannerRef = useRef(null);
  const visualRef = useRef(null);

  useScrollReveal(bannerRef);
  useParallax(visualRef, bannerRef, { y: -15 });

  const handleMouseMove = useCallback((e) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="ctb-heading"
      onMouseMove={handleMouseMove}
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
          <button className={styles.cta}>
            <span>Start Task</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </button>
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

          {/* Coin Behind Panel */}
          <img src={veCoinImg} alt="" className={`${styles.veCoin} ${styles.coinBack}`} />

          {/* Main CAPTCHA Panel */}
          <div className={styles.captchaPanel}>
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
              <div className={styles.inputField}>
                <span className={styles.inputText}>K7M4</span>
                <span className={styles.cursor}>|</span>
              </div>

              <button className={styles.verifyBtn} tabIndex="-1">
                <span className={styles.verifyBtnText}>Verify</span>
                <div className={styles.verifyBtnBg}></div>
                <svg className={styles.checkIconBtn} viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Animated User Cursor */}
            <svg className={styles.userCursor} viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4-4.4 4.8z" />
            </svg>
          </div>

          {/* Coins In Front */}
          <img src={veCoinImg} alt="" className={`${styles.veCoin} ${styles.coinFront1}`} />
          <img src={veCoinImg} alt="" className={`${styles.veCoin} ${styles.coinFront2}`} />

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

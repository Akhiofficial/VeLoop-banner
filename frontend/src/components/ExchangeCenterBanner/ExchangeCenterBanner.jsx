import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ExchangeCenterBanner.module.css';

import walletPng from '../../assets/images/exchange-center/wallets.webp';
import veCoinImg from '../../assets/images/refer-earn/VE_single_coin.webp';
import InteractiveButton from '../ui/InteractiveButton/InteractiveButton';
import btnStyles from '../ui/InteractiveButton/InteractiveButton.module.css';

gsap.registerPlugin(ScrollTrigger);

function ExchangeCenterBanner() {
  const bannerRef = useRef(null);
  const walletRef = useRef(null);
  
  const coin1Ref = useRef(null);
  const coin2Ref = useRef(null);
  const coin3Ref = useRef(null);
  
  const optionsRef = useRef(null);

  // -- CURSOR LIGHT MOUSE TRACKING --
  const handleMouseMove = useCallback((e) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    bannerRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // CSS opacity transition handles the fade-out
  }, []);

  // -- GSAP ENTRANCE SCROLL --
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner || !walletRef.current || !optionsRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const contentElements = banner.querySelectorAll(`.${styles.badge}, .${styles.heading}, .${styles.desc}, .${styles.ctaWrap}`);
    const rewardCards = optionsRef.current.children;
    const coins = [coin1Ref.current, coin2Ref.current, coin3Ref.current].filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: banner,
        start: 'top 85%',
        once: true
      }
    });

    // Initial states
    gsap.set(contentElements, { opacity: 0, y: 15 });
    gsap.set(walletRef.current, { opacity: 0, y: 20, scale: 0.97 });
    gsap.set(rewardCards, { opacity: 0, y: 10 });
    gsap.set(coins, { opacity: 0, scale: 0.8 });

    // Entrance Animation
    tl.to(contentElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
      .to(walletRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, "-=0.4")
      .to(coins, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, "-=0.5")
      .to(rewardCards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, "-=0.5");

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === banner) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="ecb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cursorLight} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />
      
      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          VELOOP REWARDS
        </span>
        
        <h2 id="ecb-heading" className={styles.heading}>
          Exchange Center
        </h2>
        
        <p className={styles.desc}>
          Explore available redemption options and exchange eligible VEs for supported rewards.
        </p>
        
        <div className={styles.ctaWrap}>
          <InteractiveButton variant="primary" className={styles.cta}>
            <span>Open Exchange Center</span>
            <span className={`${btnStyles.arrow} ${styles.ctaArrow}`} aria-hidden="true">→</span>
          </InteractiveButton>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.scene}>
          {/* Independent Coins */}
          <div className={styles.walletComposition}>
            {/* Coins — absolutely positioned relative to walletComposition */}
            <img 
              ref={coin1Ref}
              src={veCoinImg} 
              alt="" 
              className={`${styles.veCoin} ${styles.coinMain}`} 
            />
            <img 
              ref={coin2Ref}
              src={veCoinImg} 
              alt="" 
              className={`${styles.veCoin} ${styles.coinSupport1}`} 
            />
            <img 
              ref={coin3Ref}
              src={veCoinImg} 
              alt="" 
              className={`${styles.veCoin} ${styles.coinSupport2}`} 
            />

            {/* Wallet PNG — depth via filter only, no visible wrapper */}
            <img 
              ref={walletRef}
              src={walletPng} 
              alt="VE Wallet" 
              className={styles.walletHero} 
            />
          </div>

          <div className={styles.connector} />

          {/* Reward Options Below Wallet */}
          <div ref={optionsRef} className={styles.rewardOptions}>
            
            <InteractiveButton variant="option" as="div" className={styles.rewardCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              UPI
            </InteractiveButton>

            <InteractiveButton variant="option" as="div" className={styles.rewardCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
                <rect x="3" y="8" width="18" height="13" rx="1" />
                <path d="M12 8v13" />
                <path d="M19 8c-1.5-2-5-2-7 0-2-2-5.5-2-7 0" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
              Gift Card
            </InteractiveButton>

            <InteractiveButton variant="option" as="div" className={styles.rewardCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Reward
            </InteractiveButton>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ExchangeCenterBanner;

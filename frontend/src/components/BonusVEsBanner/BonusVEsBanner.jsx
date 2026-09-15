import React, { useRef, useEffect } from 'react';
import styles from './BonusVEsBanner.module.css';
import veCoinImg from '../../assets/images/refer-earn/VE_single_coin.png';
import getExtraImg from '../../assets/images/get-extra/get-extra-illustrate.png';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

function BonusVEsBanner() {
  const bannerRef = useRef(null);
  const visualRef = useRef(null);

  useScrollReveal(bannerRef);
  useParallax(visualRef, bannerRef, { y: -15 });

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const handleMouseMove = (e) => {
      const rect = banner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      banner.style.setProperty('--mouse-x', `${x}px`);
      banner.style.setProperty('--mouse-y', `${y}px`);
    };

    banner.addEventListener('mousemove', handleMouseMove);
    return () => {
      banner.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={bannerRef} className={styles.banner} aria-labelledby="bvb-heading">
      <div className={styles.cursorLight} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          VELOOP REWARDS
          <span className={styles.badgeSecondary}>BONUS</span>
        </span>

        <h2 id="bvb-heading" className={styles.heading}>
          <span className={styles.headingWhite}>Get Extra</span>{' '}
          <span className={styles.headingGradient}>VEs</span>
        </h2>

        <p className={styles.desc}>
          Complete eligible activities and unlock additional VEs through special bonus opportunities.
        </p>

        <button className={styles.cta}>
          <span>Explore Bonus</span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.scene}>
          
          {/* Sparkles */}
          <div className={`${styles.sparkle} ${styles.sparkle1}`}>✨</div>
          <div className={`${styles.sparkle} ${styles.sparkle2}`}>✨</div>
          <div className={`${styles.sparkle} ${styles.sparkle3}`}>✨</div>

          {/* VE Coins */}
          <div className={`${styles.coin} ${styles.coin1}`}>VE</div>
          <div className={`${styles.coin} ${styles.coin2}`}>VE</div>
          <div className={`${styles.coin} ${styles.coin3}`}>VE</div>
          <div className={`${styles.coin} ${styles.coin4}`}>VE</div>

          {/* Main Reward Box */}
          <div className={styles.rewardBoxWrap}>
            <div className={styles.rewardBox}>
              <div className={styles.boxIcon}>
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="giftGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#f5c842" />
                       <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                  <path d="M16 28h32v24a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V28z" fill="rgba(124, 106, 247, 0.2)" stroke="#7c6af7" strokeWidth="2"/>
                  <path d="M12 20a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v8H12v-8z" fill="rgba(124, 106, 247, 0.4)" stroke="#7c6af7" strokeWidth="2"/>
                  <path d="M28 28h8v28h-8z" fill="url(#giftGrad)"/>
                  <path d="M28 16h8v12h-8z" fill="url(#giftGrad)"/>
                  <path d="M12 22h40v4H12z" fill="url(#giftGrad)"/>
                  <path d="M32 16c-6-6-14-2-12 6 1.5 6 12 10 12 10s10.5-4 12-10c2-8-6-12-12-6z" fill="url(#giftGrad)"/>
                </svg>
              </div>
              <div className={styles.boxTextWrap}>
                <span className={styles.boxPlus}>+</span>
                <span className={styles.boxVe}>VE</span>
              </div>
            </div>
            
            <div className={styles.bonusBadge}>✦ BONUS ✦</div>
            <div className={styles.multiplier}>× BONUS</div>
          </div>

          {/* Decorative Progress */}
          <div className={styles.meterWrap}>
            <span className={styles.meterLabel}>BONUS PROGRESS</span>
            <div className={styles.meterTrack}>
              <div className={styles.meterFill} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BonusVEsBanner;

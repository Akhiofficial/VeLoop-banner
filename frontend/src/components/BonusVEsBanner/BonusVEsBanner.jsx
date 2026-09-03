import React from 'react';
import styles from './BonusVEsBanner.module.css';

function BonusVEsBanner() {
  return (
    <section className={styles.banner} aria-labelledby="bvb-heading">
      <div className={styles.ambientGlow} aria-hidden="true" />
      
      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          VELOOP REWARDS
        </span>
        
        <h2 id="bvb-heading" className={styles.heading}>
          Get Extra VEs
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
          <svg className={`${styles.sparkle} ${styles.sparkle1}`} viewBox="0 0 24 24">
            <path d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />
          </svg>
          <svg className={`${styles.sparkle} ${styles.sparkle2}`} viewBox="0 0 24 24">
            <path d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />
          </svg>
          <svg className={`${styles.sparkle} ${styles.sparkle3}`} viewBox="0 0 24 24">
            <path d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />
          </svg>

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

          {/* Reward Meter */}
          <div className={styles.meterWrap}>
            <span className={styles.meterLabel}>Reward Progress</span>
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

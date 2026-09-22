import React, { useRef, useEffect } from 'react';
import styles from './BonusVEsBanner.module.css';
import veCoinImg from '../../assets/images/refer-earn/VE_single_coin.webp';
import getExtraImg from '../../assets/images/get-extra/get-extra-illustrate.webp';
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

          <div className={styles.glowBg1} />
          <div className={styles.glowBg2} />

          {/* Sparkles */}
          <div className={`${styles.sparkle} ${styles.sparkle1}`}>✨</div>
          <div className={`${styles.sparkle} ${styles.sparkle2}`}>✨</div>
          <div className={`${styles.sparkle} ${styles.sparkle3}`}>✨</div>

          {/* VE Coins — PNG assets */}
          <img src={veCoinImg} alt="" className={`${styles.coin} ${styles.coin1}`} />
          <img src={veCoinImg} alt="" className={`${styles.coin} ${styles.coin2}`} />
          <img src={veCoinImg} alt="" className={`${styles.coin} ${styles.coin3}`} />
          <img src={veCoinImg} alt="" className={`${styles.coin} ${styles.coin4}`} />
          <img src={veCoinImg} alt="" className={`${styles.coin} ${styles.coin5}`} />

          {/* Main Reward Core */}
          <div ref={visualRef} className={styles.rewardCoreWrap}>
            <div className={styles.rewardCore}>
              <img src={getExtraImg} alt="Bonus Core" className={styles.coreImage} />
            </div>

            <div className={styles.bonusBadge}>+ BONUS</div>
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

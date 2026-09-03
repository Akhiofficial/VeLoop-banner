import React from 'react';
import styles from './ExchangeCenterBanner.module.css';

function ExchangeCenterBanner() {
  return (
    <section className={styles.banner} aria-labelledby="ecb-heading">
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
        
        <button className={styles.cta}>
          <span>Open Exchange Center</span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.scene}>
          
          {/* Wallet (Origin) */}
          <div className={styles.walletNode}>
             <div className={styles.walletIconWrap}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.walletIcon}>
                   <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                   <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                   <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
             </div>
             <span className={styles.walletLabel}>VE Balance</span>
          </div>

          {/* Animated Path */}
          <div className={styles.flowPath}>
             <div className={styles.flowLine}></div>
             <div className={styles.flowParticle}></div>
          </div>

          {/* Redemption Options (Destinations) */}
          <div className={styles.optionsColumn}>
            
            <div className={`${styles.optionCard} ${styles.upiCard}`}>
               <div className={styles.cardGlow} />
               <span className={styles.optionLabel}>
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.upiIcon}>
                   <rect x="2" y="5" width="20" height="14" rx="2" />
                   <line x1="2" y1="10" x2="22" y2="10" />
                 </svg>
                 UPI
               </span>
            </div>

            <div className={`${styles.optionCard} ${styles.giftCard}`}>
               <div className={styles.cardGlow} />
               <span className={styles.optionLabel}>
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.giftIcon}>
                   <rect x="3" y="8" width="18" height="13" rx="1" />
                   <path d="M12 8v13" />
                   <path d="M19 8c-1.5-2-5-2-7 0-2-2-5.5-2-7 0" />
                   <line x1="3" y1="12" x2="21" y2="12" />
                 </svg>
                 Gift Card
               </span>
            </div>

            <div className={`${styles.optionCard} ${styles.rewardCard}`}>
               <div className={styles.cardGlow} />
               <span className={styles.optionLabel}>
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.rewardIcon}>
                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                 </svg>
                 Reward
               </span>
            </div>

          </div>

          {/* Floating VE Coins */}
          <div className={`${styles.coin} ${styles.coin1}`}>VE</div>
          <div className={`${styles.coin} ${styles.coin2}`}>VE</div>
          
          {/* Success / Received Indicator */}
          <div className={styles.receivedBadge}>
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
             Reward Received
          </div>

        </div>
      </div>
    </section>
  );
}

export default ExchangeCenterBanner;

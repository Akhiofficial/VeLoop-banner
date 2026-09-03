import React from 'react';
import styles from './CaptchaTasksBanner.module.css';

function CaptchaTasksBanner() {
  return (
    <section className={styles.banner} aria-labelledby="ctb-heading">
      <div className={styles.ambientGlow} aria-hidden="true" />
      
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
        
        <button className={styles.cta}>
          <span>Start Task</span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.scene}>
          
          {/* Main CAPTCHA Panel */}
          <div className={styles.captchaPanel}>
            
            {/* Header */}
            <div className={styles.panelHeader}>
              <svg className={styles.shieldIcon} viewBox="0 0 24 24" fill="none">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Security Verification</span>
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
              
              <button className={styles.verifyBtn}>
                <span className={styles.verifyBtnText}>Verify</span>
                <div className={styles.verifyBtnBg}></div>
                <svg className={styles.checkIconBtn} viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Animated User Cursor */}
            <svg className={styles.userCursor} viewBox="0 0 24 24" fill="currentColor">
               <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4-4.4 4.8z" />
            </svg>
            
          </div>
          
          {/* Reward Unlocked Popup */}
          <div className={styles.rewardPopup}>
             <div className={styles.rewardCoin}>VE</div>
             <span className={styles.rewardText}>Reward Unlocked</span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CaptchaTasksBanner;

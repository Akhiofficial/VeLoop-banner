// ReferEarnBanner — Banner 01: Refer & Earn
// Design: premium fintech, minimalistic, interactive (mouse parallax)
// Structure: two-column layout — content left, illustration right

import { useState, useRef } from 'react';
import styles from './ReferEarnBanner.module.css';
import referIllustration from '../../assets/images/refer-earn/refer-earn-illustrate (2).png';

function ReferEarnBanner() {
  // Mouse position drives a very subtle CSS parallax on the illustration.
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  function handleMouseMove(e) {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalise to -1…+1 then scale to ±10px
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMouse({ x, y });
  }

  function handleMouseLeave() {
    setMouse({ x: 0, y: 0 });
  }

  const steps = [
    { num: '01', label: 'Invite Friend' },
    { num: '02', label: 'They Earn' },
    { num: '03', label: 'You Earn' },
  ];

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--mx': `${mouse.x}px`, '--my': `${mouse.y}px` }}
      aria-labelledby="reb-heading"
    >
      {/* Dot-mesh overlay */}
      <div className={styles.mesh} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ═══ LEFT — CONTENT ══════════════════════════════════ */}
        <div className={styles.content}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            VELOOP Rewards
          </span>

          <h1 id="reb-heading" className={styles.heading}>
            Refer &amp; Earn
          </h1>

          <p className={styles.desc}>
            Invite your friends to VELOOP Rewards and unlock exciting rewards
            when they complete eligible activities.
          </p>

          <ol className={styles.steps} aria-label="How it works">
            {steps.map((step, i) => (
              <li key={i} className={`${styles.step} ${i === 2 ? styles.stepHighlight : ''}`}>
                <span className={styles.stepNum} aria-hidden="true">{step.num}</span>
                <span className={styles.stepLabel}>{step.label}</span>
                {i < steps.length - 1 && (
                  <span className={styles.stepArrow} aria-hidden="true">→</span>
                )}
              </li>
            ))}
          </ol>

          <div className={styles.rewardHighlight} aria-label="Possible rewards">
            <span className={styles.rewardHighlightLabel}>Referral Rewards</span>
            <div className={styles.rewardChips}>
              <span className={styles.rewardChip}>VE</span>
              <span className={styles.rewardChip}>SPIN</span>
              <span className={styles.rewardChip}>GEM</span>
              <span className={styles.rewardChip}>XP</span>
            </div>
          </div>

          <button
            className={styles.cta}
            aria-label="Start referring friends and earn rewards"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Refer &amp; Earn</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </button>
        </div>

        {/* ═══ RIGHT — ILLUSTRATION ══════════════════════════════════ */}
        <div className={styles.visual} aria-hidden="true">
          {/* Ambient purple glow behind illustration */}
          <div className={styles.ambientGlow} />

          {/* The actual Refer & Earn illustration */}
          <div className={styles.illustrationWrap}>
            <img
              src={referIllustration}
              alt="Refer a friend and earn rewards"
              className={styles.illustration}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReferEarnBanner;

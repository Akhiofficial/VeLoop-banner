/**
 * ReferEarnBanner — Banner 01: Refer & Earn
 *
 * Structure:
 *   LEFT  40% — badge · heading · description · referral flow · chips · CTA
 *   RIGHT 60% — HeroVisual (PNG composition)
 */

import { useState, useRef } from 'react';

import styles       from './ReferEarnBanner.module.css';
import HeroVisual   from './HeroVisual';
import ReferralFlow from './ReferralFlow';
import RewardChips  from './RewardChips';
import CtaRow       from './CtaRow';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

function ReferEarnBanner() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);
  const visualRef = useRef(null);

  useScrollReveal(bannerRef);
  useParallax(visualRef, bannerRef, { y: -15 });

  function handleMouseMove(e) {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Original HeroVisual mouse tracking
    setMouse({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 14,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 14,
    });

    // New CSS cursor light tracking
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }

  function handleMouseLeave() { 
    setMouse({ x: 0, y: 0 }); 
  }

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="reb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cursorLight} aria-hidden="true" />

      {/* Dot-mesh */}
      <div className={styles.mesh} aria-hidden="true" />

      <div className={styles.body}>
        {/* ════ LEFT — CONTENT ════════════════════════ */}
        <div className={styles.content}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            VELOOP REWARDS
          </span>

          <h1 id="reb-heading" className={styles.heading}>
            <span className={styles.headingWhite}>Invite Friends,</span>
            <span className={styles.headingAccent}>Earn Rewards</span>
          </h1>

          <p className={styles.desc}>
            Invite your friends to VELOOP Rewards and unlock exciting rewards
            when they complete eligible activities.
          </p>

          <div>
            <ReferralFlow />
          </div>

          <div>
            <RewardChips />
          </div>

          <div className={styles.cta}>
            <CtaRow />
          </div>
        </div>

        {/* ════ RIGHT — PNG HERO ════════════════════════ */}
        <div ref={visualRef} className={styles.visual}>
          <HeroVisual mouseX={mouse.x} mouseY={mouse.y} />
        </div>
      </div>
    </section>
  );
}

export default ReferEarnBanner;

/**
 * ReferEarnBanner — Banner 01: Refer & Earn
 *
 * Structure:
 *   LEFT  40% — badge · heading · description · referral flow · chips · CTA
 *   RIGHT 60% — HeroVisual (PNG composition)
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import styles       from './ReferEarnBanner.module.css';
import HeroVisual   from './HeroVisual';
import ReferralFlow from './ReferralFlow';
import RewardChips  from './RewardChips';
import CtaRow       from './CtaRow';

/* Content stagger variants */
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.1 } },
};
const itemV = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ReferEarnBanner() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  function handleMouseMove(e) {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 14,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 14,
    });
  }

  function handleMouseLeave() { setMouse({ x: 0, y: 0 }); }

  return (
    <motion.section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="reb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Dot-mesh */}
      <div className={styles.mesh} aria-hidden="true" />

      <div className={styles.body}>
        {/* ════ LEFT — CONTENT ════════════════════════ */}
        <motion.div
          className={styles.content}
          variants={containerV}
          initial="hidden"
          animate="show"
        >
          <motion.span className={styles.badge} variants={itemV}>
            <span className={styles.badgeDot} />
            VELOOP REWARDS
          </motion.span>

          <motion.h1 id="reb-heading" className={styles.heading} variants={itemV}>
            <span className={styles.headingWhite}>Invite Friends,</span>
            <span className={styles.headingAccent}>Earn Rewards</span>
          </motion.h1>

          <motion.p className={styles.desc} variants={itemV}>
            Invite your friends to VELOOP Rewards and unlock exciting rewards
            when they complete eligible activities.
          </motion.p>

          <motion.div variants={itemV}>
            <ReferralFlow />
          </motion.div>

          <motion.div variants={itemV}>
            <RewardChips />
          </motion.div>

          <motion.div variants={itemV}>
            <CtaRow />
          </motion.div>
        </motion.div>

        {/* ════ RIGHT — PNG HERO ════════════════════════ */}
        <HeroVisual mouseX={mouse.x} mouseY={mouse.y} />
      </div>
    </motion.section>
  );
}

export default ReferEarnBanner;

/**
 * ReferEarnBanner — Banner 01: Refer & Earn
 *
 * Architecture:
 *   ReferEarnBanner (shell, mouse parallax, staggered entrance)
 *   ├── HeroVisual      (illustration, ambient glow, coins, reward panel)
 *   ├── ReferralFlow    (steps 01→02→03, travelling orb)
 *   ├── RewardChips     (VE / SPIN / GEM / XP chips)
 *   ├── CtaRow          (primary gold CTA + secondary copy link)
 *   └── FeatureStrip    (bottom 4-item strip)
 *
 * Animations (Framer Motion):
 *   - Banner entrance: fade + y slide, 0.55s easeOut
 *   - Content column: staggered children, fade + x slide
 *   - HeroVisual float: slow y oscillation, 7s infinite
 *   - Coins: independent float + rotate, infinite
 *   - Reward panel: spring scale entrance, delay 0.75s
 *   - Referral flow orb: left keyframes 01→02→03, 5.5s loop
 *   - All disabled when prefers-reduced-motion is set
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import styles from './ReferEarnBanner.module.css';
import HeroVisual    from './HeroVisual';
import ReferralFlow  from './ReferralFlow';
import RewardChips   from './RewardChips';
import CtaRow        from './CtaRow';
import FeatureStrip  from './FeatureStrip';

/* Framer Motion variants for staggered content entrance */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' } },
};

function ReferEarnBanner() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  function handleMouseMove(e) {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
    setMouse({ x, y });
  }

  function handleMouseLeave() {
    setMouse({ x: 0, y: 0 });
  }

  return (
    <motion.section
      ref={bannerRef}
      className={styles.banner}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="reb-heading"
      /* Banner entrance */
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Dot-mesh overlay */}
      <div className={styles.mesh} aria-hidden="true" />

      {/* ── Main two-column body ── */}
      <div className={styles.body}>

        {/* ════ LEFT — CONTENT ════════════════════════════════════ */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.span className={styles.badge} variants={itemVariants}>
            <span className={styles.badgeDot} />
            VELOOP REWARDS
          </motion.span>

          {/* Heading */}
          <motion.h1 id="reb-heading" className={styles.heading} variants={itemVariants}>
            <span className={styles.headingWhite}>Refer</span>
            <span className={styles.headingAccent}>&amp; Earn</span>
          </motion.h1>

          {/* Description */}
          <motion.p className={styles.desc} variants={itemVariants}>
            Invite your friends to VELOOP Rewards and unlock exciting rewards
            when they complete eligible activities.
          </motion.p>

          {/* Referral journey */}
          <motion.div variants={itemVariants}>
            <ReferralFlow />
          </motion.div>

          {/* Reward chips */}
          <motion.div variants={itemVariants}>
            <RewardChips />
          </motion.div>

          {/* CTA row */}
          <motion.div variants={itemVariants}>
            <CtaRow />
          </motion.div>
        </motion.div>

        {/* ════ RIGHT — HERO VISUAL ════════════════════════════════ */}
        <HeroVisual mouseX={mouse.x} mouseY={mouse.y} />

      </div>

      {/* ════ BOTTOM FEATURE STRIP ══════════════════════════════════ */}
      <FeatureStrip />
    </motion.section>
  );
}

export default ReferEarnBanner;

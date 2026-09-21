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

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

/* ── Stagger container for content children ─────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function ReferEarnBanner() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);
  const visualRef = useRef(null);

  useScrollReveal(bannerRef, { yDesktop: 45, yMobile: 18 });
  useParallax(visualRef, bannerRef, { y: -15 });

  function handleMouseMove(e) {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMouse({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 14,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 14,
    });

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${y}px`);
  }

  function handleMouseLeave() {
    setMouse({ x: 0, y: 0 });
  }

  return (
    <motion.section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="reb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      /* Banner entry animation on mount */
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.cursorLight} aria-hidden="true" />

      {/* Dot-mesh */}
      <div className={styles.mesh} aria-hidden="true" />

      <div className={styles.body}>
        {/* ════ LEFT — CONTENT ════════════════════════ */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span className={styles.badge} variants={itemVariants}>
            <span className={styles.badgeDot} />
            VELOOP REWARDS
          </motion.span>

          <motion.h1 id="reb-heading" className={styles.heading} variants={itemVariants}>
            <span className={styles.headingWhite}>Invite Friends,</span>
            <span className={styles.headingAccent}>Earn Rewards</span>
          </motion.h1>

          <motion.p className={styles.desc} variants={itemVariants}>
            Invite your friends to VELOOP Rewards and unlock exciting rewards
            when they complete eligible activities.
          </motion.p>

          <motion.div variants={itemVariants}>
            <ReferralFlow />
          </motion.div>

          <motion.div variants={itemVariants}>
            <RewardChips />
          </motion.div>

          <motion.div className={styles.cta} variants={itemVariants}>
            <CtaRow />
          </motion.div>
        </motion.div>

        {/* ════ RIGHT — PNG HERO ════════════════════════ */}
        <div ref={visualRef} className={styles.visual}>
          <HeroVisual mouseX={mouse.x} mouseY={mouse.y} />
        </div>
      </div>
    </motion.section>
  );
}

export default ReferEarnBanner;

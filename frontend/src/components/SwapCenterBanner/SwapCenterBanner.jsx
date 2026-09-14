// SwapCenterBanner — Banner 02: Swap Center
// Design: minimal premium fintech — SOURCE ⇄ TARGET
// Left: badge · headline · desc · CTA   (40%)
// Right: purple coin  ⇄  gold coin      (60%)
// Effects: coin hover · swap arrow pulse · ambient glows
// Cursor light is handled page-wide in RewardsPage

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './SwapCenterBanner.module.css';
import coinLeft  from '../../assets/images/swaps-card/Swap-coin-left.png';   // gold VE
import coinRight from '../../assets/images/swaps-card/swap-coin-right.png';  // purple SVE

/* ─── Framer Motion variants ─────────────────────────────────── */
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const itemV = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const visualV = {
  hidden: { opacity: 0, scale: 0.93 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.65, ease: 'easeOut', delay: 0.1 } },
};

/* ─── Subtle background sparkle positions ────────────────────── */
const sparkles = [
  { x: '12%', y: '20%', size: 5, delay: 0 },
  { x: '88%', y: '16%', size: 7, delay: 0.8 },
  { x: '78%', y: '80%', size: 5, delay: 1.4 },
  { x: '20%', y: '78%', size: 4, delay: 0.4 },
];

/* ─── Component ──────────────────────────────────────────────── */
function SwapCenterBanner() {
  const bannerRef = useRef(null);

  /* Parallax spring — scene shifts subtly on mouse */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 80, damping: 22 });
  const my = useSpring(rawY, { stiffness: 80, damping: 22 });
  const sceneX = useTransform(mx, v => v * 10);
  const sceneY = useTransform(my, v => v * 6);

  const handleMouseMove = useCallback((e) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    rawX.set((px / rect.width  - 0.5) * 2);
    rawY.set((py / rect.height - 0.5) * 2);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="scb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* ── Dot-mesh texture ── */}
      <div className={styles.mesh} aria-hidden="true" />

      {/* ════ MAIN BODY — two-column grid ════ */}
      <div className={styles.inner}>

        {/* ════ LEFT — CONTENT ════ */}
        <motion.div
          className={styles.content}
          variants={containerV}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.span className={styles.badge} variants={itemV}>
            <span className={styles.badgeIcon} aria-hidden="true">
              {/* swap icon */}
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                <path
                  d="M2 5h10M2 5l2.5-2.5M2 5l2.5 2.5M14 11H4M14 11l-2.5-2.5M14 11l-2.5 2.5"
                  stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </span>
            SWAP CENTER
          </motion.span>

          {/* Headline */}
          <motion.h2 id="scb-heading" className={styles.heading} variants={itemV}>
            <span className={styles.headingWhite}>Swap Smarter,</span>
            <span className={styles.headingAccent}>Manage Your Rewards</span>
          </motion.h2>

          {/* Description */}
          <motion.p className={styles.desc} variants={itemV}>
            Convert eligible reward balances between supported currencies
            and manage your rewards more efficiently.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemV}>
            <motion.button
              className={styles.cta}
              aria-label="Open Swap Center to convert your reward currencies"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -3, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span>Open Swap Center</span>
              <motion.span
                className={styles.ctaArrow}
                aria-hidden="true"
                variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >→</motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ════ RIGHT — HERO VISUAL ════ */}
        <motion.div
          className={styles.visual}
          variants={visualV}
          initial="hidden"
          animate="show"
          aria-hidden="true"
        >
          {/* Sparkle dots */}
          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              className={styles.sparkle}
              style={{ left: s.x, top: s.y, '--sz': `${s.size}px` }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.3, 0.5] }}
              transition={{ duration: 2.8, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Scene — parallax wrapper */}
          <motion.div
            className={styles.scene}
            style={{ x: sceneX, y: sceneY }}
          >

            {/* ── PURPLE GLOW behind left coin ── */}
            <div className={styles.purpleGlow} />

            {/* ── GOLD GLOW behind right coin ── */}
            <div className={styles.goldGlow} />

            {/* ════ COIN ROW ════ */}
            <div className={styles.coinRow}>

              {/* ── SOURCE: Purple SVE coin ── */}
              <motion.div
                className={`${styles.coinWrapper} ${styles.coinWrapperPurple}`}
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.img
                  src={coinRight}
                  alt="SVE reward currency"
                  draggable="false"
                  className={styles.coinImg}
                  animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className={styles.coinLabel}>
                  <span className={styles.coinTicker} style={{ color: '#c4b5fd' }}>SVE</span>
                  <span className={styles.coinSub}>Reward Currency</span>
                </div>
              </motion.div>

              {/* ── SWAP ARROW — centre ── */}
              <div className={styles.arrowWrap}>
                <motion.div
                  className={styles.arrowDisc}
                  animate={{
                    boxShadow: [
                      '0 0 16px rgba(124,58,237,0.22), 0 0 0 rgba(245,200,66,0)',
                      '0 0 28px rgba(124,58,237,0.45), 0 0 18px rgba(245,200,66,0.18)',
                      '0 0 16px rgba(124,58,237,0.22), 0 0 0 rgba(245,200,66,0)',
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Outer ring pulse */}
                  <motion.div
                    className={styles.arrowRing}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.15, 0.6] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* SVG swap arrows */}
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    width="30"
                    height="30"
                    className={styles.swapSvg}
                  >
                    <defs>
                      <linearGradient id="scbArrow1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#f5c842" />
                      </linearGradient>
                      <linearGradient id="scbArrow2" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%"   stopColor="#f5c842" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    {/* Top: purple → gold */}
                    <path d="M8 15h18"     stroke="url(#scbArrow1)" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M22 10l6 5-6 5" stroke="url(#scbArrow1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    {/* Bottom: gold → purple */}
                    <path d="M32 25H14"    stroke="url(#scbArrow2)" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M18 30l-6-5 6-5" stroke="url(#scbArrow2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </motion.div>
              </div>

              {/* ── TARGET: Gold VE coin ── */}
              <motion.div
                className={`${styles.coinWrapper} ${styles.coinWrapperGold}`}
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.img
                  src={coinLeft}
                  alt="VE reward currency"
                  draggable="false"
                  className={styles.coinImg}
                  animate={{ y: [0, -11, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
                  transition={{ duration: 6.3, delay: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className={styles.coinLabel}>
                  <span className={styles.coinTicker} style={{ color: '#fcd34d' }}>VE</span>
                  <span className={styles.coinSub}>Reward Currency</span>
                </div>
              </motion.div>

            </div>{/* /coinRow */}

          </motion.div>{/* /scene */}
        </motion.div>{/* /visual */}

      </div>{/* /inner */}
    </motion.section>
  );
}

export default SwapCenterBanner;

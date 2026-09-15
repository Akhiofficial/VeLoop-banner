// SwapCenterBanner — Banner 02: Swap Center
// Design: minimal premium fintech — SOURCE ⇄ TARGET
// Left: badge · headline · desc · CTA   (40%)
// Right: purple coin  ⇄  gold coin      (60%)
// Effects: coin hover · swap arrow pulse · ambient glows
// Cursor light is handled page-wide in RewardsPage

import { useRef, useCallback } from 'react';
import styles from './SwapCenterBanner.module.css';
import coinLeft  from '../../assets/images/swaps-card/Swap-coin-left.png';   // gold VE
import coinRight from '../../assets/images/swaps-card/swap-coin-right.png';  // purple SVE

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

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
  const visualRef = useRef(null);

  useScrollReveal(bannerRef);
  useParallax(visualRef, bannerRef, { y: -15 });

  const handleMouseMove = useCallback((e) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Cursor light
    bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${y}px`);
    
    // Very subtle mouse parallax via css vars for the visual
    bannerRef.current.style.setProperty('--scene-x', `${(x / rect.width - 0.5) * 10}px`);
    bannerRef.current.style.setProperty('--scene-y', `${(y / rect.height - 0.5) * 6}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!bannerRef.current) return;
    bannerRef.current.style.setProperty('--scene-x', `0px`);
    bannerRef.current.style.setProperty('--scene-y', `0px`);
  }, []);

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="scb-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cursorLight} aria-hidden="true" />
      
      {/* ── Dot-mesh texture ── */}
      <div className={styles.mesh} aria-hidden="true" />

      {/* ════ MAIN BODY — two-column grid ════ */}
      <div className={styles.inner}>

        {/* ════ LEFT — CONTENT ════ */}
        <div className={styles.content}>
          {/* Badge */}
          <span className={styles.badge}>
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
          </span>

          {/* Headline */}
          <h2 id="scb-heading" className={styles.heading}>
            <span className={styles.headingWhite}>Swap Smarter,</span>
            <span className={styles.headingAccent}>Manage Your Rewards</span>
          </h2>

          {/* Description */}
          <p className={styles.desc}>
            Convert eligible reward balances between supported currencies
            and manage your rewards more efficiently.
          </p>

          {/* CTA */}
          <div className={styles.ctaWrap}>
            <button
              className={styles.cta}
              aria-label="Open Swap Center to convert your reward currencies"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span>Open Swap Center</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* ════ RIGHT — HERO VISUAL ════ */}
        <div ref={visualRef} className={styles.visual} aria-hidden="true">
          
          {/* Sparkle dots */}
          {sparkles.map((s, i) => (
            <div
              key={i}
              className={styles.sparkle}
              style={{ 
                left: s.x, 
                top: s.y, 
                '--sz': `${s.size}px`,
                animationDelay: `${s.delay}s`
              }}
            />
          ))}

          {/* Scene — parallax wrapper */}
          <div className={styles.scene}>

            {/* ── PURPLE GLOW behind left coin ── */}
            <div className={styles.purpleGlow} />

            {/* ── GOLD GLOW behind right coin ── */}
            <div className={styles.goldGlow} />

            {/* ════ COIN ROW ════ */}
            <div className={styles.coinRow}>

              {/* ── SOURCE: Purple SVE coin ── */}
              <div className={`${styles.coinWrapper} ${styles.coinWrapperPurple}`}>
                <img
                  src={coinRight}
                  alt="SVE reward currency"
                  draggable="false"
                  className={styles.coinImg}
                />
                <div className={styles.coinLabel}>
                  <span className={styles.coinTicker} style={{ color: '#c4b5fd' }}>SVE</span>
                  <span className={styles.coinSub}>Reward Currency</span>
                </div>
              </div>

              {/* ── SWAP ARROW — centre ── */}
              <div className={styles.arrowWrap}>
                <div className={styles.arrowDisc}>
                  {/* Outer ring pulse */}
                  <div className={styles.arrowRing} />
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
                </div>
              </div>

              {/* ── TARGET: Gold VE coin ── */}
              <div className={`${styles.coinWrapper} ${styles.coinWrapperGold}`}>
                <img
                  src={coinLeft}
                  alt="VE reward currency"
                  draggable="false"
                  className={styles.coinImg}
                  style={{ animationDelay: '1.0s' }}
                />
                <div className={styles.coinLabel}>
                  <span className={styles.coinTicker} style={{ color: '#fcd34d' }}>VE</span>
                  <span className={styles.coinSub}>Reward Currency</span>
                </div>
              </div>

            </div>{/* /coinRow */}

          </div>{/* /scene */}
        </div>{/* /visual */}

      </div>{/* /inner */}
    </section>
  );
}

export default SwapCenterBanner;

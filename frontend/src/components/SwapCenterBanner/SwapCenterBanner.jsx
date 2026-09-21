// SwapCenterBanner — Banner 02: Swap Center
// Design: minimal premium fintech — SOURCE ⇄ TARGET
// Left: badge · headline · desc · CTA   (40%)
// Right: purple coin  ⇄  gold coin      (60%)
// Effects: coin hover · swap arrow pulse · ambient glows · GSAP quickTo parallax
// Cursor light is handled page-wide in RewardsPage

import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
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
  const purpleCoinRef = useRef(null);
  const goldCoinRef = useRef(null);
  const quickToRefs = useRef({ purpleX: null, purpleY: null, goldX: null, goldY: null });

  useScrollReveal(bannerRef);
  useParallax(visualRef, bannerRef, { y: -15 });

  // Set up GSAP quickTo for smooth cursor-following coin parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (prefersReducedMotion || isTouch) return;

    if (purpleCoinRef.current) {
      quickToRefs.current.purpleX = gsap.quickTo(purpleCoinRef.current, 'x', { duration: 0.5, ease: 'power2.out' });
      quickToRefs.current.purpleY = gsap.quickTo(purpleCoinRef.current, 'y', { duration: 0.5, ease: 'power2.out' });
    }
    if (goldCoinRef.current) {
      quickToRefs.current.goldX = gsap.quickTo(goldCoinRef.current, 'x', { duration: 0.5, ease: 'power2.out' });
      quickToRefs.current.goldY = gsap.quickTo(goldCoinRef.current, 'y', { duration: 0.5, ease: 'power2.out' });
    }

    return () => {
      // Reset transforms on cleanup
      if (purpleCoinRef.current) gsap.set(purpleCoinRef.current, { x: 0, y: 0 });
      if (goldCoinRef.current) gsap.set(goldCoinRef.current, { x: 0, y: 0 });
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Cursor light CSS vars
    bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
    bannerRef.current.style.setProperty('--mouse-y', `${y}px`);

    // GSAP quickTo parallax — different depths per coin
    const normX = (x / rect.width - 0.5);
    const normY = (y / rect.height - 0.5);

    const qt = quickToRefs.current;
    // Purple coin: ±7px
    if (qt.purpleX) qt.purpleX(normX * 14);
    if (qt.purpleY) qt.purpleY(normY * 14);
    // Gold coin: ±9px
    if (qt.goldX) qt.goldX(normX * 18);
    if (qt.goldY) qt.goldY(normY * 18);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!bannerRef.current) return;
    bannerRef.current.style.setProperty('--scene-x', `0px`);
    bannerRef.current.style.setProperty('--scene-y', `0px`);

    // Reset coins to center
    const qt = quickToRefs.current;
    if (qt.purpleX) qt.purpleX(0);
    if (qt.purpleY) qt.purpleY(0);
    if (qt.goldX) qt.goldX(0);
    if (qt.goldY) qt.goldY(0);
  }, []);

  // Coin press interaction — works for both click and touch
  const handleCoinPress = useCallback((coinRef) => {
    const el = coinRef.current;
    if (!el) return;

    // Remove class if already animating, then re-add
    el.classList.remove(styles.coinPressed);
    // Force reflow
    void el.offsetWidth;
    el.classList.add(styles.coinPressed);

    // Remove class after animation completes
    const onEnd = () => {
      el.classList.remove(styles.coinPressed);
      el.removeEventListener('animationend', onEnd);
    };
    el.addEventListener('animationend', onEnd);
  }, []);

  // CTA cursor-hover integration
  const handleCtaMouseEnter = useCallback(() => {
    document.body.classList.add('cursor-hover');
  }, []);

  const handleCtaMouseLeave = useCallback(() => {
    document.body.classList.remove('cursor-hover');
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
              onMouseEnter={handleCtaMouseEnter}
              onMouseLeave={handleCtaMouseLeave}
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
              <div
                ref={purpleCoinRef}
                className={`${styles.coinWrapper} ${styles.coinWrapperPurple}`}
                onPointerDown={() => handleCoinPress(purpleCoinRef)}
                role="button"
                tabIndex={0}
                aria-label="SVE reward currency coin"
              >
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
              <div
                ref={goldCoinRef}
                className={`${styles.coinWrapper} ${styles.coinWrapperGold}`}
                onPointerDown={() => handleCoinPress(goldCoinRef)}
                role="button"
                tabIndex={0}
                aria-label="VE reward currency coin"
              >
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

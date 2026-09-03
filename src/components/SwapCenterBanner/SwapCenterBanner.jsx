// SwapCenterBanner — Banner 02: Swap Center
// Design: premium fintech, interactive (mouse parallax)
// Structure: two-column layout — content left, composed visual right
// Assets: wallets.png (background), coin.png (floating coins)

import { useState, useRef } from 'react';
import styles from './SwapCenterBanner.module.css';
import coinImg    from '../../assets/images/swaps-card/coin.png';

/* ─── SVG gradient IDs are unique per SVG element (scoped) ─── */

function SwapCenterBanner() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  function handleMouseMove(e) {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    setMouse({ x, y });
  }

  function handleMouseLeave() {
    setMouse({ x: 0, y: 0 });
  }

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--mx': `${mouse.x}px`, '--my': `${mouse.y}px` }}
      aria-labelledby="scb-heading"
    >
      {/* Dot-mesh overlay */}
      <div className={styles.mesh} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ════════════════════════════════════════
            LEFT — CONTENT
        ════════════════════════════════════════ */}
        <div className={styles.content}>

          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            VELOOP Rewards
          </span>

          <h2 id="scb-heading" className={styles.heading}>
            Swap Center
          </h2>

          <p className={styles.desc}>
            Convert eligible reward balances between supported currencies
            and manage your rewards more efficiently.
          </p>

          <button
            className={styles.cta}
            aria-label="Open Swap Center to convert your reward currencies"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Open Swap Center</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </button>

        </div>

        {/* ════════════════════════════════════════
            RIGHT — VISUAL COMPOSITION
        ════════════════════════════════════════ */}
        <div className={styles.visual} aria-hidden="true">

          {/* Ambient colour glow behind everything */}
          <div className={styles.ambientGlow} />

          {/* ── Scene wrapper (parallax layer) ── */}
          <div className={styles.scene}>

            {/* ─────────────────────────────────
                LAYER 1 — DIGITAL WALLET (back) (Removed)
            ───────────────────────────────── */}

            {/* ─────────────────────────────────
                LAYER 2 — CONVERSION ARROWS
            ───────────────────────────────── */}

            {/* Top arc: VE → SVE  (gold → violet) */}
            <svg
              className={`${styles.arc} ${styles.arcTop}`}
              viewBox="0 0 300 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="scbArcTopGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#f5c842" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7c6af7" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Ghost track */}
              <path d="M24 60 Q150 -10 276 60"
                stroke="rgba(255,255,255,0.07)" strokeWidth="2"
                strokeDasharray="5 5" fill="none" />
              {/* Animated highlight */}
              <path className={styles.arcDash}
                d="M24 60 Q150 -10 276 60"
                stroke="url(#scbArcTopGrad)" strokeWidth="2.5" fill="none" />
              {/* Arrowhead at SVE side */}
              <path className={styles.arcHeadRight}
                d="M267 54 L279 61 L267 68"
                stroke="url(#scbArcTopGrad)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>

            {/* Bottom arc: SVE → VE  (blue → violet) */}
            <svg
              className={`${styles.arc} ${styles.arcBottom}`}
              viewBox="0 0 300 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="scbArcBotGrad" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7c6af7" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Ghost track */}
              <path d="M276 12 Q150 82 24 12"
                stroke="rgba(255,255,255,0.07)" strokeWidth="2"
                strokeDasharray="5 5" fill="none" />
              {/* Animated highlight */}
              <path className={styles.arcDashRev}
                d="M276 12 Q150 82 24 12"
                stroke="url(#scbArcBotGrad)" strokeWidth="2.5" fill="none" />
              {/* Arrowhead at VE side */}
              <path className={styles.arcHeadLeft}
                d="M33 18 L21 11 L33 4"
                stroke="url(#scbArcBotGrad)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>

            {/* ─────────────────────────────────
                LAYER 3 — CARDS + SWAP HUB (front)
            ───────────────────────────────── */}
            <div className={styles.cardsRow}>

              {/* ── VE CARD ── */}
              <div className={`${styles.card} ${styles.cardVe}`}>
                {/* Glossy shine */}
                <div className={styles.cardSheen} />
                {/* Hover glow */}
                <div className={styles.cardHaloVe} />

                {/* Token medallion */}
                <div className={styles.medallion}>
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="scbVeMedal" cx="38%" cy="28%" r="65%">
                        <stop offset="0%"   stopColor="#fff3b0" />
                        <stop offset="45%"  stopColor="#f5c842" />
                        <stop offset="100%" stopColor="#b45309" />
                      </radialGradient>
                      <filter id="scbVeInner" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.35"/>
                      </filter>
                    </defs>
                    {/* Outer ring */}
                    <circle cx="32" cy="32" r="30" fill="url(#scbVeMedal)" />
                    {/* Inner ring line */}
                    <circle cx="32" cy="32" r="24" fill="none"
                      stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" />
                    {/* Highlight spot */}
                    <ellipse cx="24" cy="22" rx="8" ry="5"
                      fill="rgba(255,255,255,0.18)" />
                    {/* Label */}
                    <text x="32" y="37" textAnchor="middle"
                      fill="#3d1f00" fontSize="17" fontWeight="900"
                      fontFamily="'Inter',system-ui,sans-serif"
                      letterSpacing="-0.5">VE</text>
                  </svg>
                </div>

                <span className={styles.cardLabel}>VE</span>
                <span className={styles.cardSub}>Reward Currency</span>
              </div>

              {/* ── SWAP HUB ── */}
              <div className={styles.swapHub}>
                {/* Pulsing outer ring */}
                <div className={styles.hubRing2} />
                {/* Inner ring */}
                <div className={styles.hubRing1} />
                {/* Rotating circle — PRIMARY animation */}
                <div className={styles.hubDisc}>
                  {/* SVG counter-rotates so arrows stay readable */}
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.hubIcon}
                  >
                    {/* Top arrow: left-to-right */}
                    <path d="M6 10h14l-3.5-3.5" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10l3.5 3.5" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Bottom arrow: right-to-left */}
                    <path d="M26 22H12l3.5 3.5" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26 22l-3.5-3.5" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* ── SVE CARD ── */}
              <div className={`${styles.card} ${styles.cardSve}`}>
                <div className={styles.cardSheen} />
                <div className={styles.cardHaloSve} />

                <div className={styles.medallion}>
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="scbSveMedal" cx="38%" cy="28%" r="65%">
                        <stop offset="0%"   stopColor="#bfdbfe" />
                        <stop offset="45%"  stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                      </radialGradient>
                    </defs>
                    <circle cx="32" cy="32" r="30" fill="url(#scbSveMedal)" />
                    <circle cx="32" cy="32" r="24" fill="none"
                      stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <ellipse cx="24" cy="22" rx="8" ry="5"
                      fill="rgba(255,255,255,0.18)" />
                    <text x="32" y="37" textAnchor="middle"
                      fill="#ffffff" fontSize="13.5" fontWeight="900"
                      fontFamily="'Inter',system-ui,sans-serif"
                      letterSpacing="-0.3">SVE</text>
                  </svg>
                </div>

                <span className={styles.cardLabel}>SVE</span>
                <span className={styles.cardSub}>Reward Currency</span>
              </div>

            </div>{/* /cardsRow */}

            {/* ─────────────────────────────────
                LAYER 4 — FLOATING COINS (coin.png)
            ───────────────────────────────── */}

            {/* Coin A — upper-left, large */}
            <img src={coinImg} alt="" draggable="false"
              className={`${styles.coin} ${styles.coinA}`} />

            {/* Coin B — lower-right, medium */}
            <img src={coinImg} alt="" draggable="false"
              className={`${styles.coin} ${styles.coinB}`} />

            {/* Coin C — upper-right, small */}
            <img src={coinImg} alt="" draggable="false"
              className={`${styles.coin} ${styles.coinC}`} />

            {/* Coin D — lower-left, small */}
            <img src={coinImg} alt="" draggable="false"
              className={`${styles.coin} ${styles.coinD}`} />

            {/* Coin E — top-centre, tiny */}
            <img src={coinImg} alt="" draggable="false"
              className={`${styles.coin} ${styles.coinE}`} />

          </div>{/* /scene */}
        </div>{/* /visual */}
      </div>{/* /inner */}
    </section>
  );
}

export default SwapCenterBanner;

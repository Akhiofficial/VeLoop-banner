// RewardsPage — Container for all 5 VELOOP banner components.
// Each banner is implemented independently in its own component folder.
// Page-wide cursor light effect tracked here and rendered as a fixed overlay.

import { useCallback, useRef } from 'react';
import styles from './RewardsPage.module.css';

import ReferEarnBanner      from '../components/ReferEarnBanner/ReferEarnBanner';
import SwapCenterBanner     from '../components/SwapCenterBanner/SwapCenterBanner';
import BonusVEsBanner       from '../components/BonusVEsBanner/BonusVEsBanner';
import CaptchaTasksBanner   from '../components/CaptchaTasksBanner/CaptchaTasksBanner';
import ExchangeCenterBanner from '../components/ExchangeCenterBanner/ExchangeCenterBanner';

import { useLenis } from '../hooks/useLenis';
import CustomCursor from '../components/CustomCursor/CustomCursor';

function RewardsPage() {
  useLenis();

  const lightRef = useRef(null);

  /* Track mouse across the whole page and move the fixed glow */
  const handleMouseMove = useCallback((e) => {
    if (!lightRef.current) return;
    
    // Only apply on non-touch devices
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    lightRef.current.style.setProperty('--cx', `${e.clientX}px`);
    lightRef.current.style.setProperty('--cy', `${e.clientY}px`);
    lightRef.current.style.setProperty('--cOpacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!lightRef.current) return;
    lightRef.current.style.setProperty('--cOpacity', '0');
  }, []);

  return (
    <main
      className={styles.page}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CustomCursor />
      
      {/* ── Page-wide cursor light — fixed, pointer-events: none ── */}
      <div ref={lightRef} className={styles.cursorLight} aria-hidden="true" />

      <ReferEarnBanner />
      <SwapCenterBanner />
      <BonusVEsBanner />
      <CaptchaTasksBanner />
      <ExchangeCenterBanner />
    </main>
  );
}

export default RewardsPage;

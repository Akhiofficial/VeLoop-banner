import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ExchangeCenterBanner.module.css';

import walletPng from '../../assets/images/exchange-center/wallets.png';
import veCoinImg from '../../assets/images/refer-earn/VE_single_coin.png';

gsap.registerPlugin(ScrollTrigger);

function ExchangeCenterBanner() {
  const bannerRef = useRef(null);
  const walletRef = useRef(null);
  
  const coin1Ref = useRef(null);
  const coin2Ref = useRef(null);
  const coin3Ref = useRef(null);
  
  const optionsRef = useRef(null);

  // -- GSAP INTERACTION SYSTEM --
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    
    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Set up quickTo for Wallet 3D Tilt + small translation
    const walletXTo = gsap.quickTo(walletRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
    const walletYTo = gsap.quickTo(walletRef.current, 'y', { duration: 0.6, ease: 'power3.out' });
    const walletRotXTo = gsap.quickTo(walletRef.current, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const walletRotYTo = gsap.quickTo(walletRef.current, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    // Independent Coins translation
    const c1XTo = gsap.quickTo(coin1Ref.current, 'x', { duration: 0.9, ease: 'power2.out' });
    const c1YTo = gsap.quickTo(coin1Ref.current, 'y', { duration: 0.9, ease: 'power2.out' });
    
    const c2XTo = gsap.quickTo(coin2Ref.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const c2YTo = gsap.quickTo(coin2Ref.current, 'y', { duration: 0.8, ease: 'power3.out' });
    
    const c3XTo = gsap.quickTo(coin3Ref.current, 'x', { duration: 1.1, ease: 'power1.out' });
    const c3YTo = gsap.quickTo(coin3Ref.current, 'y', { duration: 1.1, ease: 'power1.out' });

    // Enable 3D perspective
    gsap.set(walletRef.current, { transformPerspective: 800 });

    const handleMouseMove = (e) => {
      // Ignore if on touch/coarse pointer
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const rect = banner.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      // Update cursor light CSS vars
      banner.style.setProperty('--mouse-x', `${rawX}px`);
      banner.style.setProperty('--mouse-y', `${rawY}px`);

      // Normalize coordinates (-1 to 1)
      const nx = (rawX / rect.width) * 2 - 1;
      const ny = (rawY / rect.height) * 2 - 1;

      // Wallet: max ±6px translate, rotateX ±3deg, rotateY ±4deg
      walletXTo(nx * 6);
      walletYTo(ny * 6);
      walletRotXTo(-ny * 3); // rotateX up/down is inverted
      walletRotYTo(nx * 4);
      
      // Coins: depth parallax
      // Coin 1 (large): opposite direction
      c1XTo(nx * -10);
      c1YTo(ny * -10);
      
      // Coin 2 (small): same direction, faster
      c2XTo(nx * 13);
      c2YTo(ny * 13);
      
      // Coin 3 (tiny): opposite direction, slight
      c3XTo(nx * -8);
      c3YTo(ny * -8);
    };

    const handleMouseLeave = () => {
      // Reset positions gracefully
      walletXTo(0); walletYTo(0);
      walletRotXTo(0); walletRotYTo(0);
      
      c1XTo(0); c1YTo(0);
      c2XTo(0); c2YTo(0);
      c3XTo(0); c3YTo(0);
    };

    banner.addEventListener('mousemove', handleMouseMove);
    banner.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      banner.removeEventListener('mousemove', handleMouseMove);
      banner.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // -- GSAP ENTRANCE & PARALLAX SCROLL --
  useEffect(() => {
    if (!bannerRef.current || !walletRef.current) return;
    const banner = bannerRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: banner,
        start: 'top 85%',
      }
    });

    if (!prefersReducedMotion) {
      // Entrance Stagger
      tl.fromTo(walletRef.current, 
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo([coin1Ref.current, coin2Ref.current, coin3Ref.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo(optionsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        "-=0.4"
      );

      // Scroll Parallax Scrub
      gsap.to(walletRef.current, {
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
      
      gsap.to([coin1Ref.current, coin3Ref.current], {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
      
      gsap.to(coin2Ref.current, {
        y: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(optionsRef.current, {
        y: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if(t.vars.trigger === banner) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      aria-labelledby="ecb-heading"
    >
      <div className={styles.cursorLight} aria-hidden="true" />
      
      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          VELOOP REWARDS
        </span>
        
        <h2 id="ecb-heading" className={styles.heading}>
          Exchange Center
        </h2>
        
        <p className={styles.desc}>
          Explore available redemption options and exchange eligible VEs for supported rewards.
        </p>
        
        <div className={styles.ctaWrap}>
          <button className={styles.cta}>
            <span>Open Exchange Center</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.scene}>
          
          <div className={styles.ambientGlow} />

          {/* Independent Tiny Coins */}
          <img 
            ref={coin1Ref}
            src={veCoinImg} 
            alt="" 
            className={`${styles.veCoin} ${styles.coinLarge}`} 
          />
          <img 
            ref={coin2Ref}
            src={veCoinImg} 
            alt="" 
            className={`${styles.veCoin} ${styles.coinSmall}`} 
          />
          <img 
            ref={coin3Ref}
            src={veCoinImg} 
            alt="" 
            className={`${styles.veCoin} ${styles.coinTiny}`} 
          />

          {/* Main Hero Wallet */}
          <img 
            ref={walletRef}
            src={walletPng} 
            alt="VE Wallet" 
            className={styles.walletHero} 
          />

          {/* Reward Options Below Wallet */}
          <div ref={optionsRef} className={styles.rewardOptions}>
            
            <div className={styles.rewardCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              UPI
            </div>

            <div className={styles.rewardCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
                <rect x="3" y="8" width="18" height="13" rx="1" />
                <path d="M12 8v13" />
                <path d="M19 8c-1.5-2-5-2-7 0-2-2-5.5-2-7 0" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
              Gift Card
            </div>

            <div className={styles.rewardCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Reward
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ExchangeCenterBanner;

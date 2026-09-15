import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function useLenis() {
  useEffect(() => {
    // Prevent multiple instances
    if (lenisInstance) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    lenisInstance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    const ticker = (time) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenisInstance) {
        gsap.ticker.remove(ticker);
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);
}

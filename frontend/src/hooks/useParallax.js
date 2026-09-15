import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useParallax(targetRef, triggerRef, options = { y: -15 }) {
  useEffect(() => {
    if (!targetRef.current || !triggerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(targetRef.current, {
          ...options,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }, targetRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [targetRef, triggerRef, options]);
}

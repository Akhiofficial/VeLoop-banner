import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — GSAP scroll-triggered reveal.
 * @param {React.RefObject} containerRef — the banner wrapper
 * @param {object} options — optional config
 *   options.yDesktop {number} — y distance on desktop (default 45)
 *   options.yMobile  {number} — y distance on mobile (default 20)
 */
export function useScrollReveal(containerRef, options = {}) {
  const { yDesktop = 45, yMobile = 18 } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const contentDiv = containerRef.current.querySelector('[class*="content"]');
        const visualDiv = containerRef.current.querySelector('[class*="visual"]');

        const elementsToAnimate = [];
        if (contentDiv) {
          Array.from(contentDiv.children).forEach(child => {
            if (!child.hasAttribute('aria-hidden')) {
              elementsToAnimate.push(child);
            }
          });
        }
        if (visualDiv) {
          elementsToAnimate.push(visualDiv);
        }

        if (elementsToAnimate.length === 0) return;

        // Desktop reveal
        const desktopMM = gsap.matchMedia();
        desktopMM.add("(min-width: 768px)", () => {
          gsap.set(elementsToAnimate, { opacity: 0, y: yDesktop, scale: 0.98 });
          gsap.to(elementsToAnimate, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            }
          });
        });

        // Mobile reveal — shorter y offset
        desktopMM.add("(max-width: 767px)", () => {
          gsap.set(elementsToAnimate, { opacity: 0, y: yMobile });
          gsap.to(elementsToAnimate, {
            duration: 0.7,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              once: true,
            }
          });
        });

        return () => desktopMM.revert();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [containerRef, yDesktop, yMobile]);
}

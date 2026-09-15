import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Find content children and visual elements
        const contentDiv = containerRef.current.querySelector('[class*="content"]');
        const visualDiv = containerRef.current.querySelector('[class*="visual"]');
        
        const elementsToAnimate = [];
        if (contentDiv) {
          Array.from(contentDiv.children).forEach(child => {
            // Avoid animating non-visible elements like ambientGlow if they ended up in content
            if (!child.hasAttribute('aria-hidden')) {
               elementsToAnimate.push(child);
            }
          });
        }
        if (visualDiv) {
          elementsToAnimate.push(visualDiv);
        }

        if (elementsToAnimate.length === 0) return;

        gsap.set(elementsToAnimate, { opacity: 0, y: 50, scale: 0.98 });

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
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [containerRef]);
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';
import { useCustomCursor } from '../../hooks/useCustomCursor';

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useCustomCursor();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // Use quickTo for performant follow
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className={styles.cursorWrapper} aria-hidden="true">
      <div ref={ringRef} className={styles.cursorRing}></div>
      <div ref={dotRef} className={styles.cursorDot}></div>
    </div>
  );
}

export default CustomCursor;

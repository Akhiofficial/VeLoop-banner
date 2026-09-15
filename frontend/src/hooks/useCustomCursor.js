import { useEffect } from 'react';

export function useCustomCursor() {
  useEffect(() => {
    // Media query to only attach on non-touch devices
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('interactive') ||
        e.target.closest('[class*="cta"]')
      ) {
        document.body.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = () => {
      document.body.classList.remove('cursor-hover');
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
}

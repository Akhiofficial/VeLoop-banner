// InteractiveButton.jsx
// Shared button component for all banner CTAs.
// Centralises hover, tactile press, and focus-ring interactions.
// Visual variants are controlled via the `variant` prop.
// Does NOT use React state for interaction — pure CSS transitions.

import styles from './InteractiveButton.module.css';

/**
 * @param {'primary'|'secondary'|'option'|'verify'} [variant='primary']
 * @param {string}  [className]   – extra class for banner-specific sizing overrides
 * @param {boolean} [disabled]
 * @param {React.ReactNode} children
 * @param {object}  rest          – forwarded to <button> (onClick, aria-*, etc.)
 */
function InteractiveButton({
  variant = 'primary',
  as: Component = 'button',
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  // Cursor-ring integration: add/remove body class for custom cursor expansion
  function handleMouseEnter(e) {
    document.body.classList.add('cursor-hover');
    onMouseEnter?.(e);
  }

  function handleMouseLeave(e) {
    document.body.classList.remove('cursor-hover');
    onMouseLeave?.(e);
  }

  return (
    <Component
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default InteractiveButton;

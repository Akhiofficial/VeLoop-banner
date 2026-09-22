// CtaRow.jsx — Primary "Invite Friends Now" + secondary "Copy Referral Link"

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import styles from './CtaRow.module.css';
import InteractiveButton from '../ui/InteractiveButton/InteractiveButton';
import btnStyles from '../ui/InteractiveButton/InteractiveButton.module.css';

function CtaRow() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    // In a real integration this would use the user's actual referral link
    navigator.clipboard.writeText('https://veloop.com/refer').catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className={styles.ctaRow}>
      <InteractiveButton
        variant="primary"
        className={styles.ctaPrimary}
        aria-label="Start referring friends and earn rewards"
      >
        <span>Invite Friends Now</span>
        <span className={`${btnStyles.arrow} ${styles.ctaArrow}`} aria-hidden="true">→</span>
      </InteractiveButton>

      <InteractiveButton
        variant="secondary"
        className={styles.ctaSecondary}
        onClick={handleCopy}
        aria-label={copied ? 'Referral link copied' : 'Copy your referral link'}
      >
        {copied
          ? <Check size={15} aria-hidden="true" />
          : <Copy size={15} aria-hidden="true" />}
        <span>{copied ? 'Copied ✓' : 'Copy Referral Link'}</span>
      </InteractiveButton>
    </div>
  );
}

export default CtaRow;

// CtaRow.jsx — Primary "Refer & Earn" + secondary "Copy Link"

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import styles from './CtaRow.module.css';

function CtaRow() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    // In a real integration this would use the user's actual referral link
    navigator.clipboard.writeText('https://veloop.com/refer').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className={styles.ctaRow}>
      <button
        className={styles.ctaPrimary}
        aria-label="Start referring friends and earn rewards"
      >
        <span>Refer &amp; Earn</span>
        <span className={styles.ctaArrow} aria-hidden="true">→</span>
      </button>

      <button
        className={styles.ctaSecondary}
        onClick={handleCopy}
        aria-label={copied ? 'Referral link copied' : 'Copy your referral link'}
      >
        {copied
          ? <Check size={15} aria-hidden="true" />
          : <Copy  size={15} aria-hidden="true" />}
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}

export default CtaRow;

// RewardChips.jsx — VE / SPIN / GEM / XP reward-type chips

import { Coins, Shuffle, Diamond, Zap } from 'lucide-react';
import styles from './RewardChips.module.css';

const CHIPS = [
  { icon: Coins,   label: 'VE'   },
  { icon: Shuffle, label: 'SPIN' },
  { icon: Diamond, label: 'GEM'  },
  { icon: Zap,     label: 'XP'   },
];

function RewardChips() {
  return (
    <div className={styles.wrapper} aria-label="Possible referral reward types">
      <span className={styles.label}>Referral Rewards</span>
      <div className={styles.chips} role="list">
        {CHIPS.map(({ icon: Icon, label }) => (
          <div key={label} className={styles.chip} role="listitem" aria-label={label}>
            <Icon size={13} className={styles.chipIcon} aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardChips;

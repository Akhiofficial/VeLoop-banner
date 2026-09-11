// FeatureStrip.jsx — Bottom supporting strip (4 items)

import { Users, Gift, TrendingUp, Link2 } from 'lucide-react';
import styles from './ReferEarnBanner.module.css';

const FEATURES = [
  {
    icon: Users,
    title: 'Invite & Earn',
    sub: 'Invite eligible friends',
  },
  {
    icon: Gift,
    title: 'Exciting Rewards',
    sub: 'Unlock available rewards',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    sub: 'Monitor referral activity',
  },
  {
    icon: Link2,
    title: 'More Opportunities',
    sub: 'Discover eligible bonuses',
  },
];

function FeatureStrip() {
  return (
    <div className={styles.featureStrip} aria-label="Key benefits">
      {FEATURES.map(({ icon: Icon, title, sub }) => (
        <div key={title} className={styles.featureItem}>
          <div className={styles.featureIconWrap} aria-hidden="true">
            <Icon size={16} />
          </div>
          <div className={styles.featureText}>
            <span className={styles.featureTitle}>{title}</span>
            <span className={styles.featureSubtitle}>{sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeatureStrip;

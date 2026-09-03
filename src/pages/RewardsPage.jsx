// RewardsPage — Container for all 5 VELOOP banner components.
// Each banner is implemented independently in its own component folder.

import styles from './RewardsPage.module.css';

import ReferEarnBanner from '../components/ReferEarnBanner/ReferEarnBanner';
import SwapCenterBanner from '../components/SwapCenterBanner/SwapCenterBanner';
import BonusVEsBanner from '../components/BonusVEsBanner/BonusVEsBanner';
import CaptchaTasksBanner from '../components/CaptchaTasksBanner/CaptchaTasksBanner';
import ExchangeCenterBanner from '../components/ExchangeCenterBanner/ExchangeCenterBanner';

function RewardsPage() {
  return (
    <main className={styles.page}>
      <ReferEarnBanner />
      <SwapCenterBanner />
      <BonusVEsBanner />
      <CaptchaTasksBanner />
      <ExchangeCenterBanner />
    </main>
  );
}

export default RewardsPage;

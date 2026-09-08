// ReferralFlow.jsx — Animated 01 → 02 → 03 referral journey steps

import { motion, useReducedMotion } from 'framer-motion';
import styles from './ReferralFlow.module.css';

const STEPS = [
  { num: '01', label: 'Invite Friend' },
  { num: '02', label: 'They Earn' },
  { num: '03', label: 'You Earn' },
];

function ReferralFlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={styles.container}>
      <ol className={styles.steps} aria-label="How referral works: three steps">
        {STEPS.map((step, i) => (
          <li key={step.num} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">{step.num}</span>
            <span className={styles.stepLabel}>{step.label}</span>
            {i < STEPS.length - 1 && (
              <span className={styles.stepArrow} aria-hidden="true">→</span>
            )}
          </li>
        ))}
      </ol>

      {!prefersReducedMotion && (
        <motion.div
          className={styles.orb}
          aria-hidden="true"
          animate={{ left: ['2%', '38%', '74%', '2%'] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.3,
          }}
        />
      )}
    </div>
  );
}

export default ReferralFlow;

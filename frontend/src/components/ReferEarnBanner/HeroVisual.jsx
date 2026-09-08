// HeroVisual.jsx — Right column: animated illustration + reward panel + coins

import { motion, useReducedMotion } from 'framer-motion';
import { Coins, Sparkles, Star, Shuffle, Diamond, Zap } from 'lucide-react';
import styles from './HeroVisual.module.css';
import referIllustration from '../../assets/images/refer-earn/refer-earn-illustrate (2).png';

// Panel reward items
const PANEL_ITEMS = [
  { icon: Coins,   label: 'VE'   },
  { icon: Shuffle, label: 'SPIN' },
  { icon: Diamond, label: 'GEM'  },
  { icon: Zap,     label: 'XP'   },
];

function HeroVisual({ mouseX = 0, mouseY = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  const parallaxStyle = prefersReducedMotion
    ? {}
    : {
        transform: `translate(${mouseX * 0.25}px, ${mouseY * 0.25}px)`,
        transition: 'transform 0.14s ease-out',
      };

  const glowStyle = prefersReducedMotion
    ? {}
    : {
        transform: `translate(${mouseX * 0.08}px, ${mouseY * 0.08}px)`,
        transition: 'transform 0.2s ease-out',
      };

  return (
    <div className={styles.visual} aria-hidden="true">
      {/* Ambient glow layers */}
      <div className={styles.ambientGlow} style={glowStyle} />
      <div className={styles.ambientGlow2} />

      {/* CSS parallax wrapper → separate from FM float */}
      <div className={styles.parallaxLayer} style={parallaxStyle}>

        {/* FM float animation — pure y, no CSS transform conflict */}
        <motion.div
          className={styles.floatWrap}
          animate={prefersReducedMotion ? undefined : { y: [-5, 5, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Dashed arc referral path */}
          <svg className={styles.pathSvg} viewBox="0 0 400 200" preserveAspectRatio="none">
            <path
              d="M20,165 Q200,-20 380,165"
              fill="none"
              stroke="rgba(196, 187, 255, 0.1)"
              strokeWidth="1.2"
              strokeDasharray="5,6"
            />
          </svg>

          {/* Floating gold coin */}
          {!prefersReducedMotion && (
            <>
              <motion.div
                className={`${styles.floatingEl} ${styles.coinA}`}
                animate={{ y: [-10, 10, -10], rotate: [0, 18, 0] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Coins size={26} color="#f5c842" />
              </motion.div>

              <motion.div
                className={`${styles.floatingEl} ${styles.coinB}`}
                animate={{ y: [8, -8, 8], rotate: [0, -14, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <Sparkles size={20} color="#c4bbff" />
              </motion.div>

              <motion.div
                className={`${styles.floatingEl} ${styles.sparkA}`}
                animate={{ y: [-6, 6, -6], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              >
                <Star size={13} color="rgba(245, 200, 66, 0.55)" />
              </motion.div>
            </>
          )}

          {/* Main illustration */}
          <img
            src={referIllustration}
            alt="Two friends referring each other and earning rewards"
            className={styles.illustration}
          />

          {/* REWARD UNLOCKED floating glass panel */}
          <motion.div
            className={styles.rewardPanel}
            initial={{ scale: 0.82, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, type: 'spring', stiffness: 170, damping: 16 }}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelDot} />
              REWARD UNLOCKED
            </div>
            <div className={styles.panelChips}>
              {PANEL_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className={styles.panelChip}>
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

export default HeroVisual;

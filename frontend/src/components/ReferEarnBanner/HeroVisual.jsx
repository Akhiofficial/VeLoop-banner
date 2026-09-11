// HeroVisual.jsx — Refined PNG-based illustration for Refer & Earn
import { useReducedMotion, motion } from 'framer-motion';
import styles from './HeroVisual.module.css';

// Import all specific transparent PNG assets
import giftBoxImg from '../../assets/images/refer-earn/gift_box_refer_earn.png';
import moneyIconImg from '../../assets/images/refer-earn/money_icon.png';
import cardIconsImg from '../../assets/images/refer-earn/card_icons.png';
import airplaneIconImg from '../../assets/images/refer-earn/Aeroplane_icon.png';

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  // Floating animation for the gift box
  const giftAnimation = {
    animate: {
      y: prefersReducedMotion ? 0 : [-3, 3, -3],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  // Small VE coins animations (staggered)
  const smallCoinAnim1 = {
    animate: {
      y: prefersReducedMotion ? 0 : [-4, 4, -4],
      rotate: prefersReducedMotion ? 0 : [-4, 4, -4],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
    }
  };

  const smallCoinAnim2 = {
    animate: {
      y: prefersReducedMotion ? 0 : [-3, 3, -3],
      rotate: prefersReducedMotion ? 0 : [3, -3, 3],
      transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
    }
  };

  const smallCoinAnim3 = {
    animate: {
      y: prefersReducedMotion ? 0 : [-4, 4, -4],
      rotate: prefersReducedMotion ? 0 : [2, -2, 2],
      transition: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
    }
  };

  // Paper airplane subtle movement
  const airplaneAnimation = {
    animate: {
      y: prefersReducedMotion ? 0 : [-2, 2, -2],
      x: prefersReducedMotion ? 0 : [-1, 1, -1],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  // Exclusive rewards card animation
  const cardAnimation = {
    animate: {
      y: prefersReducedMotion ? 0 : [-2, 2, -2],
      rotate: prefersReducedMotion ? 0 : [-1, 1, -1],
      transition: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
    }
  };

  // Sparkles
  const particleAnimation = {
    animate: {
      opacity: prefersReducedMotion ? 0.6 : [0.2, 0.9, 0.2],
      scale: prefersReducedMotion ? 1 : [0.7, 1.2, 0.7],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div
      className={styles.visualWrapper}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: 0.18 }}
      aria-hidden="true"
      role="img"
      aria-label="Illustration showing a gift box and VE coins"
    >
      {/* Background ambient glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.compositionContainer}>

        {/* Background Layer (Sparkles Only) */}
        <div className={styles.backgroundLayer}>
          <svg viewBox="0 0 400 400" className={styles.sparklesSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M 120 100 Q 125 105 130 100 Q 125 95 120 100 Z" fill="#FFF" variants={particleAnimation} animate="animate" style={{ animationDelay: '0s' }} />
            <motion.path d="M 280 140 Q 285 145 290 140 Q 285 135 280 140 Z" fill="#F5B942" variants={particleAnimation} animate="animate" style={{ animationDelay: '-1.5s' }} />
            <motion.circle cx="320" cy="80" r="3" fill="#A78BFA" variants={particleAnimation} animate="animate" style={{ animationDelay: '-1s' }} />
            <motion.circle cx="160" cy="280" r="2" fill="#FFFFFF" variants={particleAnimation} animate="animate" style={{ animationDelay: '-2.5s' }} />
          </svg>
        </div>

        {/* Exclusive Rewards Card (Placed lower-left/left of the gift) */}
        <motion.div
          className={styles.cardContainer}
          variants={cardAnimation}
          animate="animate"
        >
          <img src={cardIconsImg} alt="Exclusive Rewards" className={styles.cardImg} />
        </motion.div>

        {/* Paper Airplane (Upper right) */}
        <motion.div
          className={styles.airplaneContainer}
          variants={airplaneAnimation}
          animate="animate"
        >
          <img src={airplaneIconImg} alt="Share" className={styles.airplaneImg} />
        </motion.div>

        {/* Main Gift Box */}
        <motion.div
          className={styles.giftBoxContainer}
          variants={giftAnimation}
          animate="animate"
          whileHover="hover"
        >
          <img src={giftBoxImg} alt="VELOOP Reward Gift" className={styles.giftBoxImg} />
        </motion.div>

  

        {/* Small VE Coin 1 (Top Left) */}
        <motion.div
          className={`${styles.coinContainer} ${styles.coinSmall1}`}
          variants={smallCoinAnim1}
          animate="animate"
        >
          <img src={moneyIconImg} alt="" className={styles.coinImg} />
        </motion.div>

        {/* Small VE Coin 2 (Middle Right) */}
        <motion.div
          className={`${styles.coinContainer} ${styles.coinSmall2}`}
          variants={smallCoinAnim2}
          animate="animate"
        >
          <img src={moneyIconImg} alt="" className={styles.coinImg} />
        </motion.div>

        {/* Small VE Coin 3 (Bottom Right) */}
        <motion.div
          className={`${styles.coinContainer} ${styles.coinSmall3}`}
          variants={smallCoinAnim3}
          animate="animate"
        >
          <img src={moneyIconImg} alt="" className={styles.coinImg} />
        </motion.div>

      </div>
    </motion.div>
  );
}

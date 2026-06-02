import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SignatureIntro.module.css';

/**
 * Letter bounding regions traced over the actual signature image.
 * Each region is a clip-path polygon that isolates one letter/stroke group.
 * The signature image is displayed 8 times, each clipped to its letter region,
 * and revealed sequentially with GPU-accelerated opacity animation.
 *
 * Coordinates are percentages of the image dimensions (810×380).
 */
const LETTER_REGIONS = [
  {
    // "B" upstroke — the dramatic diagonal slash from lower-left to upper-right
    name: 'B-slash',
    clipPath: 'polygon(0% 95%, 0% 68%, 12% 50%, 30% 12%, 42% 0%, 48% 0%, 36% 15%, 16% 55%, 14% 70%, 6% 95%)',
    start: 0.4,
    dur: 0.35,
  },
  {
    // "B" body — the curves after the peak, forming the B letterform
    name: 'B-body',
    clipPath: 'polygon(14% 5%, 38% 5%, 38% 66%, 14% 66%)',
    start: 0.70,
    dur: 0.35,
  },
  {
    // "h" — upstroke and arch
    name: 'h',
    clipPath: 'polygon(24% 26%, 40% 26%, 40% 60%, 24% 60%)',
    start: 1.0,
    dur: 0.25,
  },
  {
    // "a" — compact rounded letter
    name: 'a',
    clipPath: 'polygon(33% 38%, 46% 38%, 46% 60%, 33% 60%)',
    start: 1.20,
    dur: 0.20,
  },
  {
    // "vy" + y-descender — sharp v into y with the long tail
    name: 'vy-tail',
    clipPath: 'polygon(37% 33%, 54% 33%, 54% 92%, 37% 92%)',
    start: 1.35,
    dur: 0.45,
  },
  {
    // Underline swoosh — horizontal stroke under "Bhavy"
    name: 'underline',
    clipPath: 'polygon(0% 65%, 56% 65%, 56% 92%, 0% 92%)',
    start: 1.75,
    dur: 0.25,
  },
  {
    // "P" — upstroke of Patel
    name: 'P',
    clipPath: 'polygon(52% 16%, 67% 16%, 67% 70%, 52% 70%)',
    start: 2.10,
    dur: 0.30,
  },
  {
    // "atel" + finishing rightward flourish
    name: 'atel-flourish',
    clipPath: 'polygon(57% 14%, 100% 14%, 100% 62%, 57% 62%)',
    start: 2.30,
    dur: 0.40,
  },
];

const TAGLINE_DELAY = 2500; // ms — show tagline near end of drawing
const DISMISS_DELAY = 3500; // ms — dismiss the overlay

const SignatureIntro: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const taglineTimer = setTimeout(() => setShowTagline(true), TAGLINE_DELAY);
    const dismissTimer = setTimeout(() => setIsVisible(false), DISMISS_DELAY);
    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const signatureUrl = `${import.meta.env.BASE_URL}signature.png`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(14px)',
            transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
          }}
          key="signature-intro"
        >
          <div className={styles.signatureContainer}>
            <div className={styles.signatureFrame}>
              {LETTER_REGIONS.map((region) => (
                <motion.div
                  key={region.name}
                  className={styles.letterRegion}
                  style={{ clipPath: region.clipPath }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: region.start,
                    duration: region.dur,
                    ease: 'easeOut',
                  }}
                >
                  <img
                    src={signatureUrl}
                    alt=""
                    className={styles.signatureImage}
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>

            <span
              className={`${styles.tagline} ${showTagline ? styles.taglineVisible : ''}`}
            >
              Software Engineer
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureIntro;

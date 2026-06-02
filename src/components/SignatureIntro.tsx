import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SignatureIntro.module.css';

/**
 * Stroke path segments traced over the actual signature image.
 * Coordinates are normalized 0–1 relative to image dimensions (810×380).
 * A round brush follows these paths to progressively reveal the real signature.
 */
const STROKE_SEGMENTS = [
  {
    // "B" — dramatic diagonal upstroke from lower-left to upper-right
    points: [
      [0.105, 0.776], [0.140, 0.700], [0.175, 0.610],
      [0.216, 0.500], [0.260, 0.380], [0.310, 0.260], [0.346, 0.179],
    ],
    duration: 420,
    delay: 380,
    brushSize: 0.075,
  },
  {
    // "B" body — top curve sweeps back left-down forming the B letterform
    points: [
      [0.346, 0.179], [0.358, 0.163], [0.350, 0.200],
      [0.330, 0.270], [0.300, 0.360], [0.265, 0.440],
      [0.235, 0.520], [0.222, 0.560], [0.216, 0.585],
      [0.230, 0.575], [0.250, 0.553], [0.268, 0.530],
    ],
    duration: 580,
    delay: 0,
    brushSize: 0.065,
  },
  {
    // "h" — upstroke to peak, back down, arch right
    points: [
      [0.268, 0.530], [0.278, 0.487], [0.286, 0.420],
      [0.294, 0.360], [0.296, 0.400], [0.300, 0.460],
      [0.310, 0.510], [0.325, 0.530], [0.340, 0.515],
    ],
    duration: 420,
    delay: 0,
    brushSize: 0.058,
  },
  {
    // "a" — small compact loop
    points: [
      [0.340, 0.515], [0.350, 0.480], [0.365, 0.455],
      [0.383, 0.460], [0.390, 0.500], [0.380, 0.530],
      [0.365, 0.525], [0.370, 0.490], [0.390, 0.500],
    ],
    duration: 350,
    delay: 0,
    brushSize: 0.055,
  },
  {
    // "v" — sharp downward then up
    points: [
      [0.390, 0.500], [0.405, 0.455], [0.420, 0.430],
      [0.428, 0.445], [0.432, 0.475],
    ],
    duration: 230,
    delay: 0,
    brushSize: 0.055,
  },
  {
    // "y" — down-stroke with long descending tail and loop back up
    points: [
      [0.432, 0.475], [0.440, 0.430], [0.447, 0.405],
      [0.452, 0.440], [0.456, 0.510], [0.460, 0.590],
      [0.464, 0.680], [0.462, 0.760], [0.452, 0.810],
      [0.435, 0.825], [0.420, 0.810], [0.405, 0.770],
    ],
    duration: 520,
    delay: 0,
    brushSize: 0.060,
  },
  {
    // Underline swoosh — sweeps left to right under "Bhavy"
    points: [
      [0.080, 0.745], [0.140, 0.770], [0.210, 0.790],
      [0.290, 0.780], [0.370, 0.760], [0.430, 0.745],
      [0.500, 0.745],
    ],
    duration: 320,
    delay: 100,
    brushSize: 0.048,
  },
  {
    // "P" — upstroke of Patel
    points: [
      [0.550, 0.640], [0.560, 0.560], [0.572, 0.470],
      [0.585, 0.380], [0.598, 0.300], [0.607, 0.260],
      [0.610, 0.280],
    ],
    duration: 380,
    delay: 140,
    brushSize: 0.060,
  },
  {
    // "atel" + finishing rightward flourish
    points: [
      [0.610, 0.280], [0.608, 0.350], [0.605, 0.430],
      [0.606, 0.500], [0.615, 0.535], [0.635, 0.510],
      [0.655, 0.480], [0.678, 0.455], [0.700, 0.450],
      [0.715, 0.460], [0.730, 0.440], [0.760, 0.400],
      [0.800, 0.360], [0.845, 0.325], [0.885, 0.308],
      [0.915, 0.310],
    ],
    duration: 580,
    delay: 0,
    brushSize: 0.058,
  },
];

// ── Build a flat timeline of interpolated brush points with timestamps ──

interface BrushPoint {
  x: number;
  y: number;
  r: number;
  t: number; // timestamp in ms
}

function buildTimeline(): { points: BrushPoint[]; totalDuration: number } {
  const points: BrushPoint[] = [];
  let clock = 0;

  for (const seg of STROKE_SEGMENTS) {
    clock += seg.delay;
    const t0 = clock;
    const pts = seg.points;

    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Place a brush stamp roughly every 0.3% of canvas width
      const steps = Math.max(1, Math.ceil(dist / 0.003));

      for (let s = 0; s <= steps; s++) {
        const frac = s / steps;
        const segProgress = (i + frac) / (pts.length - 1);
        points.push({
          x: x1 + dx * frac,
          y: y1 + dy * frac,
          r: seg.brushSize * 0.5,
          t: t0 + segProgress * seg.duration,
        });
      }
    }

    clock += seg.duration;
  }

  return { points, totalDuration: clock };
}

// ── Component ───────────────────────────────────────────────────────────

const IMG_ASPECT = 810 / 380; // source image aspect ratio

const SignatureIntro: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTagline, setShowTagline] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { points, totalDuration } = buildTimeline();

    // Load the real signature image
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}signature.png`;

    let animId = 0;
    let delayId = 0;
    let cancelled = false;

    img.onload = () => {
      if (cancelled) return;

      // ── Size the canvas at device-pixel resolution ──
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d')!;

      // Off-screen mask canvas (accumulates white brush strokes)
      const mask = document.createElement('canvas');
      mask.width = w;
      mask.height = h;
      const mctx = mask.getContext('2d')!;
      mctx.fillStyle = '#fff';

      let cursor = 0; // next un-drawn point index

      delayId = window.setTimeout(() => {
        const t0 = performance.now();

        const frame = (now: number) => {
          if (cancelled) return;
          const elapsed = now - t0;

          // Stamp new brush circles on the mask
          while (cursor < points.length && points[cursor].t <= elapsed) {
            const p = points[cursor];
            const cx = p.x * w;
            const cy = p.y * h;
            const r = p.r * w;
            mctx.beginPath();
            mctx.arc(cx, cy, r, 0, Math.PI * 2);
            mctx.fill();
            cursor++;
          }

          // Composite: show image only where mask is white
          ctx.clearRect(0, 0, w, h);
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(mask, 0, 0);
          ctx.globalCompositeOperation = 'source-in';
          ctx.drawImage(img, 0, 0, w, h);
          ctx.globalCompositeOperation = 'source-over';

          if (elapsed < totalDuration) {
            animId = requestAnimationFrame(frame);
          } else {
            setShowTagline(true);
          }
        };

        animId = requestAnimationFrame(frame);
      }, 400); // small pause before drawing starts
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      clearTimeout(delayId);
    };
  }, []);

  // Dismiss the overlay after the tagline appears
  useEffect(() => {
    if (!showTagline) return;
    const id = window.setTimeout(() => setIsVisible(false), 850);
    return () => clearTimeout(id);
  }, [showTagline]);

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
            <div
              className={styles.canvasWrapper}
              style={{ aspectRatio: IMG_ASPECT }}
            >
              <canvas
                ref={canvasRef}
                className={styles.signatureCanvas}
                aria-label="Bhavy Patel handwritten signature"
                role="img"
              />
            </div>

            <span
              className={`${styles.tagline} ${
                showTagline ? styles.taglineVisible : ''
              }`}
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

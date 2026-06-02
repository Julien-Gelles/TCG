import styled from 'styled-components';
import { motion } from 'motion/react';

// ─── Wrapper (motion) ─────────────────────────────────────────────────────────

export const CardWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  touch-action: none;
  user-select: none;
  /*
    Absolute within CardStack so it overlaps StaticCardSlot at exactly the same coords.
    z-index 10 ensures it stays above the static cards (z-index 0…n).
  */
  position: absolute;
  inset: 0;
  z-index: 10;

  &:active {
    cursor: grabbing;
  }
`;

// ─── Card shell ───────────────────────────────────────────────────────────────

export const CardShell = styled.div<{ $rarity: 'common' | 'uncommon' | 'rare' | 'ultra' }>`
  width: 280px;
  height: 392px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  /* perspective kept here for future parallax/glare/holo effects */
  perspective: 1000px;
  will-change: transform;

  ${({ $rarity }) => rarityStyles[$rarity]}
`;

const rarityStyles = {
  common: `
    outline: 2px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.35),
      0 24px 48px rgba(0, 0, 0, 0.3);
  `,
  uncommon: `
    outline: 2px solid rgba(80, 200, 120, 0.55);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.35),
      0 24px 48px rgba(0, 0, 0, 0.3),
      0 0 24px rgba(80, 200, 120, 0.35);
  `,
  rare: `
    outline: 2px solid rgba(80, 140, 255, 0.75);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.35),
      0 24px 48px rgba(0, 0, 0, 0.3),
      0 0 36px rgba(80, 140, 255, 0.5);
  `,
  ultra: `
    outline: 2px solid rgba(255, 200, 40, 0.85);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.35),
      0 24px 48px rgba(0, 0, 0, 0.3),
      0 0 48px rgba(255, 200, 40, 0.55);
  `,
} as const;

// ─── Card image ───────────────────────────────────────────────────────────────

export const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  border-radius: inherit;
`;

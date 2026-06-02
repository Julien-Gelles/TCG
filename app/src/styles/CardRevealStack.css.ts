import styled, { keyframes } from 'styled-components';
import { motion } from 'motion/react';

// ─── Root container ───────────────────────────────────────────────────────────

export const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 60%, #12122a 0%, #070711 100%);
`;

// ─── Deck phase ──────────────────────────────────────────────────────────────

export const DeckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const DeckContent = styled(motion.div)`
  position: relative;
  width: 280px;
  height: 392px;
`;

export const DeckCard = styled(motion.div)`
  position: absolute;
`;

export const CardBack = styled.div`
  border-radius: 16px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 10px 28px rgba(0, 0, 0, 0.4);
`;

// ─── Flip phase ──────────────────────────────────

export const FlipCard = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;

`;

export const FlipFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

export const FlipFrontFace = styled(FlipFace)`
  transform: rotateY(180deg);
`;

/*
  Glow overlay placed inside FlipFrontFace.
  Because it inherits backface-visibility:hidden from its parent, it is invisible
  during the first 90° of the flip — exactly when the back is facing the viewer.
  Its opacity animation starts at t=0 (same moment as the flip) with the same
  duration (0.8 s), so when the front face first becomes visible at ~t=0.4 s,
  the glow is already at ~50 % opacity and builds to 100 % by flip end.
*/
export const FlipGlow = styled(motion.div)<{
  $rarity: 'common' | 'uncommon' | 'rare' | 'ultra';
}>`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  ${({ $rarity }) => flipGlowStyles[$rarity]}
  border: 2px solid red;
`;

const flipGlowStyles: Record<'common' | 'uncommon' | 'rare' | 'ultra', string> = {
  common:   '',
  uncommon: 'box-shadow: 0 0 32px 10px rgba(80, 200, 120, 0.55);',
  rare:     'box-shadow: 0 0 42px 14px rgba(80, 140, 255, 0.65);',
  ultra:    'box-shadow: 0 0 56px 18px rgba(255, 200, 40, 0.70);',
};

// ─── Hint text ────────────────────────────────────────────────────────────────

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.35; }
  50%       { opacity: 0.7; }
`;

export const Hint = styled.p`
  color: rgba(255, 255, 255, 0.35);
  font-size: 13px;
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  animation: ${pulseAnimation} 2.2s ease-in-out infinite;
`;

// ─── Card reveal phase ────────────────────────────────────────────────────────

export const RevealArea = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

/*
  Each non-active card — absolutely covers CardStack (not the full viewport),
  so it is aligned with the active card by construction.
  pointer-events: none — only the top Card (z-index 10 via CardWrapper) is interactive.
*/
export const StaticCardSlot = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

export const Counter = styled.p`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  color: rgba(255, 255, 255, 0.3);
  font-size: 13px;
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.14em;
  white-space: nowrap;
`;

// ─── Finished state ───────────────────────────────────────────────────────────

export const Finished = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 32px;
`;

export const FinishedEmoji = styled.span`
  font-size: 52px;
  line-height: 1;
`;

export const FinishedText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 17px;
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.04em;
`;

export const FinishedButton = styled.button`
  margin-top: 16px;
  padding: 12px 24px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  `;

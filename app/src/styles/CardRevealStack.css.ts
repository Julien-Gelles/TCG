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
  border-radius: 12px;
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

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Card } from './Card';
import type { CardRevealStackProps } from '../../types/card';
import { CardShell, CardImage } from '../../styles/Card.css';
import {Button} from '@mui/material';
import {
  Root,
  PerspectiveWrapper,
  StackInner,
  StackCard,
  CardBackShell,
  FlipCard,
  FlipFace,
  FlipFrontFace,
  FlipGlow,
  Hint,
  RevealArea,
  CardStack,
  StaticCardSlot,
  Counter,
  Finished,
  FinishedEmoji,
  FinishedText,
} from '../../styles/CardRevealStack.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'stack_back' | 'stack_back_bis' | 'card_front' | 'finished';

type BisStep = 'compress' | 'flip';

const CARD_BACK_URL = 'https://images.pokemontcg.io/sv3pt5/245_hires.png';
const COMPRESS_MS = 380;

// ─── Component ────────────────────────────────────────────────────────────────

export function CardRevealStack({ cards, onFinished }: CardRevealStackProps) {
  const [phase, setPhase] = useState<Phase>('stack_back');
  const [bisStep, setBisStep] = useState<BisStep>('compress');
  const [currentIndex, setCurrentIndex] = useState(0);

  // When entering stack_back_bis, start with compress then schedule flip
  useEffect(() => {
    if (phase !== 'stack_back_bis') return;
    setBisStep('compress');
    const t = setTimeout(() => setBisStep('flip'), COMPRESS_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const handleStackClick = useCallback(() => {
    if (phase === 'stack_back') setPhase('stack_back_bis');
  }, [phase]);

  const handleFlipComplete = useCallback(() => {
    setPhase('card_front');
  }, []);

  const handleSwipe = useCallback(
    (_direction: 'left' | 'right') => {
      const next = currentIndex + 1;
      if (next >= cards.length) {
        setPhase('finished');
        onFinished?.();
      } else {
        setCurrentIndex(next);
      }
    },
    [currentIndex, cards.length, onFinished],
  );

  const isStackPhase = phase === 'stack_back' || phase === 'stack_back_bis';

  return (
    <Root>
      <AnimatePresence mode="wait">

        {isStackPhase && (
          <PerspectiveWrapper
            key="stack"
            onClick={phase === 'stack_back' ? handleStackClick : undefined}
            style={{ cursor: phase === 'stack_back' ? 'pointer' : 'default' }}
          >
            <StackInner>
              {cards.map((card, i) => {
                const depth = i;

                if (phase === 'stack_back_bis' && bisStep === 'flip') {
                  if (i === 0) return null;
                  return (
                    <StackCard
                      key={card.id}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0 }}
                      style={{ zIndex: cards.length - depth }}
                    >
                      <CardBackShell>
                        <CardImage src={CARD_BACK_URL} alt="card back" draggable={false} />
                      </CardBackShell>
                    </StackCard>
                  );
                }

                return (
                  <StackCard
                    key={card.id}
                    initial={false}
                    animate={{
                      y: phase === 'stack_back_bis' ? 0 : depth * -12,
                      z: phase === 'stack_back_bis' ? -depth * 8 : -depth * 8,
                      scale: phase === 'stack_back_bis' ? 1 : 1 - depth * 0.01,
                    }}
                    transition={{ duration: COMPRESS_MS / 1000, ease: 'easeInOut' }}
                    style={{ zIndex: cards.length - depth }}
                  >
                    <CardBackShell>
                      <CardImage src={CARD_BACK_URL} alt="card back" draggable={false} />
                    </CardBackShell>
                  </StackCard>
                );
              })}

              {phase === 'stack_back_bis' && bisStep === 'flip' && (
                <FlipCard
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  onAnimationComplete={handleFlipComplete}
                >
                  <FlipFace>
                    <CardBackShell>
                      <CardImage src={CARD_BACK_URL} alt="card back" draggable={false} />
                    </CardBackShell>
                  </FlipFace>
                  <FlipFrontFace>
                    <CardShell $rarity={cards[0].rarity}>
                      <CardImage src={cards[0].image} alt={cards[0].id} draggable={false} />
                    </CardShell>
                    {/* Glow animates 0→1 over the full flip duration (0.8 s).
                        Hidden until 90° via inherited backface-visibility:hidden,
                        so at the moment the front becomes visible it is already
                        ~50 % opacity and continues rising to 100 % by flip end. */}
                    <FlipGlow
                      $rarity={cards[0].rarity}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeIn' }}
                    />
                  </FlipFrontFace>
                </FlipCard>
              )}
            </StackInner>

            <Hint style={{ visibility: phase === 'stack_back' ? 'visible' : 'hidden' }}>
              Tapez pour révéler
            </Hint>
          </PerspectiveWrapper>
        )}

        {phase === 'card_front' && (
          <RevealArea
            key="reveal"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
          
            <CardStack>
              {[...cards.slice(currentIndex + 1)].reverse().map((card, i) => (
                <StaticCardSlot key={card.id} style={{ zIndex: i }}>
                  <CardShell $rarity={card.rarity}>
                    <CardImage src={card.image} alt={card.id} draggable={false} />
                  </CardShell>
                </StaticCardSlot>
              ))}

              <Card
                key={`card-${currentIndex}`}
                card={cards[currentIndex]}
                onSwipe={handleSwipe}
              />
            </CardStack>

            <Hint>Glissez pour révéler</Hint>

            <Counter>
              {currentIndex + 1}&thinsp;/&thinsp;{cards.length}
            </Counter>
          </RevealArea>
        )}

        {phase === 'finished' && (
          <Finished
            key="finished"
            initial={{ opacity: 0, scale: 0.78, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <FinishedEmoji>✨</FinishedEmoji>
            <FinishedText>Toutes les cartes ont été révélées</FinishedText>
            <Button onClick={() => window.location.reload()}>Recommencer</Button>
          </Finished>
        )}

      </AnimatePresence>
    </Root>
  );
}

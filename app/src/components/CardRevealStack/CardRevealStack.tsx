import { useState, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import { Card } from './Card'
import type { CardRevealStackProps } from '../../types/card'
import { CardShell, CardImage } from '../../styles/Card.css'
import { Button } from '@mui/material'
import {
  Root,
  CardBack,
  FlipCard,
  FlipFace,
  FlipFrontFace,
  FlipGlow,
  Hint,
  RevealArea,
  StaticCardSlot,
  Counter,
  Finished,
  FinishedEmoji,
  FinishedText,
  FinishedButton,
  DeckWrapper,
  DeckContent,
  DeckCard,
} from '../../styles/CardRevealStack.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | 'stack_back'
  | 'stack_align'
  | 'stack_flip'
  | 'stack_front'
  | 'finished'

const CARD_BACK_URL = 'https://images.pokemontcg.io/sv3pt5/245_hires.png'
const COMPRESS_MS = 380
const DEPTH_RATIO = 0.01
const CARDS_SHIFT = 12

// ─── Component ────────────────────────────────────────────────────────────────

export function CardRevealStack({ cards, onFinished }: CardRevealStackProps) {
  const [phase, setPhase] = useState<Phase>('stack_back')
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSwipe = useCallback(
    (_direction: 'left' | 'right') => {
      const next = currentIndex + 1
      if (next >= cards.length) {
        setPhase('finished')
        onFinished?.()
      } else {
        setCurrentIndex(next)
      }
    },
    [currentIndex, cards.length, onFinished]
  )

  return (
    <Root>
      <AnimatePresence mode="wait">
        {phase === 'stack_back' && (
          <DeckWrapper onClick={() => setPhase('stack_align')}>
            <DeckContent>
              {cards.map((card, i) => {
                const depth = cards.length - i - 1
                return (
                  <DeckCard
                    key={card.id}
                    animate={{
                      y: depth * -CARDS_SHIFT,
                      scale: 1 - depth * DEPTH_RATIO,
                    }}
                  >
                    <CardBack>
                      <CardImage
                        src={CARD_BACK_URL}
                        alt="card back"
                        draggable={false}
                      />
                    </CardBack>
                  </DeckCard>
                )
              })}
            </DeckContent>
            <Hint>Cliquez pour révéler</Hint>
          </DeckWrapper>
        )}

        {phase === 'stack_align' && (
          <DeckWrapper>
            <DeckContent>
              {cards.map((card, i) => {
                const depth = cards.length - i - 1
                return (
                  <DeckCard
                    key={card.id}
                    initial={{
                      y: depth * CARDS_SHIFT,
                      scale: 1 - depth * DEPTH_RATIO,
                    }}
                    animate={{
                      y: 0,
                      scale: 1 - depth * DEPTH_RATIO,
                    }}
                    transition={{
                      duration: COMPRESS_MS / 1000,
                      ease: 'easeInOut',
                    }}
                    onAnimationComplete={() => setPhase('stack_flip')}
                  >
                    <CardBack>
                      <CardImage
                        src={CARD_BACK_URL}
                        alt="card back"
                        draggable={false}
                      />
                    </CardBack>
                  </DeckCard>
                )
              })}
            </DeckContent>
            <Hint style={{ visibility: 'hidden' }}>Cliquez pour révéler</Hint>
          </DeckWrapper>
        )}

        {phase === 'stack_flip' && (
          <DeckWrapper>
            <DeckContent>
              <FlipCard
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onAnimationComplete={() => setPhase('stack_front')}
              >
                <FlipFace>
                  <CardBack>
                    <CardImage
                      src={CARD_BACK_URL}
                      alt="card back"
                      draggable={false}
                    />
                  </CardBack>
                </FlipFace>
                <FlipFrontFace>
                  <CardShell $rarity={cards[0].rarity}>
                    <CardImage
                      src={cards[0].image}
                      alt={cards[0].id}
                      draggable={false}
                    />
                  </CardShell>
                  <FlipGlow
                    $rarity={cards[0].rarity}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0
                    }}
                  />
                </FlipFrontFace>
              </FlipCard>
            </DeckContent>
            <Hint style={{ visibility: 'hidden' }}>Cliquez pour révéler</Hint>
          </DeckWrapper>
        )}

        {phase === 'stack_front' && (
          <RevealArea
            key="reveal"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <DeckContent>
              {[...cards.slice(currentIndex + 1)].reverse().map((card) => (
                <StaticCardSlot key={card.id}>
                    <CardImage
                      src={card.image}
                      alt={card.id}
                      draggable={false}
                    />
                </StaticCardSlot>
              ))}

              <Card
                key={`card-${currentIndex}`}
                card={cards[currentIndex]}
                onSwipe={handleSwipe}
              />
            </DeckContent>

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
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 24,
            }}
          >
            <FinishedEmoji>✨</FinishedEmoji>
            <FinishedText>Toutes les cartes ont été révélées</FinishedText>
            <FinishedButton onClick={() => window.location.reload()}>
              Recommencer
            </FinishedButton>
          </Finished>
        )}
      </AnimatePresence>
    </Root>
  )
}

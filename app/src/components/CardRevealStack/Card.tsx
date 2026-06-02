import { useEffect } from 'react'
import { useMotionValue, useTransform, animate, motion } from 'motion/react'
import type { PanInfo } from 'motion/react'
import type { CardData } from '../../types/card'
import { CardWrapper, CardShell, CardImage } from '../../styles/Card.css'

interface CardProps {
  card: CardData
  onSwipe: (direction: 'left' | 'right', currentX: number) => void
  onDragStart?: () => void
}

interface DepartingCardProps {
  card: CardData
  startX: number
  direction: 1 | -1
  onDone: () => void
}

const SWIPE_OFFSET_THRESHOLD = 100
const SWIPE_VELOCITY_THRESHOLD = 500

export function Card({ card, onSwipe, onDragStart }: CardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-320, 0, 320], [-22, 0, 22])
  const opacity = useTransform(x, [-280, -120, 0, 120, 280], [0.6, 1, 1, 1, 0.6])

  function handleDragEnd(_event: unknown, info: PanInfo) {
    const absOffset = Math.abs(info.offset.x)
    const absVelocity = Math.abs(info.velocity.x)
    const triggered =
      absOffset > SWIPE_OFFSET_THRESHOLD || absVelocity > SWIPE_VELOCITY_THRESHOLD

    if (triggered) {
      const dir = (Math.sign(info.offset.x) || Math.sign(info.velocity.x) || 1) as 1 | -1
      onSwipe(dir > 0 ? 'right' : 'left', x.get())
    } else {
      animate(x, 0, { type: 'spring', stiffness: 420, damping: 36 })
    }
  }

  return (
    <CardWrapper
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.75}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.06 }}
    >
      <CardShell $rarity={card.rarity}>
        <CardImage src={card.image} alt={card.id} draggable={false} />
      </CardShell>
    </CardWrapper>
  )
}

export function DepartingCard({ card, startX, direction, onDone }: DepartingCardProps) {
  const x = useMotionValue(startX)
  const rotate = useTransform(x, [-320, 0, 320], [-22, 0, 22])
  const opacity = useTransform(x, [-280, -120, 0, 120, 280], [0.6, 1, 1, 1, 0.6])

  useEffect(() => {
    const controls = animate(x, direction * (window.innerWidth + 320), {
      type: 'spring',
      stiffness: 200,
      damping: 26,
      restSpeed: 10,
      onComplete: onDone,
    })
    return () => controls.stop()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CardShell $rarity={card.rarity}>
        <CardImage src={card.image} alt={card.id} draggable={false} />
      </CardShell>
    </motion.div>
  )
}

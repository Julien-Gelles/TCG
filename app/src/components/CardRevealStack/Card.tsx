import { useMotionValue, useTransform, animate } from 'motion/react';
import type { PanInfo } from 'motion/react';
import type { CardData } from '../../types/card';
import { CardWrapper, CardShell, CardImage } from '../../styles/Card.css';

interface CardProps {
  card: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  holo?: boolean;
  glare?: boolean;
  parallax?: boolean;
}

const SWIPE_OFFSET_THRESHOLD = 100;
const SWIPE_VELOCITY_THRESHOLD = 500;

export function Card({ card, onSwipe }: CardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-320, 0, 320], [-22, 0, 22]);
  const opacity = useTransform(x, [-280, -120, 0, 120, 280], [0.6, 1, 1, 1, 0.6]);

  async function handleDragEnd(_event: unknown, info: PanInfo) {
    const absOffset = Math.abs(info.offset.x);
    const absVelocity = Math.abs(info.velocity.x);
    const triggered =
      absOffset > SWIPE_OFFSET_THRESHOLD || absVelocity > SWIPE_VELOCITY_THRESHOLD;

    if (triggered) {
      const dir = (Math.sign(info.offset.x) || Math.sign(info.velocity.x) || 1) as 1 | -1;
      // Start the fly-out without awaiting — onSwipe advances the index
      // immediately so the next card is draggable right away.
      // The animation is cut short when this Card unmounts, which is fine.
      animate(x, dir * (window.innerWidth + 320), {
        type: 'spring',
        stiffness: 200,
        damping: 26,
        restSpeed: 10,
      });
      onSwipe(dir > 0 ? 'right' : 'left');
    } else {
      animate(x, 0, { type: 'spring', stiffness: 420, damping: 36 });
    }
  }

  return (
    <CardWrapper
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.75}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.06 }}
    >
      <CardShell $rarity={card.rarity}>
        <CardImage src={card.image} alt={card.id} draggable={false} />
      </CardShell>
    </CardWrapper>
  );
}

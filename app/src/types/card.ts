export interface CardData {
    id: string
    image: string
    rarity: 'common' | 'uncommon' | 'rare' | 'ultra'
  }
  
  export interface CardRevealStackProps {
    cards: CardData[]
    onFinished?: () => void
  }
  
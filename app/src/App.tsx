import { CardRevealStack } from './components/CardRevealStack';
import type { CardData } from './components/CardRevealStack';

// Replace these with your actual card images
const DEMO_CARDS: CardData[] = [
  {
    id: 'varoom',
    image: 'https://images.pokemontcg.io/sv1/140_hires.png',
    rarity: 'rare',
  },
  {
    id: 'pineco',
    image: 'https://images.pokemontcg.io/sv1/1_hires.png',
    rarity: 'uncommon',
  },
  {
    id: 'charizard',
    image: 'https://images.pokemontcg.io/sv3/215_hires.png',
    rarity: 'ultra',
  }
];

function App() {
  return (
    <CardRevealStack
      cards={DEMO_CARDS}
      onFinished={() => console.log('All cards revealed!')}
    />
  );
}

export default App;

export const scripts = [
  {
    id: 1,
    title: 'Nebula Drift',
    author: 'Aria Solis',
    genre: 'Sci-Fi',
    price: 24.99,
    featured: true,
    createdAt: '2025-12-25T09:15:00Z',
    logo:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    title: 'Crimson Waltz',
    author: 'Milo Hart',
    genre: 'Thriller',
    price: 18.5,
    featured: true,
    createdAt: '2025-12-24T18:45:00Z',
    logo:
      'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    title: 'Citrus Skies',
    author: 'Nora Han',
    genre: 'Drama',
    price: 14.0,
    featured: false,
    createdAt: '2025-12-23T15:20:00Z',
    logo:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    title: 'Echoes in Neon',
    author: 'Priya Vale',
    genre: 'Cyberpunk',
    price: 29.99,
    featured: false,
    createdAt: '2025-12-22T21:00:00Z',
    logo: '',
  },
  {
    id: 5,
    title: 'Glass Meridian',
    author: 'Theo Wilder',
    genre: 'Adventure',
    price: 19.99,
    featured: false,
    createdAt: '2025-12-25T08:40:00Z',
    logo:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 6,
    title: 'Midnight Ledger',
    author: 'Ivy Brooks',
    genre: 'Drama',
    price: 12.5,
    featured: false,
    createdAt: '2025-12-25T10:10:00Z',
    logo:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
  },
];

const names = [
  'Samira Quinn',
  'Alex Park',
  'Rina Doyle',
  'Leo Cross',
  'Harper Sage',
  'Nova Lee',
  'Crispin Hale',
  'Mara Stone',
  'Felix Rowan',
  'Juno Vale',
];

const genres = [
  ['Sci-Fi', 'Adventure'],
  ['Drama', 'Romance'],
  ['Thriller', 'Mystery'],
  ['Comedy', 'Romance'],
  ['Adventure', 'Drama'],
  ['Fantasy', 'Sci-Fi'],
  ['Thriller', 'Crime'],
  ['Drama', 'Biography'],
  ['Cyberpunk', 'Sci-Fi'],
  ['Comedy', 'Family'],
];

export const authors = Array.from({ length: 20 }).map((_, i) => {
  const idx = i % names.length;
  const name = `${names[idx]} #${i + 1}`;
  return {
    id: i + 1,
    name,
    topGenres: genres[idx],
    avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(name)}`,
  };
});

export const profiles = {
  'Samira Quinn #1': {
    name: 'Samira Quinn #1',
    bio: 'Samira Quinn crafts grounded, high-stakes science fiction that spotlights complex family dynamics and moral tradeoffs at the edge of known space.',
    awards: ['Nebula Screen Award - Best Debut', 'Aurora Spotlight'],
    scriptsAvailable: 6,
    scriptsSold: 3,
    avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=Samira-Quinn-1`,
    scripts: [
      {
        id: 'sq-1',
        title: 'Starward Kin',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=400&q=80',
        description:
          'A generational ship drama that follows two estranged siblings forced to cooperate when the ship’s AI fractures into rival factions. The story examines duty versus autonomy, with sweeping set pieces in hydroponic forests, maintenance shafts, and observation decks. Political intrigue collides with family stakes as the siblings navigate loyalty to crew and kin.',
        actorsNeeded: 8,
        productionNotes: 'Practical sets for corridors; holographic UI overlays; limited CGI for exterior ship shots and zero-g sequences.',
      },
      {
        id: 'sq-2',
        title: 'The Glass Warden',
        price: 18.5,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
        description:
          'On a remote research moon, a security officer uncovers a clandestine program rewriting scientists’ memories to erase dissent. As recollections bleed through, the officer must decide whether to preserve the painful truth or uphold an engineered peace, threading a tense ethical thriller through cold laboratories and ice caverns.',
        actorsNeeded: 6,
        productionNotes: 'Minimal CGI beyond atmospheric sky domes; favors practical lighting and in-camera haze for sterile labs.',
      },
    ],
  },
  'Alex Park #2': {
    name: 'Alex Park #2',
    bio: 'Alex Park blends thriller pacing with character-first romance, focusing on ordinary people pulled into extraordinary conspiracies.',
    awards: ['Silver Quill', 'Festival Jury Mention'],
    scriptsAvailable: 4,
    scriptsSold: 5,
    avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=Alex-Park-2`,
    scripts: [
      {
        id: 'ap-1',
        title: 'Signal of Two',
        price: 16.0,
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80',
        description:
          'A radio engineer intercepts a clandestine distress call that mirrors a message he sent years earlier, pulling him and his former partner into a globe-spanning chase. Trust fractures and rekindles as the pair decode signals while evading corporate mercenaries.',
        actorsNeeded: 7,
        productionNotes: 'Urban locations with light CGI for signal visualizations; car chases rely on practical stunts.',
      },
    ],
  },
};

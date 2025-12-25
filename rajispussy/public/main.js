import React, { useMemo, useState } from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';
import ScreenwriterProfileCustomerView from './ScreenwriterProfileCustomerView.js';

const h = React.createElement;

const defaultScripts = [
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

const featuredAuthors = Array.from({ length: 20 }).map((_, i) => {
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
  const idx = i % names.length;
  return {
    id: i + 1,
    name: `${names[idx]} #${i + 1}`,
    topGenres: genres[idx],
    avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(names[idx])}-${i}`,
  };
});

const authorProfiles = {
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

function encodeRouteName(name) {
  return encodeURIComponent(name);
}

function decodeRouteName(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '').replace(/^\/+/, '');
  const [first, ...rest] = hash.split('/');
  if (first === 'author' && rest.length) {
    return { name: 'author', authorName: decodeRouteName(rest.join('/')) };
  }
  return { name: 'home' };
}

const routeListeners = new Set();
let currentRoute = parseRoute();

function notifyRoute() {
  currentRoute = parseRoute();
  routeListeners.forEach((listener) => listener(currentRoute));
}

window.addEventListener('hashchange', notifyRoute);

function useRoute() {
  const [route, setRoute] = useState(currentRoute);
  if (!routeListeners.has(setRoute)) {
    routeListeners.add(setRoute);
  }
  return route;
}

function goToAuthor(name) {
  window.location.hash = `#/author/${encodeRouteName(name)}`;
}

function goHome() {
  window.location.hash = '#/';
}

function InfoBar() {
  return h(
    'div',
    { className: 'info-bar' },
    h('div', null, h('p', { className: 'tag', style: { margin: 0 } }, 'Script Market')), // banner
    h(
      'div',
      { className: 'info-bar__actions' },
      h('span', { className: 'info-bar__text' }, 'Discover, feature, and share scripts.'),
      h(
        'button',
        {
          type: 'button',
          className: 'btn contribute',
          onClick: () => alert('Thanks for your interest in contributing!'),
        },
        '+ Contribute',
      ),
    ),
  );
}

function FeaturedScripts({ scripts }) {
  const topTwo = scripts.slice(0, 2);
  return h(
    'section',
    { className: 'card' },
    h('h2', null, 'Featured scripts'),
    h(
      'div',
      { className: 'featured-grid' },
      topTwo.map((script) =>
        h(
          'article',
          { key: script.id, className: 'script-card promo' },
          h(
            'div',
            { className: 'script-header' },
            h('img', {
              src:
                script.logo ||
                'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=200&q=80',
              alt: `${script.title} logo`,
              className: 'script-logo',
            }),
            h(
              'div',
              null,
              h('div', { className: 'tag' }, script.genre),
              h('h3', { style: { margin: '4px 0 0' } }, script.title),
              h('p', { style: { margin: 0, color: '#cbd5e1' } }, `by ${script.author}`),
            ),
          ),
          h('p', { className: 'price' }, `$${script.price.toFixed(2)}`),
          h('div', { className: 'tag' }, 'Advertised placement'),
        ),
      ),
    ),
  );
}

function FeaturedAuthors({ authors }) {
  return h(
    'section',
    { className: 'card' },
    h('h2', null, 'Featured authors'),
    h(
      'div',
      { className: 'authors-grid' },
      authors.map((author) =>
        h(
          'article',
          { key: author.id, className: 'author-card' },
          h('img', { src: author.avatar, alt: `${author.name} avatar`, className: 'author-avatar' }),
          h(
            'div',
            null,
            h('button', { className: 'author-name linkish', type: 'button', onClick: () => goToAuthor(author.name) }, author.name),
            h(
              'div',
              { className: 'author-genres' },
              author.topGenres.map((g) => h('span', { className: 'tag', key: g }, g)),
            ),
          ),
        ),
      ),
    ),
  );
}

function SearchBar({ query, setQuery }) {
  return h(
    'div',
    { className: 'card' },
    h('h2', null, 'Search scripts'),
    h('input', {
      placeholder: 'Search by title, author, or genre',
      value: query,
      onInput: (e) => setQuery(e.target.value),
    }),
  );
}

function RecentScripts({ scripts, query }) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...scripts]
      .filter((s) => `${s.title} ${s.author} ${s.genre}`.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [scripts, query]);

  return h(
    'section',
    { className: 'card' },
    h('h2', null, 'Most recently posted'),
    h(
      'div',
      { className: 'script-grid' },
      filtered.map((script) =>
        h(
          'article',
          { key: script.id, className: 'script-card' },
          h(
            'div',
            { className: 'script-header' },
            h('img', {
              src:
                script.logo ||
                'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=200&q=80',
              alt: `${script.title} logo`,
              className: 'script-logo',
            }),
            h(
              'div',
              null,
              h('div', { className: 'tag' }, script.genre),
              h('h3', { style: { margin: '4px 0 0' } }, script.title),
              h('p', { style: { margin: 0, color: '#cbd5e1' } }, `by ${script.author}`),
            ),
          ),
          h('p', { className: 'price' }, `$${script.price.toFixed(2)}`),
          h('div', { className: 'tag subtle' }, `Posted ${new Date(script.createdAt).toLocaleString()}`),
        ),
      ),
    ),
  );
}

// Auth components kept separate for future routing but not rendered on the landing page yet.
function CreateAccount() {
  return h('div', null, 'Create Account form placeholder');
}

function SignIn() {
  return h('div', null, 'Sign In form placeholder');
}

function App() {
  const [scripts] = useState(defaultScripts);
  const [query, setQuery] = useState('');
  const route = useRoute();
  const featured = useMemo(() => scripts.filter((s) => s.featured), [scripts]);

  if (route.name === 'author') {
    const profile = authorProfiles[route.authorName];
    return h(ScreenwriterProfileCustomerView, { profile, onBack: goHome });
  }

  return h(
    'main',
    { className: 'app-shell' },
    h(InfoBar),
    h(
      'header',
      { className: 'page-header' },
      h('h1', { className: 'page-title' }, 'Script Market'),
      h(
        'p',
        { style: { color: '#cbd5e1', maxWidth: 720 } },
        'Featured scripts, highlighted authors, and the latest drops—all in one place.',
      ),
    ),
    h(FeaturedScripts, { scripts: featured }),
    h(FeaturedAuthors, { authors: featuredAuthors }),
    h(SearchBar, { query, setQuery }),
    h(RecentScripts, { scripts, query }),
  );
}

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);
if (rootContainer) {
  rootContainer.textContent = 'Loading Script Market...';
}

try {
  root.render(h(App));
} catch (err) {
  console.error('Failed to render Script Market', err);
  if (rootContainer) {
    rootContainer.innerHTML = `<div style="padding:16px;color:#fee2e2;background:#450a0a;border-radius:12px;border:1px solid #7f1d1d;">Failed to load app: ${err.message}</div>`;
  }
}

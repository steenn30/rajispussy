import React, { useMemo, useState } from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';

const h = React.createElement;

const defaultScripts = [
  {
    id: 1,
    title: 'Nebula Drift',
    author: 'Aria Solis',
    genre: 'Sci-Fi',
    price: 24.99,
    featured: true,
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
    logo: '',
  },
];

const GENRES = ['Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure', 'Comedy', 'Cyberpunk'];

function evaluatePassword(password) {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return { hasLength, hasUpper, hasNumber, hasSpecial };
}

function Rule({ ok, children }) {
  return h(
    'div',
    { className: `rule ${ok ? 'valid' : ''}` },
    h('span', null, ok ? '✅' : '⏳'),
    h('span', null, children),
  );
}

function SocialButtons({ onSelect }) {
  const providers = [
    { key: 'google', label: 'Google', className: 'google' },
    { key: 'twitter', label: 'Twitter / X', className: 'twitter' },
    { key: 'facebook', label: 'Facebook', className: 'facebook' },
  ];

  return h(
    'div',
    { className: 'social-grid' },
    providers.map((provider) =>
      h(
        'button',
        {
          key: provider.key,
          type: 'button',
          className: `social-btn ${provider.className}`,
          onClick: () => onSelect(provider.key),
        },
        h('span', { 'aria-hidden': true }, '🔗'),
        provider.label,
      ),
    ),
  );
}

function AuthPanel({ onAccountCreated }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [status, setStatus] = useState('');
  const [lastProvider, setLastProvider] = useState('');

  const rules = evaluatePassword(form.password);
  const rulesSatisfied = Object.values(rules).every(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      setStatus('Please add your name and email to create an account.');
      return;
    }

    if (!rulesSatisfied) {
      setStatus('Make sure your password meets all requirements.');
      return;
    }

    if (form.password !== form.confirm) {
      setStatus('Passwords need to match.');
      return;
    }

    const payload = {
      name: form.fullName.trim(),
      email: form.email.trim(),
      createdAt: new Date().toISOString(),
    };

    onAccountCreated?.(payload);
    setStatus('Account created successfully! You can now explore scripts.');
    setForm({ fullName: '', email: '', password: '', confirm: '' });
  };

  const handleSocial = (provider) => {
    setLastProvider(provider);
    setStatus(`Redirecting to ${provider} for secure sign-in...`);
  };

  return h(
    'div',
    { className: 'card' },
    h('h2', null, 'Create an account'),
    h(
      'form',
      { onSubmit: handleSubmit, className: 'form-grid' },
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'fullName' }, 'Full name'),
        h('input', {
          id: 'fullName',
          name: 'fullName',
          placeholder: 'Samira Writer',
          value: form.fullName,
          onInput: handleChange,
          required: true,
        }),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'email' }, 'Email'),
        h('input', {
          id: 'email',
          name: 'email',
          type: 'email',
          placeholder: 'you@example.com',
          value: form.email,
          onInput: handleChange,
          required: true,
        }),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'password' }, 'Password'),
        h('input', {
          id: 'password',
          name: 'password',
          type: 'password',
          placeholder: 'At least 8 characters',
          value: form.password,
          onInput: handleChange,
          required: true,
        }),
        h(
          'div',
          { className: 'password-rules', 'aria-live': 'polite' },
          h(Rule, { ok: rules.hasLength }, 'At least 8 characters'),
          h(Rule, { ok: rules.hasUpper }, 'Contains an uppercase letter'),
          h(Rule, { ok: rules.hasNumber }, 'Contains a number'),
          h(Rule, { ok: rules.hasSpecial }, 'Contains a special symbol'),
        ),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'confirm' }, 'Confirm password'),
        h('input', {
          id: 'confirm',
          name: 'confirm',
          type: 'password',
          placeholder: 'Repeat password',
          value: form.confirm,
          onInput: handleChange,
          required: true,
        }),
      ),
      h('button', { type: 'submit' }, 'Create account'),
    ),
    h('hr', { className: 'divider' }),
    h(
      'p',
      { style: { marginTop: 0, marginBottom: 8, color: '#cbd5e1' } },
      'Or sign in with',
    ),
    h(SocialButtons, { onSelect: handleSocial }),
    lastProvider
      ? h(
          'p',
          { style: { color: '#cbd5e1', marginTop: 8 } },
          'Last selected: ',
          h('strong', null, lastProvider),
        )
      : null,
    status ? h('div', { className: 'status-message' }, status) : null,
  );
}

function ScriptForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: 'Drama',
    price: '15.00',
    logo: '',
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;

    onAdd({
      id: Date.now(),
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre,
      price: Number(form.price) || 0,
      featured: form.featured,
      logo: form.logo.trim(),
    });

    setForm({ title: '', author: '', genre: 'Drama', price: '15.00', logo: '', featured: false });
  };

  return h(
    'div',
    { className: 'card' },
    h('h2', null, 'Publish a script'),
    h(
      'form',
      { className: 'form-grid', onSubmit: handleSubmit },
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'title' }, 'Title'),
        h('input', {
          id: 'title',
          name: 'title',
          placeholder: 'The Glass Lighthouse',
          value: form.title,
          onInput: handleChange,
          required: true,
        }),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'author' }, 'Author'),
        h('input', {
          id: 'author',
          name: 'author',
          placeholder: 'Alex Parker',
          value: form.author,
          onInput: handleChange,
          required: true,
        }),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'genre' }, 'Genre'),
        h(
          'select',
          { id: 'genre', name: 'genre', value: form.genre, onInput: handleChange },
          GENRES.map((genre) => h('option', { key: genre, value: genre }, genre)),
        ),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'price' }, 'Price (USD)'),
        h('input', {
          id: 'price',
          name: 'price',
          type: 'number',
          min: '0',
          step: '0.01',
          value: form.price,
          onInput: handleChange,
        }),
      ),
      h(
        'div',
        { className: 'form-group' },
        h('label', { htmlFor: 'logo' }, 'Logo URL (optional)'),
        h('input', {
          id: 'logo',
          name: 'logo',
          placeholder: 'https://...',
          value: form.logo,
          onInput: handleChange,
        }),
      ),
      h(
        'div',
        {
          className: 'form-group',
          style: { flexDirection: 'row', alignItems: 'center', gap: 10 },
        },
        h('input', {
          id: 'featured',
          name: 'featured',
          type: 'checkbox',
          checked: form.featured,
          onInput: handleChange,
        }),
        h(
          'label',
          { htmlFor: 'featured', style: { margin: 0 } },
          'Feature this script on the front page',
        ),
      ),
      h('button', { type: 'submit' }, 'Add script'),
    ),
  );
}

function ScriptCard({ script }) {
  const logoFallback =
    'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=200&q=80';

  return h(
    'article',
    { className: 'script-card' },
    h(
      'div',
      { className: 'script-header' },
      h('img', {
        src: script.logo || logoFallback,
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
    h(
      'div',
      { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
      script.featured ? h('div', { className: 'tag' }, 'Featured') : null,
      script.logo ? h('div', { className: 'tag' }, 'Custom logo attached') : h('div', { className: 'tag' }, 'Default logo'),
    ),
  );
}

function ScriptList({ scripts }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = useMemo(
    () =>
      scripts.filter((script) => {
        const matchesQuery = `${script.title} ${script.author}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesGenre = genre === 'All' || script.genre === genre;
        return matchesQuery && matchesGenre;
      }),
    [scripts, query, genre],
  );

  return h(
    'div',
    { className: 'card' },
    h('h2', null, 'Browse movie scripts'),
    h(
      'div',
      { className: 'search-row' },
      h('input', {
        placeholder: 'Search by title or author',
        value: query,
        onInput: (e) => setQuery(e.target.value),
      }),
      h(
        'select',
        { value: genre, onInput: (e) => setGenre(e.target.value) },
        ['All', ...GENRES].map((g) => h('option', { key: g, value: g }, g)),
      ),
      h(
        'button',
        { type: 'button', className: 'secondary', onClick: () => setQuery('') },
        'Clear search',
      ),
    ),
    h(
      'div',
      { className: 'script-grid', style: { marginTop: 12 } },
      filtered.map((script) => h(ScriptCard, { key: script.id, script })),
    ),
  );
}

function FeaturedStrip({ scripts }) {
  if (!scripts.length) return null;
  return h(
    'div',
    { className: 'card' },
    h('h2', null, 'Featured scripts'),
    h(
      'div',
      { className: 'script-grid' },
      scripts.map((script) => h(ScriptCard, { key: script.id, script })),
    ),
  );
}

function App() {
  const [scripts, setScripts] = useState(defaultScripts);
  const [recentAccount, setRecentAccount] = useState(null);

  const featuredScripts = useMemo(() => scripts.filter((s) => s.featured), [scripts]);

  const handleAddScript = (script) => {
    setScripts((prev) => [script, ...prev]);
  };

  return h(
    'main',
    { className: 'app-shell' },
    h(
      'header',
      { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      h(
        'div',
        null,
        h(
          'p',
          { className: 'tag', style: { marginBottom: 8 } },
          'React front-end library demo',
        ),
        h('h1', { className: 'page-title' }, 'Script Market'),
        h(
          'p',
          { style: { color: '#cbd5e1', maxWidth: 620 } },
          'Sign up securely, preview featured stories, and search through a curated catalog of movie scripts. Add your own scripts with pricing, genres, and logos to showcase your writing.',
        ),
      ),
      recentAccount
        ? h('div', { className: 'tag' }, `✅ Account ready for ${recentAccount.name}`)
        : null,
    ),
    h(
      'div',
      { className: 'section-grid' },
      h(AuthPanel, { onAccountCreated: setRecentAccount }),
      h(ScriptForm, { onAdd: handleAddScript }),
    ),
    h(FeaturedStrip, { scripts: featuredScripts }),
    h(ScriptList, { scripts }),
  );
}

const root = createRoot(document.getElementById('root'));
root.render(h(App));

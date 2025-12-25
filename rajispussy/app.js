const { useMemo, useState } = React;

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

function evaluatePassword(password) {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return { hasLength, hasUpper, hasNumber, hasSpecial };
}

function Rule({ ok, children }) {
  return (
    <div className={`rule ${ok ? 'valid' : ''}`}>
      <span>{ok ? '✅' : '⏳'}</span>
      <span>{children}</span>
    </div>
  );
}

function SocialButtons({ onSelect }) {
  const providers = [
    { key: 'google', label: 'Google', className: 'google' },
    { key: 'twitter', label: 'Twitter / X', className: 'twitter' },
    { key: 'facebook', label: 'Facebook', className: 'facebook' },
  ];

  return (
    <div className="social-grid">
      {providers.map((provider) => (
        <button
          key={provider.key}
          type="button"
          className={`social-btn ${provider.className}`}
          onClick={() => onSelect(provider.key)}
        >
          <span aria-hidden>🔗</span>
          {provider.label}
        </button>
      ))}
    </div>
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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
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
  }

  function handleSocial(provider) {
    setLastProvider(provider);
    setStatus(`Redirecting to ${provider} for secure sign-in...`);
  }

  return (
    <div className="card">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Samira Writer"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="password-rules" aria-live="polite">
            <Rule ok={rules.hasLength}>At least 8 characters</Rule>
            <Rule ok={rules.hasUpper}>Contains an uppercase letter</Rule>
            <Rule ok={rules.hasNumber}>Contains a number</Rule>
            <Rule ok={rules.hasSpecial}>Contains a special symbol</Rule>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm">Confirm password</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="Repeat password"
            value={form.confirm}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create account</button>
      </form>

      <hr className="divider" />
      <p style={{ marginTop: 0, marginBottom: 8, color: '#cbd5e1' }}>
        Or sign in with
      </p>
      <SocialButtons onSelect={handleSocial} />
      {lastProvider && (
        <p style={{ color: '#cbd5e1', marginTop: 8 }}>
          Last selected: <strong>{lastProvider}</strong>
        </p>
      )}

      {status && <div className="status-message">{status}</div>}
    </div>
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

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
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
  }

  return (
    <div className="card">
      <h2>Publish a script</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            placeholder="The Glass Lighthouse"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            placeholder="Alex Parker"
            value={form.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" value={form.genre} onChange={handleChange}>
            {['Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure', 'Comedy', 'Cyberpunk'].map(
              (g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (USD)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="logo">Logo URL (optional)</label>
          <input
            id="logo"
            name="logo"
            placeholder="https://..."
            value={form.logo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured" style={{ margin: 0 }}>
            Feature this script on the front page
          </label>
        </div>
        <button type="submit">Add script</button>
      </form>
    </div>
  );
}

function ScriptList({ scripts }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = useMemo(() => {
    return scripts.filter((script) => {
      const matchesQuery = `${script.title} ${script.author}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesGenre = genre === 'All' || script.genre === genre;
      return matchesQuery && matchesGenre;
    });
  }, [scripts, query, genre]);

  return (
    <div className="card">
      <h2>Browse movie scripts</h2>
      <div className="search-row">
        <input
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {['All', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure', 'Comedy', 'Cyberpunk'].map(
            (g) => (
              <option key={g}>{g}</option>
            ),
          )}
        </select>
        <button type="button" className="secondary" onClick={() => setQuery('')}>
          Clear search
        </button>
      </div>

      <div className="script-grid" style={{ marginTop: 12 }}>
        {filtered.map((script) => (
          <article key={script.id} className="script-card">
            <div className="script-header">
              <img
                src={
                  script.logo ||
                  'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=200&q=80'
                }
                alt={`${script.title} logo`}
                className="script-logo"
              />
              <div>
                <div className="tag">{script.genre}</div>
                <h3 style={{ margin: '4px 0 0' }}>{script.title}</h3>
                <p style={{ margin: 0, color: '#cbd5e1' }}>by {script.author}</p>
              </div>
            </div>
            <p className="price">${script.price.toFixed(2)}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {script.featured && <div className="tag">Featured</div>}
              {script.logo && <div className="tag">Custom logo attached</div>}
              {!script.logo && <div className="tag">Default logo</div>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FeaturedStrip({ scripts }) {
  if (!scripts.length) return null;
  return (
    <div className="card">
      <h2>Featured scripts</h2>
      <div className="script-grid">
        {scripts.map((script) => (
          <article key={script.id} className="script-card">
            <div className="script-header">
              <img
                src={
                  script.logo ||
                  'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=200&q=80'
                }
                alt={`${script.title} logo`}
                className="script-logo"
              />
              <div>
                <div className="tag">{script.genre}</div>
                <h3 style={{ margin: '4px 0 0' }}>{script.title}</h3>
                <p style={{ margin: 0, color: '#cbd5e1' }}>by {script.author}</p>
              </div>
            </div>
            <p className="price">${script.price.toFixed(2)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [scripts, setScripts] = useState(defaultScripts);
  const [recentAccount, setRecentAccount] = useState(null);

  const featuredScripts = useMemo(() => scripts.filter((s) => s.featured), [scripts]);

  function handleAddScript(script) {
    setScripts((prev) => [script, ...prev]);
  }

  return (
    <main className="app-shell">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="tag" style={{ marginBottom: 8 }}>
            React front-end library demo
          </p>
          <h1 className="page-title">Script Market</h1>
          <p style={{ color: '#cbd5e1', maxWidth: 620 }}>
            Sign up securely, preview featured stories, and search through a curated catalog of
            movie scripts. Add your own scripts with pricing, genres, and logos to showcase your
            writing.
          </p>
        </div>
        {recentAccount && (
          <div className="tag">
            ✅ Account ready for {recentAccount.name}
          </div>
        )}
      </header>

      <div className="section-grid">
        <AuthPanel onAccountCreated={setRecentAccount} />
        <ScriptForm onAdd={handleAddScript} />
      </div>

      <FeaturedStrip scripts={featuredScripts} />
      <ScriptList scripts={scripts} />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

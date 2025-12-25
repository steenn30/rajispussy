import React, { Component } from '../runtime/react.js';
import html from '../runtime/htm.js';
import { authors, scripts } from '../data/seed.js';

class InfoBar extends Component {
  render() {
    return html`<div class="info-bar">
      <div><p class="tag" style=${{ margin: 0 }}>Script Market</p></div>
      <div class="info-bar__actions">
        <span class="info-bar__text">Discover, feature, and share scripts.</span>
        <button type="button" class="btn contribute" onClick=${() => alert('Thanks for your interest in contributing!')}>+ Contribute</button>
      </div>
    </div>`;
  }
}

class FeaturedScripts extends Component {
  renderScript(script) {
    return html`<article class="script-card promo" key=${script.id}>
      <div class="script-header">
        <img
          src=${script.logo ||
          'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=200&q=80'}
          alt=${`${script.title} logo`}
          class="script-logo"
        />
        <div>
          <div class="tag">${script.genre}</div>
          <h3 style=${{ margin: '4px 0 0' }}>${script.title}</h3>
          <p style=${{ margin: 0, color: '#cbd5e1' }}>by ${script.author}</p>
        </div>
      </div>
      <p class="price">${`$${script.price.toFixed(2)}`}</p>
      <div class="tag">Advertised placement</div>
    </article>`;
  }

  render() {
    const topTwo = (this.props.scripts || []).slice(0, 2);
    return html`<section class="card">
      <h2>Featured scripts</h2>
      <div class="featured-grid">${topTwo.map((s) => this.renderScript(s))}</div>
    </section>`;
  }
}

class FeaturedAuthors extends Component {
  render() {
    const { navigate } = this.props;
    return html`<section class="card">
      <h2>Featured authors</h2>
      <div class="authors-grid">
        ${authors.map(
          (author) => html`<article class="author-card" key=${author.id}>
            <img src=${author.avatar} alt=${`${author.name} avatar`} class="author-avatar" />
            <div>
              <button
                type="button"
                class="author-name linkish"
                onClick=${() => navigate && navigate(`/profile/${encodeURIComponent(author.name)}`)}
              >
                ${author.name}
              </button>
              <div class="author-genres">
                ${author.topGenres.map((g) => html`<span class="tag" key=${g}>${g}</span>`)}
              </div>
            </div>
          </article>`,
        )}
      </div>
    </section>`;
  }
}

class SearchBar extends Component {
  render() {
    const { query, onQueryChange } = this.props;
    return html`<div class="card">
      <h2>Search scripts</h2>
      <input
        placeholder="Search by title, author, or genre"
        value=${query}
        onInput=${(e) => onQueryChange(e.target.value)}
      />
    </div>`;
  }
}

class RecentScripts extends Component {
  renderCard(script) {
    return html`<article class="script-card" key=${script.id}>
      <div class="script-header">
        <img
          src=${script.logo ||
          'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=200&q=80'}
          alt=${`${script.title} logo`}
          class="script-logo"
        />
        <div>
          <div class="tag">${script.genre}</div>
          <h3 style=${{ margin: '4px 0 0' }}>${script.title}</h3>
          <p style=${{ margin: 0, color: '#cbd5e1' }}>by ${script.author}</p>
        </div>
      </div>
      <p class="price">${`$${script.price.toFixed(2)}`}</p>
      <div class="tag subtle">${`Posted ${new Date(script.createdAt).toLocaleString()}`}</div>
    </article>`;
  }

  render() {
    const filtered = (this.props.scripts || []).filter((s) => {
      const q = (this.props.query || '').toLowerCase();
      return `${s.title} ${s.author} ${s.genre}`.toLowerCase().includes(q);
    });
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return html`<section class="card">
      <h2>Most recently posted</h2>
      <div class="script-grid">${filtered.map((s) => this.renderCard(s))}</div>
    </section>`;
  }
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  render() {
    const featured = scripts.filter((s) => s.featured);
    return html`<main class="app-shell">
      <${InfoBar} />
      <header class="page-header">
        <h1 class="page-title">Script Market</h1>
        <p style=${{ color: '#cbd5e1', maxWidth: 720 }}>
          Featured scripts, highlighted authors, and the latest drops—all in one place.
        </p>
      </header>
      <${FeaturedScripts} scripts=${featured} />
      <${FeaturedAuthors} navigate=${this.props.navigate} />
      <${SearchBar} query=${this.state.query} onQueryChange=${(value) => this.setState({ query: value })} />
      <${RecentScripts} scripts=${scripts} query=${this.state.query} />
    </main>`;
  }
}

import React, { Component } from '../runtime/react.js';
import { Link } from '../router/react-router-dom.js';
import { authors, scripts } from '../data/seed.js';

class InfoBar extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'info-bar' },
      React.createElement('div', null, React.createElement('p', { className: 'tag', style: { margin: 0 } }, 'Script Market')),
      React.createElement(
        'div',
        { className: 'info-bar__actions' },
        React.createElement('span', { className: 'info-bar__text' }, 'Discover, feature, and share scripts.'),
        React.createElement(
          'button',
          { type: 'button', className: 'btn contribute', onClick: () => alert('Thanks for your interest in contributing!') },
          '+ Contribute',
        ),
      ),
    );
  }
}

class FeaturedScripts extends Component {
  renderScript(script) {
    return React.createElement(
      'article',
      { key: script.id, className: 'script-card promo' },
      React.createElement(
        'div',
        { className: 'script-header' },
        React.createElement('img', {
          src:
            script.logo ||
            'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=200&q=80',
          alt: `${script.title} logo`,
          className: 'script-logo',
        }),
        React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'tag' }, script.genre),
          React.createElement('h3', { style: { margin: '4px 0 0' } }, script.title),
          React.createElement('p', { style: { margin: 0, color: '#cbd5e1' } }, `by ${script.author}`),
        ),
      ),
      React.createElement('p', { className: 'price' }, `$${script.price.toFixed(2)}`),
      React.createElement('div', { className: 'tag' }, 'Advertised placement'),
    );
  }

  render() {
    const topTwo = (this.props.scripts || []).slice(0, 2);
    return React.createElement(
      'section',
      { className: 'card' },
      React.createElement('h2', null, 'Featured scripts'),
      React.createElement('div', { className: 'featured-grid' }, topTwo.map((s) => this.renderScript(s))),
    );
  }
}

class FeaturedAuthors extends Component {
  render() {
    return React.createElement(
      'section',
      { className: 'card' },
      React.createElement('h2', null, 'Featured authors'),
      React.createElement(
        'div',
        { className: 'authors-grid' },
        authors.map((author) =>
          React.createElement(
            'article',
            { key: author.id, className: 'author-card' },
            React.createElement('img', { src: author.avatar, alt: `${author.name} avatar`, className: 'author-avatar' }),
            React.createElement(
              'div',
              null,
              React.createElement(Link, { to: `/profile/${encodeURIComponent(author.name)}`, className: 'author-name linkish' }, author.name),
              React.createElement(
                'div',
                { className: 'author-genres' },
                author.topGenres.map((g) => React.createElement('span', { className: 'tag', key: g }, g)),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class SearchBar extends Component {
  render() {
    const { query, onQueryChange } = this.props;
    return React.createElement(
      'div',
      { className: 'card' },
      React.createElement('h2', null, 'Search scripts'),
      React.createElement('input', {
        placeholder: 'Search by title, author, or genre',
        value: query,
        onInput: (e) => onQueryChange(e.target.value),
      }),
    );
  }
}

class RecentScripts extends Component {
  renderCard(script) {
    return React.createElement(
      'article',
      { key: script.id, className: 'script-card' },
      React.createElement(
        'div',
        { className: 'script-header' },
        React.createElement('img', {
          src:
            script.logo ||
            'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=200&q=80',
          alt: `${script.title} logo`,
          className: 'script-logo',
        }),
        React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'tag' }, script.genre),
          React.createElement('h3', { style: { margin: '4px 0 0' } }, script.title),
          React.createElement('p', { style: { margin: 0, color: '#cbd5e1' } }, `by ${script.author}`),
        ),
      ),
      React.createElement('p', { className: 'price' }, `$${script.price.toFixed(2)}`),
      React.createElement('div', { className: 'tag subtle' }, `Posted ${new Date(script.createdAt).toLocaleString()}`),
    );
  }

  render() {
    const filtered = (this.props.scripts || []).filter((s) => {
      const q = (this.props.query || '').toLowerCase();
      return `${s.title} ${s.author} ${s.genre}`.toLowerCase().includes(q);
    });
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return React.createElement(
      'section',
      { className: 'card' },
      React.createElement('h2', null, 'Most recently posted'),
      React.createElement('div', { className: 'script-grid' }, filtered.map((s) => this.renderCard(s))),
    );
  }
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  render() {
    const featured = scripts.filter((s) => s.featured);
    return React.createElement(
      'main',
      { className: 'app-shell' },
      React.createElement(InfoBar, null),
      React.createElement(
        'header',
        { className: 'page-header' },
        React.createElement('h1', { className: 'page-title' }, 'Script Market'),
        React.createElement(
          'p',
          { style: { color: '#cbd5e1', maxWidth: 720 } },
          'Featured scripts, highlighted authors, and the latest drops—all in one place.',
        ),
      ),
      React.createElement(FeaturedScripts, { scripts: featured }),
      React.createElement(FeaturedAuthors, null),
      React.createElement(SearchBar, {
        query: this.state.query,
        onQueryChange: (value) => this.setState({ query: value }),
      }),
      React.createElement(RecentScripts, { scripts, query: this.state.query }),
    );
  }
}

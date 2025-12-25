import React, { Component } from '../runtime/react.js';
import { Link } from '../router.js';

export default class ScreenwriterProfileCustomerView extends Component {
  renderScript(script) {
    return React.createElement(
      'article',
      { key: script.id, className: 'script-card detailed' },
      React.createElement(
        'div',
        { className: 'script-header' },
        React.createElement('img', { src: script.image, alt: `${script.title} poster`, className: 'script-logo large' }),
        React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'tag' }, `$${script.price.toFixed(2)}`),
          React.createElement('h3', { style: { margin: '4px 0 0' } }, script.title),
        ),
      ),
      React.createElement('p', { className: 'profile-script-desc' }, script.description),
      React.createElement(
        'div',
        { className: 'profile-script-meta' },
        React.createElement('span', { className: 'tag' }, `Actors needed: ${script.actorsNeeded}`),
        React.createElement('span', { className: 'tag' }, `Production: ${script.productionNotes}`),
      ),
    );
  }

  render() {
    const { profile } = this.props;
    if (!profile) {
      return React.createElement(
        'main',
        { className: 'app-shell' },
        React.createElement(
          'div',
          { className: 'card' },
          React.createElement('p', null, 'Profile not found'),
          React.createElement(Link, { to: '/' }, 'Back to home'),
        ),
      );
    }

    return React.createElement(
      'main',
      { className: 'app-shell' },
      React.createElement(
        'header',
        { className: 'page-header' },
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('img', { src: profile.avatar, alt: `${profile.name} avatar`, className: 'profile-avatar' }),
          React.createElement(
            'div',
            null,
            React.createElement('p', { className: 'tag', style: { margin: 0 } }, 'Screenwriter profile'),
            React.createElement('h1', { className: 'page-title' }, profile.name),
          ),
        ),
        React.createElement(Link, { to: '/', className: 'secondary' }, '← Back to home'),
      ),
      React.createElement(
        'section',
        { className: 'card' },
        React.createElement('p', { className: 'profile-bio' }, profile.bio),
        React.createElement(
          'div',
          { className: 'profile-meta' },
          React.createElement('div', { className: 'tag' }, `Scripts available: ${profile.scriptsAvailable}`),
          React.createElement('div', { className: 'tag' }, `Scripts sold: ${profile.scriptsSold}`),
          React.createElement('div', { className: 'tag' }, `Awards: ${profile.awards.join(', ') || 'None'}`),
        ),
      ),
      React.createElement(
        'section',
        { className: 'card' },
        React.createElement('h2', null, 'Scripts'),
        React.createElement('div', { className: 'profile-scripts' }, profile.scripts.map((s) => this.renderScript(s))),
      ),
    );
  }
}

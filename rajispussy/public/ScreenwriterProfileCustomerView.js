import React from './runtime/react.js';

const h = React.createElement;

export default function ScreenwriterProfileCustomerView({ profile, onBack }) {
  if (!profile) {
    return h(
      'main',
      { className: 'app-shell' },
      h('div', { className: 'card' }, h('p', null, 'Profile not found'), h('button', { type: 'button', className: 'secondary', onClick: onBack }, 'Back to home')),
    );
  }

  return h(
    'main',
    { className: 'app-shell' },
    h(
      'header',
      { className: 'page-header' },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        h('img', { src: profile.avatar, alt: `${profile.name} avatar`, className: 'profile-avatar' }),
        h('div', null, h('p', { className: 'tag', style: { margin: 0 } }, 'Screenwriter profile'), h('h1', { className: 'page-title' }, profile.name)),
      ),
      h('button', { type: 'button', className: 'secondary', onClick: onBack }, '← Back to home'),
    ),
    h(
      'section',
      { className: 'card' },
      h('p', { className: 'profile-bio' }, profile.bio),
      h(
        'div',
        { className: 'profile-meta' },
        h('div', { className: 'tag' }, `Scripts available: ${profile.scriptsAvailable}`),
        h('div', { className: 'tag' }, `Scripts sold: ${profile.scriptsSold}`),
        h('div', { className: 'tag' }, `Awards: ${profile.awards.join(', ') || 'None'}`),
      ),
    ),
    h('section', { className: 'card' }, h('h2', null, 'Scripts'), h(ProfileScripts, { scripts: profile.scripts })),
  );
}

function ProfileScripts({ scripts }) {
  return h(
    'div',
    { className: 'profile-scripts' },
    scripts.map((script) =>
      h(
        'article',
        { key: script.id, className: 'script-card detailed' },
        h(
          'div',
          { className: 'script-header' },
          h('img', { src: script.image, alt: `${script.title} poster`, className: 'script-logo large' }),
          h('div', null, h('div', { className: 'tag' }, `$${script.price.toFixed(2)}`), h('h3', { style: { margin: '4px 0 0' } }, script.title)),
        ),
        h('p', { className: 'profile-script-desc' }, script.description),
        h(
          'div',
          { className: 'profile-script-meta' },
          h('span', { className: 'tag' }, `Actors needed: ${script.actorsNeeded}`),
          h('span', { className: 'tag' }, `Production: ${script.productionNotes}`),
        ),
      ),
    ),
  );
}

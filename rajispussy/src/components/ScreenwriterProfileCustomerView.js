import React, { Component } from '../runtime/react.js';
import html from '../runtime/htm.js';

export default class ScreenwriterProfileCustomerView extends Component {
  renderScript(script) {
    return html`<article class="script-card detailed" key=${script.id}>
      <div class="script-header">
        <img src=${script.image} alt=${`${script.title} poster`} class="script-logo large" />
        <div>
          <div class="tag">${`$${script.price.toFixed(2)}`}</div>
          <h3 style=${{ margin: '4px 0 0' }}>${script.title}</h3>
        </div>
      </div>
      <p class="profile-script-desc">${script.description}</p>
      <div class="profile-script-meta">
        <span class="tag">${`Actors needed: ${script.actorsNeeded}`}</span>
        <span class="tag">${`Production: ${script.productionNotes}`}</span>
      </div>
    </article>`;
  }

  render() {
    const { profile } = this.props;
    if (!profile) {
      return html`<main class="app-shell">
        <div class="card">
          <p>Profile not found</p>
          <button class="secondary" type="button" onClick=${() => this.props.navigate && this.props.navigate(-1)}>Back</button>
        </div>
      </main>`;
    }

    return html`<main class="app-shell">
      <header class="page-header">
        <div style=${{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src=${profile.avatar} alt=${`${profile.name} avatar`} class="profile-avatar" />
          <div>
            <p class="tag" style=${{ margin: 0 }}>Screenwriter profile</p>
            <h1 class="page-title">${profile.name}</h1>
          </div>
        </div>
        <button class="secondary" type="button" onClick=${() => this.props.navigate && this.props.navigate(-1)}>← Back to home</button>
      </header>
      <section class="card">
        <p class="profile-bio">${profile.bio}</p>
        <div class="profile-meta">
          <div class="tag">${`Scripts available: ${profile.scriptsAvailable}`}</div>
          <div class="tag">${`Scripts sold: ${profile.scriptsSold}`}</div>
          <div class="tag">${`Awards: ${profile.awards.join(', ') || 'None'}`}</div>
        </div>
      </section>
      <section class="card">
        <h2>Scripts</h2>
        <div class="profile-scripts">${profile.scripts.map((s) => this.renderScript(s))}</div>
      </section>
    </main>`;
  }
}

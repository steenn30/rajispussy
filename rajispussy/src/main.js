import React from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';
import { BrowserRouter, Routes, Route } from './router/react-router-dom.js';
import html from './runtime/htm.js';
import HomePage from './components/HomePage.js';
import ScreenwriterProfileCustomerView from './components/ScreenwriterProfileCustomerView.js';
import { profiles } from './data/seed.js';

function ProfileWrapper({ params }) {
  const name = decodeURIComponent(params.name || '');
  const profile = profiles[name];
  return html`<${ScreenwriterProfileCustomerView} profile=${profile} />`;
}

function App() {
  return html`<${BrowserRouter}>
    <${Routes}>
      <${Route} path="/" element=${html`<${HomePage} />`} />
      <${Route} path="/profile/:name" element=${html`<${ProfileWrapper} />`} />
    <//>
  <//>`;
}

const root = createRoot(document.getElementById('root'));
root.render(html`<${App} />`);

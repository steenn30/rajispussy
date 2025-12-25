import React, { Component } from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';
import { HashRouter, Route } from './router.js';
import HomePage from './components/HomePage.js';
import ScreenwriterProfileCustomerView from './components/ScreenwriterProfileCustomerView.js';
import { profiles } from './data/seed.js';

class App extends Component {
  render() {
    return React.createElement(
      HashRouter,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(HomePage, null) }),
      React.createElement(Route, {
        path: '/author/:name',
        component: ProfileRoute,
      }),
    );
  }
}

class ProfileRoute extends Component {
  render() {
    const path = window.location.hash.replace(/^#/, '').replace(/^\//, '');
    const [, encodedName] = path.split('/') || [];
    const name = decodeURIComponent(encodedName || '');
    const profile = profiles[name];
    return React.createElement(ScreenwriterProfileCustomerView, { profile });
  }
}

console.log('Booting Script Market app');
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
console.log('Rendered root');

import React, { Component } from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';
import { Router, Route } from './router.js';
import HomePage from './components/HomePage.js';
import ScreenwriterProfileCustomerView from './components/ScreenwriterProfileCustomerView.js';
import { profiles } from './data/seed.js';

class ProfileRoute extends Component {
  render() {
    const { params } = this.props;
    const name = decodeURIComponent(params.name || '');
    const profile = profiles[name];
    return React.createElement(ScreenwriterProfileCustomerView, { profile, navigate: this.props.navigate });
  }
}

class App extends Component {
  render() {
    return React.createElement(
      Router,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(HomePage, { navigate: null }) }),
      React.createElement(Route, { path: '/author/:name', component: ProfileRoute }),
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));

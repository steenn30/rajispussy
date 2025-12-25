import React, { Component } from './runtime/react.js';
import { createRoot } from './runtime/react-dom.js';
import HomePage from './components/HomePage.js';
import ScreenwriterProfileCustomerView from './components/ScreenwriterProfileCustomerView.js';
import { profiles } from './data/seed.js';

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { path: getPath() };
    this.onHashChange = this.onHashChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  onHashChange() {
    this.setState({ path: getPath() });
  }

  render() {
    const path = this.state.path.replace(/^\//, '');
    const [first, ...rest] = path.split('/');
    if (first === 'author' && rest.length) {
      const name = decodeURIComponent(rest.join('/'));
      const profile = profiles[name];
      return React.createElement(ScreenwriterProfileCustomerView, { profile });
    }
    return React.createElement(HomePage, null);
  }
}

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));

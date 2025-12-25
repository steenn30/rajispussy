import React, { Component, cloneElement } from './runtime/react.js';

function matchPath(pattern, path) {
  const patternParts = pattern.replace(/^#?\//, '').split('/');
  const pathParts = path.replace(/^#?\//, '').split('/');
  const params = {};
  if (patternParts.length !== pathParts.length) return null;
  for (let i = 0; i < patternParts.length; i += 1) {
    const pat = patternParts[i];
    const val = pathParts[i];
    if (pat.startsWith(':')) params[pat.slice(1)] = decodeURIComponent(val || '');
    else if (pat !== val) return null;
  }
  return params;
}

export class Router extends Component {
  constructor(props) {
    super(props);
    this.state = { path: this.getPath() };
    this.onPop = this.onPop.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPop);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPop);
  }

  onPop() {
    this.setState({ path: this.getPath() });
  }

  getPath() {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  }

  navigate(to) {
    const target = to.startsWith('#') ? to : `#${to}`;
    window.history.pushState({}, '', target);
    this.setState({ path: this.getPath() });
  }

  render() {
    const path = this.state.path;
    const { children } = this.props;
    const kids = Array.isArray(children) ? children : [children];
    return React.createElement(
      React.Fragment,
      null,
      ...kids.map((child, idx) => {
        if (!child) return null;
        return cloneElement(child, { key: child.key || idx, currentPath: path, navigate: this.navigate });
      }),
    );
  }
}

export class Route extends Component {
  render() {
    const { path, element, currentPath, navigate } = this.props;
    const params = matchPath(path, currentPath || '/');
    if (!params) return null;
    if (element) return cloneElement(element, { navigate, params });
    const Child = this.props.component;
    return Child ? React.createElement(Child, { params, navigate }) : null;
  }
}

export class Link extends Component {
  render() {
    const { to, children, navigate } = this.props;
    const href = to.startsWith('#') ? to : `#${to}`;
    const handle = (e) => {
      e.preventDefault();
      if (navigate) navigate(href);
      else {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    };
    return React.createElement('a', { href, onClick: handle, className: this.props.className }, children);
  }
}

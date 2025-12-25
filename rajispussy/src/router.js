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

export class HashRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { path: this.getPath() };
    this.onHashChange = this.onHashChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  onHashChange() {
    this.setState({ path: this.getPath() }, () => forceRender());
  }

  getPath() {
    return window.location.hash.replace(/^#/, '') || '/';
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
        return cloneElement(child, { key: child.key || idx, currentPath: path });
      }),
    );
  }
}

export class Route extends Component {
  render() {
    const { path, element, currentPath } = this.props;
    const params = matchPath(path, currentPath || '/');
    if (!params) return null;
    if (element) return element;
    const Child = this.props.component;
    return Child ? React.createElement(Child, { params }) : null;
  }
}

export class Link extends Component {
  render() {
    const { to, children } = this.props;
    const handle = (e) => {
      e.preventDefault();
      window.location.hash = to.startsWith('#') ? to : `#${to}`;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    };
    return React.createElement('a', { href: to.startsWith('#') ? to : `#${to}`, onClick: handle, className: this.props.className }, children);
  }
}

import React, { Component, cloneElement } from './runtime/react.js';
import { forceRender } from './runtime/react-dom.js';

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
  render() {
    const path = window.location.hash.replace(/^#/, '') || '/';
    const { children } = this.props;
    console.log('HashRouter render path', path);
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
    console.log('Route check', path, 'vs', currentPath);
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
      forceRender();
    };
    return React.createElement('a', { href: to.startsWith('#') ? to : `#${to}`, onClick: handle, className: this.props.className }, children);
  }
}

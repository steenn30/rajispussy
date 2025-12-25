import React, { cloneElement, useState } from '../runtime/react.js';

let listeners = new Set();
let navigateRef = (to) => {
  const target = formatTo(to);
  window.history.pushState({}, '', target);
  notify();
};
let isInitialized = false;

function formatTo(to) {
  if (typeof to === 'number') return to;
  if (!to) return '/';
  return to.startsWith('#') ? to.slice(1) : to;
}

function getPath() {
  return window.location.pathname || '/';
}

function notify() {
  const next = getPath();
  listeners.forEach((setPath) => setPath(next));
}

function ensureListeners() {
  if (isInitialized) return;
  isInitialized = true;
  window.addEventListener('popstate', notify);
}

export function BrowserRouter({ children }) {
  ensureListeners();
  const [path, setPath] = useState(getPath());
  if (!listeners.has(setPath)) listeners.add(setPath);
  navigateRef = (to) => {
    if (typeof to === 'number') {
      window.history.go(to);
      return;
    }
    const target = formatTo(to);
    window.history.pushState({}, '', target);
    notify();
  };
  return React.createElement(Routes, { children, path, navigate: navigateRef });
}

export function Routes({ children, path, navigate }) {
  const kids = Array.isArray(children) ? children : [children];
  for (let i = 0; i < kids.length; i += 1) {
    const child = kids[i];
    if (!child) continue;
    const props = child.props || {};
    const params = matchPath(props.path, path);
    if (params) {
      const element = props.element || child;
      return cloneElement(element, { params, navigate });
    }
  }
  return null;
}

export function Route(props) {
  // marker component
  return React.createElement(React.Fragment, null);
}

export function Link({ to, children }) {
  const href = to;
  const handle = (e) => {
    e.preventDefault();
    navigateRef(href);
  };
  return React.createElement('a', { href, onClick: handle }, children);
}

function matchPath(pattern, pathname) {
  const patParts = (pattern || '').replace(/^\//, '').split('/');
  const pathParts = (pathname || '').replace(/^\//, '').split('/');
  if (patParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patParts.length; i += 1) {
    const pat = patParts[i];
    const val = pathParts[i];
    if (pat.startsWith(':')) params[pat.slice(1)] = decodeURIComponent(val || '');
    else if (pat !== val) return null;
  }
  return params;
}

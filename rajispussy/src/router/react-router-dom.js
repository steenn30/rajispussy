import React, { cloneElement, useState } from '../runtime/react.js';

let listeners = new Set();
let navigateRef = (to) => setHash(formatTo(to));
let isInitialized = false;

function formatTo(to) {
  if (typeof to === 'number') return to;
  const raw = to || '/';
  const clean = raw.startsWith('#') ? raw.slice(1) : raw;
  return clean.startsWith('/') ? clean : `/${clean}`;
}

function getPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

function notify(next = getPath()) {
  listeners.forEach((setPath) => setPath(next));
}

function setHash(cleanPath) {
  if (typeof cleanPath === 'number') {
    window.history.go(cleanPath);
    return;
  }
  const target = cleanPath.startsWith('#') ? cleanPath : `#${cleanPath}`;
  if (window.location.hash === target) return;
  window.location.hash = target;
  notify(target.replace(/^#/, ''));
}

function ensureListeners() {
  if (isInitialized) return;
  isInitialized = true;
  const handler = () => notify();
  window.addEventListener('popstate', handler);
  window.addEventListener('hashchange', handler);
}

export function BrowserRouter({ children }) {
  ensureListeners();
  const [path, setPath] = useState(getPath());
  if (!listeners.has(setPath)) listeners.add(setPath);
  navigateRef = (to) => setHash(formatTo(to));
  return React.createElement(Routes, { path, navigate: navigateRef }, children);
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
  const clean = formatTo(to);
  const href = clean.startsWith('#') ? clean : `#${clean}`;
  const handle = (e) => {
    e.preventDefault();
    navigateRef(clean);
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

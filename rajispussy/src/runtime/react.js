export const Fragment = Symbol('Fragment');

let currentFrame = null;
let scheduledRender = () => {};
const hookStore = new Map();

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = this.state || {};
    this.__path = '';
  }

  setState(update) {
    const next = typeof update === 'function' ? update(this.state, this.props) : update;
    this.state = { ...this.state, ...next };
    scheduledRender();
  }

  // To be overridden
  render() {
    return null;
  }
}

function flatten(children) {
  const out = [];
  children.forEach((c) => {
    if (Array.isArray(c)) out.push(...flatten(c));
    else if (c === null || c === undefined || c === false) {
      // skip
    } else out.push(c);
  });
  return out;
}

export function createElement(type, props, ...children) {
  return { type, props: props || {}, children: flatten(children) };
}

export function cloneElement(element, extraProps) {
  return createElement(element.type, { ...(element.props || {}), ...(extraProps || {}) }, ...(element.children || []));
}

export function __setRenderScheduler(fn) {
  scheduledRender = fn;
}

export function withComponent(path, renderFn) {
  const prev = currentFrame;
  const hooks = hookStore.get(path) || [];
  currentFrame = { hooks, hookIndex: 0, path };
  const result = renderFn();
  hookStore.set(path, currentFrame.hooks);
  currentFrame = prev;
  return result;
}

function ensureFrame() {
  if (!currentFrame) throw new Error('Hooks must be used inside a component');
  return currentFrame;
}

export function useState(initial) {
  const frame = ensureFrame();
  const idx = frame.hookIndex++;
  if (frame.hooks[idx] === undefined) {
    frame.hooks[idx] = typeof initial === 'function' ? initial() : initial;
  }
  const setState = (value) => {
    const next = typeof value === 'function' ? value(frame.hooks[idx]) : value;
    frame.hooks[idx] = next;
    scheduledRender();
  };
  return [frame.hooks[idx], setState];
}

const React = {
  Fragment,
  Component,
  createElement,
  cloneElement,
  useState,
};

export default React;

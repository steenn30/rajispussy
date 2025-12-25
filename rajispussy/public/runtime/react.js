export const Fragment = Symbol('Fragment');

let currentFrame = null;
let scheduleRender = () => {};
const hookStore = new Map();

function flat(children) {
  const output = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      output.push(...flat(child));
    } else if (child === false || child === null || child === undefined) {
      // skip
    } else {
      output.push(child);
    }
  });
  return output;
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: flat(children),
  };
}

export function __setRenderScheduler(fn) {
  scheduleRender = fn;
}

export function withComponent(path, renderFn) {
  const previous = currentFrame;
  const hooks = hookStore.get(path) || [];
  currentFrame = { hooks, hookIndex: 0, path };
  const result = renderFn();
  hookStore.set(path, currentFrame.hooks);
  currentFrame = previous;
  return result;
}

function ensureFrame() {
  if (!currentFrame) {
    throw new Error('Hooks can only be called inside components.');
  }
  return currentFrame;
}

export function useState(initialValue) {
  const frame = ensureFrame();
  const idx = frame.hookIndex++;
  if (frame.hooks[idx] === undefined) {
    frame.hooks[idx] = typeof initialValue === 'function' ? initialValue() : initialValue;
  }
  const setState = (value) => {
    const next = typeof value === 'function' ? value(frame.hooks[idx]) : value;
    frame.hooks[idx] = next;
    scheduleRender();
  };
  return [frame.hooks[idx], setState];
}

export function useMemo(factory, deps = []) {
  const frame = ensureFrame();
  const idx = frame.hookIndex++;
  const record = frame.hooks[idx];
  if (record) {
    const [prevDeps, value] = record;
    const same = deps.length === prevDeps.length && deps.every((d, i) => Object.is(d, prevDeps[i]));
    if (same) return value;
  }
  const value = factory();
  frame.hooks[idx] = [deps, value];
  return value;
}

const React = {
  Fragment,
  createElement,
  useMemo,
  useState,
};

export default React;

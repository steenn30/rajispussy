import React, { Fragment, __setRenderScheduler, withComponent } from './react.js';

function cssEscapeSafe(id) {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(id);
  return id.replace(/[^a-zA-Z0-9_-]/g, '_');
}

function isEventProp(key) {
  return /^on[A-Z]/.test(key);
}

function applyProps(dom, props = {}) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'key') {
      // reserved for virtual tree identity; do not place on DOM
    } else if (key === 'className') {
      dom.setAttribute('class', value);
    } else if (key === 'style' && value && typeof value === 'object') {
      Object.assign(dom.style, value);
    } else if (key === 'htmlFor') {
      dom.setAttribute('for', value);
    } else if (key === 'value' || key === 'checked') {
      dom[key] = value;
    } else if (isEventProp(key) && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      dom.addEventListener(eventName, value);
    } else if (value === false || value === null || value === undefined) {
      // skip
    } else {
      dom.setAttribute(key, value);
    }
  });
}

function renderVNode(vnode, path = '0') {
  if (vnode === null || vnode === undefined || vnode === false) {
    return document.createComment('empty');
  }
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  const { type, props, children } = vnode;

  if (typeof type === 'function') {
    const rendered = withComponent(path, () => type({ ...(props || {}), children }));
    return renderVNode(rendered, `${path}.0`);
  }

  if (type === Fragment) {
    const fragment = document.createDocumentFragment();
    (children || []).forEach((child, idx) => {
      fragment.appendChild(renderVNode(child, `${path}.${idx}`));
    });
    return fragment;
  }

  const dom = document.createElement(type);
  applyProps(dom, props);
  (children || []).forEach((child, idx) => {
    dom.appendChild(renderVNode(child, `${path}.${idx}`));
  });
  return dom;
}

export function createRoot(container) {
  let rootVNode = null;

  const render = (nextVNode) => {
    rootVNode = nextVNode;
    flush();
  };

  const flush = () => {
    if (!rootVNode) return;
    const active = document.activeElement;
    const previousFocusId = active && active.id;
    const selection = active && typeof active.selectionStart === 'number'
      ? { start: active.selectionStart, end: active.selectionEnd }
      : null;

    const nextDom = renderVNode(rootVNode, '0');
    container.replaceChildren(nextDom);

    if (previousFocusId) {
      const selector = `#${cssEscapeSafe(previousFocusId)}`;
      const next = container.querySelector(selector);
      if (next) {
        next.focus();
        if (selection && typeof next.setSelectionRange === 'function') {
          next.setSelectionRange(selection.start, selection.end);
        }
      }
    }
  };

  __setRenderScheduler(flush);

  return { render };
}

export default { createRoot };

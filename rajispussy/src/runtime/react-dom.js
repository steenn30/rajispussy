import React, { Fragment, __setRenderScheduler, withComponent } from './react.js';

function isEventProp(key) {
  return /^on[A-Z]/.test(key);
}

function applyProps(dom, props = {}) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'key') return;
    if (key === 'className') dom.setAttribute('class', value);
    else if (key === 'style' && value && typeof value === 'object') Object.assign(dom.style, value);
    else if (key === 'htmlFor') dom.setAttribute('for', value);
    else if (key === 'value' || key === 'checked') dom[key] = value;
    else if (isEventProp(key) && typeof value === 'function') dom.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value === false || value === null || value === undefined) return;
    else dom.setAttribute(key, value);
  });
}

function renderVNode(vnode, path = '0') {
  if (vnode === null || vnode === undefined || vnode === false) return document.createComment('empty');
  if (typeof vnode === 'string' || typeof vnode === 'number') return document.createTextNode(String(vnode));

  const { type, props, children } = vnode;

  if (typeof type === 'function' && type.prototype instanceof React.Component) {
    const instance = new type({ ...(props || {}), children });
    instance.__path = path;
    const rendered = withComponent(path, () => instance.render());
    return renderVNode(rendered, `${path}.0`);
  }

  if (typeof type === 'function') {
    const rendered = withComponent(path, () => type({ ...(props || {}), children }));
    return renderVNode(rendered, `${path}.0`);
  }

  if (type === Fragment) {
    const frag = document.createDocumentFragment();
    (children || []).forEach((child, idx) => frag.appendChild(renderVNode(child, `${path}.${idx}`)));
    return frag;
  }

  const dom = document.createElement(type);
  applyProps(dom, props);
  (children || []).forEach((child, idx) => dom.appendChild(renderVNode(child, `${path}.${idx}`)));
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
    console.log('flush render');
    const nextDom = renderVNode(rootVNode, '0');
    container.replaceChildren(nextDom);
  };

  __setRenderScheduler(flush);

  return { render };
}

export default { createRoot };

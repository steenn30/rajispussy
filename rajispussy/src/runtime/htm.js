// Minimal htm implementation bound to React.createElement
function htmModule(createElement) {
  const MODE_TEXT = 1;
  const MODE_TAGNAME = 2;
  const MODE_WHITESPACE = 3;
  const MODE_COMMENT = 4;
  const MODE_PROP_SET = 5;
  const MODE_PROP_APPEND = 6;
  const ChildTypes = { TEXT: 0, TAG: 1 };

  function build(statics) {
    const fields = [];
    let mode = MODE_TEXT;
    let buffer = '';
    let quote = '';
    let current = [0];
    let char, propName;

    function commit(field) {
      if (mode === MODE_TEXT && (field || (field === '' && buffer))) {
        current.push({ type: ChildTypes.TEXT, value: field || buffer });
        buffer = '';
      } else if (mode === MODE_TAGNAME && (field || buffer)) {
        current[1] = field || buffer;
        buffer = '';
      }
    }

    for (let i = 0; i < statics.length; i++) {
      const string = statics[i];
      for (let j = 0; j < string.length; j++) {
        char = string[j];
        if (mode === MODE_TEXT) {
          if (char === '<') {
            commit();
            current = [1, ''];
            mode = MODE_TAGNAME;
          } else buffer += char;
        } else if (mode === MODE_COMMENT) {
          if (string[j + 2] === '>' && string[j + 1] === '-' && char === '-') {
            mode = MODE_TEXT;
            j += 2;
          }
        } else if (quote) {
          if (char === quote) quote = '';
          else buffer += char;
        } else if (char === '"' || char === "'") {
          quote = char;
        } else if (char === '>') {
          commit();
          current = [current];
          fields.push(current);
          mode = MODE_TEXT;
        } else if (mode === MODE_TAGNAME) {
          if (char === '/' && buffer === '') {
            current[1] = ChildTypes.TEXT;
          } else if (char === ' ' || char === '\n' || char === '\t') {
            commit();
            mode = MODE_WHITESPACE;
          } else buffer += char;
        } else if (mode === MODE_WHITESPACE) {
          if (char === ' ' || char === '\n' || char === '\t') continue;
          if (char === '/' || char === '>') {
            commit();
            if (char === '>') {
              current = [current];
              fields.push(current);
              mode = MODE_TEXT;
            } else mode = MODE_TEXT;
          } else {
            mode = MODE_PROP_SET;
            propName = char;
          }
        } else if (mode === MODE_PROP_SET) {
          if (char === '=' || char === ' ' || char === '\t' || char === '\n') {
            current.push(propName, '');
            mode = char === '=' ? MODE_PROP_APPEND : MODE_WHITESPACE;
          } else propName += char;
        } else if (mode === MODE_PROP_APPEND) {
          if (char === ' ' || char === '\t' || char === '\n' || char === '>') {
            commit();
            if (char === '>') {
              current = [current];
              fields.push(current);
              mode = MODE_TEXT;
            } else mode = MODE_WHITESPACE;
          } else buffer += char;
        }
      }
      commit(statics.raw[i]);
    }
    return fields;
  }

  function evaluate(h, built, fields, args) {
    let stack = [];
    for (let i = 0; i < built.length; i++) {
      const node = built[i];
      const tag = node[1];
      const props = {};
      let children = [];

      for (let j = 2; j < node.length; j += 2) {
        const prop = node[j];
        const value = node[j + 1];
        if (value === undefined) props[prop] = true;
        else props[prop] = value;
      }

      while (fields.length && typeof fields[0] !== 'string') {
        const field = fields.shift();
        children.push(field);
      }
      if (fields.length) {
        props.children = fields.shift();
      }
      children = children.concat(props.children || []);
      delete props.children;

      const elementChildren = children.map((child) => (typeof child === 'string' ? child : evaluate(h, [child], [], args)));

      stack.push(h(tag, props, ...elementChildren));
    }
    return stack.length > 1 ? stack : stack[0];
  }

  return function htm(statics, ...args) {
    const built = build(statics.slice());
    const fields = args.slice();
    return evaluate(createElement, built, fields, args);
  };
}

export default function (strings, ...values) {
  // If first argument is a function, assume bind has been applied
  if (typeof strings === 'function') {
    return htmModule(strings);
  }
  return htmModule(strings)(strings, ...values);
}

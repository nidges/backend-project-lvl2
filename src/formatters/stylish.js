import _ from 'lodash';

const replacer = { added: '  + ', removed: '  - ', empty: '    ' };

const getCommonIndent = (depth) => {
  if (depth === 0) return '';
  return replacer.empty.repeat(depth - 1);
};

const stringify = (entity, depth) => {
  if (!_.isPlainObject(entity)) {
    return entity;
  }
  const keys = Object.keys(entity);
  const newKeys = keys.map((key) => `${getCommonIndent(depth + 1)}${key}: ${stringify(entity[key], depth + 1)}`);
  return [
    '{',
    ...newKeys,
    `${getCommonIndent(depth)}}`,
  ].join('\n');
};

export default (collection) => {
  const iter = (node, depth) => {
    const genLine = (currentReplacer, key, value) => `${getCommonIndent(depth)}${currentReplacer}${key}: ${stringify(value, depth + 1)}`;

    const lines = node.map((nodeObj) => {
      switch (nodeObj.state) {
        case 'added':
          return genLine(replacer.added, nodeObj.key, nodeObj.value);

        case 'removed':
          return genLine(replacer.removed, nodeObj.key, nodeObj.value);

        case 'changed':
          return `${genLine(replacer.removed, nodeObj.key, nodeObj.valueBefore)}\n${genLine(replacer.added, nodeObj.key, nodeObj.valueAfter)}`;

        case 'nested':
          return `${getCommonIndent(depth + 1)}${nodeObj.key}: ${iter(nodeObj.children, depth + 1)}`;

        case 'same':
          return genLine(replacer.empty, nodeObj.key, nodeObj.value);

        default:
          throw new Error(`This node is in '${nodeObj.state}' state`);
      }
    });

    return [
      '{',
      ...lines,
      `${getCommonIndent(depth)}}`,
    ].join('\n');
  };

  return iter(collection, 1);
};

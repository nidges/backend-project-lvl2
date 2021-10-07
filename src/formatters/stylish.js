import _ from 'lodash';

const replacer = { added: '+ ', removed: '- ', empty: '  ' };
const replacerCount = 2;

const stringify = (entity, depth) => {
  if (!_.isPlainObject(entity)) {
    return entity;
  }
  const keys = Object.keys(entity);
  const newKeys = keys.map((key) => {
    if (_.isPlainObject(entity[key])) {
      return `${replacer.empty.repeat(replacerCount * depth)}${key}: ${stringify(entity[key], depth + 1)}`;
    }
    return `${replacer.empty.repeat(replacerCount * depth)}${key}: ${entity[key]}`;
  });
  return [
    '{',
    ...newKeys,
    `${replacer.empty.repeat(depth * replacerCount - replacerCount)}}`,
  ].join('\n');
};

export default (collection) => {
  const iter = (node, depth) => {
    const indentSize = depth * replacerCount;
    const currentCommonIndent = replacer.empty.repeat(indentSize - 1);
    const bracketIndent = replacer.empty.repeat(indentSize - replacerCount);

    const genLine = (currentReplacer, key, value) => `${currentCommonIndent}${currentReplacer}${key}: ${stringify(value, depth + 1)}`;

    const lines = node.map((nodeObj) => {
      switch (nodeObj.state) {
        case 'added':
          return genLine(replacer.added, nodeObj.key, nodeObj.value);

        case 'removed':
          return genLine(replacer.removed, nodeObj.key, nodeObj.value);

        case 'changed':
          return `${genLine(replacer.removed, nodeObj.key, nodeObj.valueBefore)}\n${genLine(replacer.added, nodeObj.key, nodeObj.valueAfter)}`;

        case 'nested':
          return `${currentCommonIndent}${replacer.empty}${nodeObj.key}: ${iter(nodeObj.children, depth + 1)}`;

        case 'same':
          return genLine(replacer.empty, nodeObj.key, nodeObj.value);

        default:
          throw new Error(`This node is in '${nodeObj.state}' state`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(collection, 1);
};

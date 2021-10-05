import _ from 'lodash';

const getReplacer = (depth, state = 'same') => {
  const replacer = { added: '+ ', removed: '- ', empty: '  ' };
  const replacerCount = 2;
  const indentSize = depth * replacerCount;

  switch (state) {
    case 'added':
      return `${replacer.empty.repeat(indentSize - 1)}${replacer.added}`;
    case 'removed':
      return `${replacer.empty.repeat(indentSize - 1)}${replacer.removed}`;
    default:
      return replacer.empty.repeat(indentSize);
  }
};

const stringify = (entity, depth) => {
  if (!_.isPlainObject(entity)) {
    return entity;
  }
  const keys = Object.keys(entity);
  const newKeys = keys.map((key) => {
    if (_.isPlainObject(entity[key])) {
      return `${getReplacer(depth)}${key}: ${stringify(entity[key], depth + 1)}`;
    }
    return `${getReplacer(depth)}${key}: ${entity[key]}`;
  });
  return [
    '{',
    ...newKeys,
    `${getReplacer(depth - 1)}}`,
  ].join('\n');
};

export default (collection) => {
  const iter = (node, depth) => {
    const genLine = (object, state, value) => `${getReplacer(depth, state)}${object.key}: ${stringify(value, depth + 1)}`;

    const lines = node.map((nodeObj) => {
      switch (nodeObj.state) {
        case 'added':
          return genLine(nodeObj, 'added', nodeObj.value);
          // return `${getReplacer(depth, 'added')}${nodeObj.key}:
          // ${stringify(nodeObj.value, depth + 1)}`;

        case 'removed':
          return genLine(nodeObj, 'removed', nodeObj.value);
          // return `${getReplacer(depth, 'removed')}${nodeObj.key}:
          // ${stringify(nodeObj.value, depth + 1)}`;

        case 'changed':
          return `${genLine(nodeObj, 'removed', nodeObj.valueBefore)}\n${genLine(nodeObj, 'added', nodeObj.valueAfter)}`;
          // const lineBefore = `${getReplacer(depth, 'removed')}${nodeObj.key}:
          // ${stringify(nodeObj.valueBefore, depth + 1)}`;
          // const lineAfter = `${getReplacer(depth, 'added')}${nodeObj.key}:
          // ${stringify(nodeObj.valueAfter, depth + 1)}`;
          // return `${lineBefore}\n${lineAfter}`;

        case 'nested':
          return `${getReplacer(depth)}${nodeObj.key}: ${iter(nodeObj.children, depth + 1)}`;

        case 'same':
          return genLine(nodeObj, 'same', nodeObj.value);
          // return `${getReplacer(depth)}${nodeObj.key}: ${stringify(nodeObj.value, depth + 1)}`;

        default:
          throw new Error('there is no such state in our collection');
      }
    });

    return [
      '{',
      ...lines,
      `${getReplacer(depth - 1)}}`,
    ].join('\n');
  };

  return iter(collection, 1);
};

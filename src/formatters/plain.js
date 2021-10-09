import _ from 'lodash';

const getCorrectValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (collection) => {
  const iter = (node, path) => {
    const lines = node
      .filter(({ state }) => state !== 'same')
      .map((nodeObj) => {
        switch (nodeObj.state) {
          case 'added':
            return `Property '${path}${nodeObj.key}' was added with value: ${getCorrectValue(nodeObj.value)}`;
          case 'removed':
            return `Property '${path}${nodeObj.key}' was removed`;
          case 'changed':
            return `Property '${path}${nodeObj.key}' was updated. From ${getCorrectValue(nodeObj.valueBefore)} to ${getCorrectValue(nodeObj.valueAfter)}`;
          case 'nested':
            return iter(nodeObj.children, `${path}${nodeObj.key}.`);
          default:
            throw new Error(`The node '${path}${nodeObj.key}' is in '${nodeObj.state}' state`);
        }
      });

    return lines.join('\n');
  };

  return iter(collection, '');
};

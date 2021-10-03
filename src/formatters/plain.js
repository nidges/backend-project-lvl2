const getCorrectValue = (value) => {
  if (typeof value === 'object' && value !== null) {
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
      .map(({
        state, key, value, valueBefore, valueAfter,
      }) => {
        
        if (state === 'nested') {
          return iter(value, `${path}${key}.`);
        }
        
        if (state === 'added') {
          return `Property '${path}${key}' was added with value: ${getCorrectValue(value)}`;
        }
        
        if (state === 'removed') {
          return `Property '${path}${key}' was removed`;
        }
        
        return `Property '${path}${key}' was updated. From ${getCorrectValue(valueBefore)} to ${getCorrectValue(valueAfter)}`;
      });
    
    return [...lines].join('\n');
  };

  return iter(collection, '');
};


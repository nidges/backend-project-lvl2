export default (collection) => {
  const replacerAdded = '+ ';
  const replacerRemoved = '- ';
  const replacerCommon = '  ';
  const replacerCount = 2;

  const stringify = (entity, depth) => {
    if (typeof entity !== 'object' || entity === null) {
      return entity;
    }
    const keys = Object.keys(entity);
    const newKeys = keys.map((key) => {
      if (typeof entity[key] === 'object' && entity[key] !== null) {
        return `${replacerCommon.repeat(replacerCount * depth)}${key}: ${stringify(entity[key], depth + 1)}`;
      }
      return `${replacerCommon.repeat(replacerCount * depth)}${key}: ${entity[key]}`;
    });
    return [
      '{',
      ...newKeys,
      `${replacerCommon.repeat(depth * replacerCount - replacerCount)}}`,
    ].join('\n');
  };

  const iter = (node, depth) => {
    const indentSize = depth * replacerCount;
    const currentCommonIndent = replacerCommon.repeat(indentSize - 1);
    const bracketIndent = replacerCommon.repeat(indentSize - replacerCount);

    const lines = node.map(({
      state, key, value, valueBefore, valueAfter,
    }) => {
      if (state === 'added') {
        return `${currentCommonIndent}${replacerAdded}${key}: ${stringify(value, depth + 1)}`;
      }
      
      if (state === 'removed') {
        return `${currentCommonIndent}${replacerRemoved}${key}: ${stringify(value, depth + 1)}`;
      }
      
      if (state === 'changed') {
        return `${currentCommonIndent}${replacerRemoved}${key}: ${stringify(valueBefore, depth + 1)}\n${currentCommonIndent}${replacerAdded}${key}: ${stringify(valueAfter, depth + 1)}`;
      }
      
      if (state === 'nested') {
        return `${currentCommonIndent}${replacerCommon}${key}: ${iter(value, depth + 1)}`;
      }
      
      return `${currentCommonIndent}${replacerCommon}${key}: ${stringify(value, depth + 1)}`;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(collection, 1);
};

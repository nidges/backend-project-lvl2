import _ from 'lodash';
import getObjFromPath from './parsers.js';
import getFormatter from './formatters/index.js';

const isObject = (entity) => (typeof entity === 'object' && entity !== null);

const generateDiffCollection = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeysSorted = _.sortBy(_.union(keys1, keys2));

  const diffCollection = allKeysSorted.map((key) => {
    // if both are nested objects
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { state: 'nested', key, value: generateDiffCollection(obj1[key], obj2[key]) };
    }

    // if key is only in second
    if (!_.has(obj1, key)) {
      return { state: 'added', key, value: obj2[key] };
    }

    // if key is only in first
    if (!_.has(obj2, key)) {
      return { state: 'removed', key, value: obj1[key] };
    }

    // if keys are equal
    if (obj1[key] === obj2[key]) {
      return { state: 'same', key, value: obj1[key] };
    }

    // if keys are not equal
    return {
      state: 'changed', key, valueBefore: obj1[key], valueAfter: obj2[key],
    };
  });

  return diffCollection;
};

export default (path1, path2, format = 'stylish') => {
  const obj1 = getObjFromPath(path1);
  const obj2 = getObjFromPath(path2);

  const diffCollection = generateDiffCollection(obj1, obj2);

  const changeDiffView = getFormatter(format);

  return changeDiffView(diffCollection);
};

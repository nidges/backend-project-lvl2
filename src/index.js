import _ from 'lodash';
import getObjFromPath from './parsers.js';

export default (path1, path2) => {

  const obj1 = getObjFromPath(path1);
  const obj2 = getObjFromPath(path2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const allKeysSorted = _.sortBy(allKeys);

  const string = allKeysSorted.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      // console.log('----> if key is only in second',
      return `${acc} + ${key} : ${obj2[key]}\n`;
    }

    if (!_.has(obj2, key)) {
      // console.log('----> if key is only in first',
      return `${acc} - ${key} : ${obj1[key]}\n`;
    }

    if (obj1[key] !== obj2[key]) {
      // console.log('----> if keys are not equal',
      return `${acc} - ${key} : ${obj1[key]}\n + ${key} : ${obj2[key]}\n`;
    }

    // console.log('----> if keys are equal',
    return `${acc}   ${key} : ${obj1[key]}\n`;
  }, '');

  return `{\n${string}}`;
};
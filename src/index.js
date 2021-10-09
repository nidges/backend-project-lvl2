import _ from 'lodash';
import { extname, resolve } from 'path';
import process from 'process';
import fs from 'fs';
import getFormattedDiff from './formatters/index.js';
import parseContent from './parsers.js';

// const getResolvedPath = (path) => (isAbsolute(path) ? path : resolve(process.cwd(), path));
const getResolvedPath = (path) => resolve(process.cwd(), path);

const getFormat = (path) => extname(path).slice(1);

const getContent = (resolvedPath) => fs.readFileSync(resolvedPath, 'utf8');

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeysSorted = _.sortBy(_.union(keys1, keys2));

  const diff = allKeysSorted.map((key) => {
    // if key is only in second
    if (!_.has(obj1, key)) {
      return { state: 'added', key, value: obj2[key] };
    }

    // if key is only in first
    if (!_.has(obj2, key)) {
      return { state: 'removed', key, value: obj1[key] };
    }

    // if both are nested objects
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { state: 'nested', key, children: getDiff(obj1[key], obj2[key]) };
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

  return diff;
};

export default (path1, path2, format = 'stylish') => {
  const content1 = getContent(getResolvedPath(path1));
  const content2 = getContent(getResolvedPath(path2));
  const format1 = getFormat(path1);
  const format2 = getFormat(path2);

  const obj1 = parseContent(content1, format1);
  const obj2 = parseContent(content2, format2);

  const diff = getDiff(obj1, obj2);

  return getFormattedDiff(format, diff);
};

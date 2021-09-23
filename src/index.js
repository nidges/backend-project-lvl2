import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

// const path1 =
// '/Users/mariastepanova/WebstormProjects/backend-project-lvl2/__fixtures__/file1.json';
// const path2 = '../__fixtures__/file2.json';
// const path2 =
// '/Users/mariastepanova/WebstormProjects/backend-project-lvl2/__fixtures__/file2.json';

export const getObjFromPath = (path) => {
  const pathResolved = path.startsWith('/') ? path : resolve(cwd(), path);
  const json = readFileSync(pathResolved, 'utf8');
  return JSON.parse(json);
}

export const genDiff = (path1, path2) => {
  // const ext1 = extname(path1);
  // const ext2 = extname(path2);

  const obj1 = getObjFromPath(path1);
  const obj2 = getObjFromPath(path2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const allKeysSorted = _.sortBy(allKeys);

  const string = allKeysSorted.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      // console.log('----> if key is only in second',
      // `${acc}\n  + ${key} : ${obj2[key]}`)
      return `${acc} + ${key} : ${obj2[key]}\n`;
    }

    if (!_.has(obj2, key)) {
      // console.log('----> if key is only in first',
      // `${acc}\n  - ${key} : ${obj1[key]}`)
      return `${acc} - ${key} : ${obj1[key]}\n`;
    }

    if (obj1[key] !== obj2[key]) {
      // console.log('----> if keys are not equal',
      // `${acc}\n  - ${key} : ${obj1[key]} \n  + ${key} : ${obj2[key]}`)
      return `${acc} - ${key} : ${obj1[key]}\n + ${key} : ${obj2[key]}\n`;
    }

    // console.log('----> if keys are equal',
    // `${acc}\n    ${key} : ${obj1[key]}`)
    return `${acc}   ${key} : ${obj1[key]}\n`;
  }, '{\n');

  return `${string}}`;
};

// genDiff(path1, path2);


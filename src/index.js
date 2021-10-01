import _ from 'lodash';
import getObjFromPath from './parsers.js';
import formatStylish from './formatter.js';

const path1 = '../__fixtures__/file1.json';
const path2 = '../__fixtures__/file2.json';

const isObject = (entity) => {
  return (typeof entity === 'object' && entity !== null);
}

const generateDiffCollection = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeysSorted = _.sortBy(_.union(keys1, keys2));

  const diffCollection = allKeysSorted.reduce((acc, key) => {
    // if both are nested objects
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      acc.push({ state: 'same', key, value: generateDiffCollection(obj1[key], obj2[key]) });
      return acc;
    }

    // if key is only in second
    if (!_.has(obj1, key)) {
      //next if block - new structure
      if (isObject(obj2[key])) {
        acc.push({ state: 'added', key, value: generateDiffCollection(obj2[key], obj2[key]) });
        return acc;
      }
      acc.push({ state: 'added', key, value: obj2[key] });
      return acc;
    }

    // if key is only in first
    if (!_.has(obj2, key)) {
      //next if block - new structure
      if (isObject(obj1[key])) {
        acc.push({ state: 'removed', key, value: generateDiffCollection(obj1[key], obj1[key]) });
        return acc;
      }
      acc.push({ state: 'removed', key, value: obj1[key] });
      return acc;
    }

    // if keys are equal
    if (obj1[key] === obj2[key]) {
      acc.push({ state: 'same', key, value: obj1[key] });
      return acc;
    }

    // if keys are not equal
    //next two if blocks - new structure
    if (isObject(obj1[key])) {
      acc.push({ state: 'removed', key, value: generateDiffCollection(obj1[key], obj1[key]) });
      acc.push({ state: 'added', key, value: obj2[key] });
      return acc;
    }

    if (isObject(obj2[key])) {
      acc.push({ state: 'removed', key, value: obj1[key] });
      acc.push({ state: 'added', key, value: generateDiffCollection(obj2[key], obj2[key]) });
      return acc;
    }

    acc.push({ state: 'removed', key, value: obj1[key] });
    acc.push({ state: 'added', key, value: obj2[key] });
    return acc;
  }, []);

  return diffCollection;
};

export default (path1, path2, format = 'stylish') => {
  const obj1 = getObjFromPath(path1);
  const obj2 = getObjFromPath(path2);

  const diffCollection = generateDiffCollection(obj1, obj2);

  if (format === 'stylish') {
    return formatStylish(diffCollection);
  }
};

// console.log(genDiff(path1, path2));

// console.dir(genDiff(path1, path2), { depth: 10 });


// const obj1 = {
//   "common": {
//     "setting1": "Value 1",
//     "setting2": 200,
//     "setting3": true,
//     "setting6": {
//       "key": "value",
//       "doge": {
//         "wow": ""
//       }
//     }
//   }
// }
//
// const obj2 = {
//   "common": {
//     "follow": false,
//     "setting1": "Value 1",
//     "setting3": null,
//     "setting4": "blah blah",
//     "setting5": {
//       "key5": "value5"
//     },
//     "setting6": {
//       "key": "value",
//       "ops": "vops",
//       "doge": {
//         "wow": "so much"
//       }
//     }
//   }
// }
// console.dir(generateDiffCollection(obj1, obj2), { depth: 10 });

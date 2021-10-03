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
      let result;

      switch (state) {
        case 'added':
          result = `${currentCommonIndent}${replacerAdded}${key}: ${stringify(value, depth + 1)}`;
          break;
        case 'removed':
          result = `${currentCommonIndent}${replacerRemoved}${key}: ${stringify(value, depth + 1)}`;
          break;
        case 'changed':
          result = `${currentCommonIndent}${replacerRemoved}${key}: ${stringify(valueBefore, depth + 1)}\n${currentCommonIndent}${replacerAdded}${key}: ${stringify(valueAfter, depth + 1)}`;
          break;
        case 'nested':
          result = `${currentCommonIndent}${replacerCommon}${key}: ${iter(value, depth + 1)}`;
          break;
        default:
          result = `${currentCommonIndent}${replacerCommon}${key}: ${stringify(value, depth + 1)}`;
          break;
      }
      return result;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(collection, 1);
};

// const testData = [
//       {
//         state: 'nested',
//         key: 'common',
//         value: [
//           { state: 'added', key: 'follow', value: false },
//           { state: 'same', key: 'setting1', value: 'Value 1' },
//           { state: 'removed', key: 'setting2', value: 200 },
//           {
//             state: 'changed',
//             key: 'setting3',
//             valueBefore: true,
//             valueAfter: null
//           },
//           { state: 'added', key: 'setting4', value: 'blah blah' },
//           { state: 'added', key: 'setting5', value: { key5: 'value5' } },
//           {
//             state: 'nested',
//             key: 'setting6',
//             value: [
//               {
//                 state: 'nested',
//                 key: 'doge',
//                 value: [
//                   {
//                     state: 'changed',
//                     key: 'wow',
//                     valueBefore: '',
//                     valueAfter: 'so much'
//                   }
//                 ]
//               },
//               { state: 'same', key: 'key', value: 'value' },
//               { state: 'added', key: 'ops', value: 'vops' }
//             ]
//           }
//         ]
//       }
//     ]
// ;

// console.log(formatStylish(testData));
// {
//  - wow:
//  + wow: so much
//  + setting5: {
//      - key5: value5
//    }
// }

// const iter = (value, depth) => {
//     if (typeof value !== 'object') {
//         return value.toString();
//     }
//     const indentSize = depth * spacesCount;
//     const currentIndent = replacerCommon.repeat(indentSize - 1);
//     const bracketIndent = replacerCommon.repeat(indentSize - spacesCount);
//     let realIndent;
//     switch (value.state) {
//         case 'added':
//             realIndent = `${currentIndent}${replacerAdded}`;
//             break;
//         case 'removed':
//             realIndent = `${currentIndent}${replacerRemoved}`;
//             break;
//         default:
//             realIndent = `${currentIndent}${replacerCommon}`;
//             break;
//     }
//     const lines = `${realIndent}${value.key}: ${value.value}`
//
//     return `${acc}${lines}}`
// }
// return collection.reduce((acc, key) => {
//   if (typeof key !== 'object') {
//     return key.toString();
//   }
//   const indentSize = 1 * spacesCount;
//   const currentIndent = replacerCommon.repeat(indentSize - 1);
//   const bracketIndent = replacerCommon.repeat(indentSize - spacesCount);
//   let realIndent;
//   switch (key.state) {
//     case 'added':
//       realIndent = `${currentIndent}${replacerAdded}`;
//       break;
//     case 'removed':
//       realIndent = `${currentIndent}${replacerRemoved}`;
//       break;
//     default:
//       realIndent = `${currentIndent}${replacerCommon}`;
//       break;
//   }
//   const lines = `${realIndent}${key.key}: ${key.value}`;
//
//   return `${acc}${lines}}`;
// }, '{\n');

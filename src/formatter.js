export default (collection) => {
  const replacerAdded = '+ ';
  const replacerRemoved = '- ';
  const replacerCommon = '  ';
  const spacesCount = 2;

  const iter = (node, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacerCommon.repeat(indentSize - 1);
    const bracketIndent = replacerCommon.repeat(indentSize - spacesCount);

    const lines = node.map(({ state, key, value }) => {

      let replacerInner;

      switch (state) {
        case 'added':
          replacerInner = replacerAdded;
          break
        case 'removed':
          replacerInner = replacerRemoved;
          break
        default:
          replacerInner = replacerCommon;
          break;
      }
      if (Array.isArray(value)) {
        return `${currentIndent}${replacerInner}${key}: ${iter(value, depth + 1)}`;
      }

      return `${currentIndent}${replacerInner}${key}: ${value}`.trimEnd();
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  }

  return iter(collection, 1);
};

const testData = [
  { state: 'removed', key: 'wow', value: '' },
  { state: 'added', key: 'wow', value: 'so much' },
  {
    state: 'added',
    key: 'setting5',
    value: [ { state: 'removed', key: 'key5', value: 'value5' } ]
  }
];

// console.log(formatStylish(testData));
//{
//  - wow:
//  + wow: so much
//  + setting5: {
//      - key5: value5
//    }
//}





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
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
        let result;
        switch (state) {
          case 'nested':
            result = iter(value, `${path}${key}.`);
            break;
          case 'added':
            result = `Property '${path}${key}' was added with value: ${getCorrectValue(value)}`;
            break;
          case 'removed':
            result = `Property '${path}${key}' was removed`;
            break;
          default:
            result = `Property '${path}${key}' was updated. From ${getCorrectValue(valueBefore)} to ${getCorrectValue(valueAfter)}`;
            break;
        }
        return result;
      });
    return [...lines].join('\n');
  };

  return iter(collection, '');
};

// const testData = [
//   {
//     state: 'nested',
//     key: 'common',
//     value: [
//       { state: 'added', key: 'follow', value: false },
//       { state: 'same', key: 'setting1', value: 'Value 1' },
//       { state: 'removed', key: 'setting2', value: 200 },
//       {
//         state: 'changed',
//         key: 'setting3',
//         valueBefore: true,
//         valueAfter: null,
//       },
//       { state: 'added', key: 'setting4', value: 'blah blah' },
//       { state: 'added', key: 'setting5', value: { key5: 'value5' } },
//       {
//         state: 'nested',
//         key: 'setting6',
//         value: [
//           {
//             state: 'nested',
//             key: 'doge',
//             value: [
//               {
//                 state: 'changed',
//                 key: 'wow',
//                 valueBefore: '',
//                 valueAfter: 'so much',
//               },
//             ],
//           },
//           { state: 'same', key: 'key', value: 'value' },
//           { state: 'added', key: 'ops', value: 'vops' },
//         ],
//       },
//     ],
//   },
// ];

// console.log(makePlain(testData));

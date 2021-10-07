import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

export default (format, collection) => {
  switch (format) {
    case 'plain':
      return formatPlain(collection);
    case 'json':
      return formatJson(collection);
    case 'stylish':
      return formatStylish(collection);
    default:
      throw new Error('wrong output format!');
  }
};

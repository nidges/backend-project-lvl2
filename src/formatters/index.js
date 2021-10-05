import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

export default (format, collection) => {
  if (format === 'plain') {
    return formatPlain(collection);
  }

  if (format === 'json') {
    return formatJson(collection);
  }

  if (format === 'stylish') {
    return formatStylish(collection);
  }

  throw new Error('wrong output format!');
};

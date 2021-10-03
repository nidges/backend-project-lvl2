import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

export default (format) => {
  if (format === 'plain') {
    return formatPlain;
  }

  if (format === 'json') {
    return formatJson;
  }

  return formatStylish;
};

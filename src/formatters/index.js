import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

export default (format, diff) => {
  switch (format) {
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJson(diff);
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`Format '${format}' is incorrect, possible options: plain, json or stylish`);
  }
};

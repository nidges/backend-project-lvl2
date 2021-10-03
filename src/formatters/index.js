import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (format) => {
  if (format === 'plain') {
    return formatPlain;
  }

  return formatStylish;
};

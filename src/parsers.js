import YAML from 'yaml';

export default (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  } if (format === 'yaml' || format === 'yml') {
    return YAML.parse(content);
  }
  throw new Error(`Our program doesn't work with '${format}' format yet, please choose json or yml files.`);
};

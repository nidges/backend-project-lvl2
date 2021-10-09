import YAML from 'yaml';
import _ from 'lodash';

export default (content, format) => {
  const jsonVariants = ['.json', 'json'];
  const ymlVariants = ['.yaml', 'yaml', '.yml', 'yml'];

  if (_.includes(jsonVariants, format)) {
    return JSON.parse(content);
  } if (_.includes(ymlVariants, format)) {
    return YAML.parse(content);
  }
  throw new Error('wrong file format!');
};

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = join('..', '..', 'registros.yaml');

export interface OptionConfig {
  opcoes: {
    corte: {
      titulo: string;
      valor: number;
      comisao: number;
    }[];
  };
}

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};

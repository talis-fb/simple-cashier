import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG_FILENAME = join("..", "..", "registros.yaml");

export interface OptionConfig {
  [name: string]: {
    titulo: string;
    valor: number;
    comisao: number;
    categoria?: string;
  };
}

export default () => {
  return {
    options_definition: yaml.load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8"),
    ) as OptionConfig,
  };
};

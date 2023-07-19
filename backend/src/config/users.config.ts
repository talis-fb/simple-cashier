import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG_FILENAME = join("..", "..", "usuarios.yaml");

export type UsersConfig = Array<
  { nome: string; foto: string }
>;

export default () => {
  return {
    users_definition: yaml.load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8"),
    ) as UsersConfig,
  };
};

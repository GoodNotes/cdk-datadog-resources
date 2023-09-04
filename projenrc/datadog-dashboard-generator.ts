import * as camelcaseKeys from 'camelcase-keys';
import { Project } from 'projen';
import { JsonSchemaBase, JsonSchemaBaseOptions } from './json-schema-base';

export class DataDogDashboardSchemaGenerator extends JsonSchemaBase {
  /**
   * Creates a DataDog Dashboard Typescript Interface from a json schema file.
   *
   * @param project The project
   * @param filePath File path from project root
   * @param options Options
   */
  constructor(project: Project, filePath: string, options: JsonSchemaBaseOptions) {
    super(project, filePath, options);
    // JSII requires all properties to be camelCase
    const convertedSchema = camelcaseKeys(this.schema, {
      deep: true,
      pascalCase: false,
    });

    if (convertedSchema.definitions) {
      // JSII requires all definitions (types) to be PascalCase
      convertedSchema.definitions = camelcaseKeys(convertedSchema.definitions, {
        deep: false,
        pascalCase: true,
      });
    }
    this.schema = convertedSchema;
  }
}

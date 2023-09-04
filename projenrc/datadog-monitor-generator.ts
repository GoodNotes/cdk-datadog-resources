import * as camelcaseKeys from 'camelcase-keys';
import { Project } from 'projen';
import { JsonSchemaBase, JsonSchemaBaseOptions } from './json-schema-base';

export class DataDogMonitorSchemaGenerator extends JsonSchemaBase {
  /**
   * Creates a DataDog Monitor Typescript Interface from a json schema file.
   *
   * @param project The project
   * @param filePath File path from project root
   * @param options Options
   */
  constructor(project: Project, filePath: string, options: JsonSchemaBaseOptions) {
    super(project, filePath, options);
    this.moveDeclarationToType(this.schema, 'MonitorFormulaAndFunctionEventQueryGroupBy', 'Sort');
    this.moveDeclarationToType(this.schema, 'MonitorFormulaAndFunctionEventQueryDefinition', 'Search');
    this.moveDeclarationToType(this.schema, 'MonitorFormulaAndFunctionEventQueryDefinition', 'Compute');

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

      // fix MonitorThresholds.ok -> MonitorThresholds.oK
      if (convertedSchema.definitions.MonitorThresholds?.properties?.ok) {
        // camelCase converted OK -> ok,
        // reverse (PascalCase) ok -> Ok, is incorrect
        // reverse (PascalCase) oK --> OK, is correct
        convertedSchema.definitions.MonitorThresholds.properties.oK =
          convertedSchema.definitions.MonitorThresholds.properties.ok;
        delete convertedSchema.definitions.MonitorThresholds.properties.ok;
      }
    }
    this.schema = convertedSchema;
  }
}

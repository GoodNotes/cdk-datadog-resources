import * as fs from 'fs';
import { compile, JSONSchema } from 'json-schema-to-typescript';
import { Project, FileBase, FileBaseOptions, IResolver } from 'projen';

export interface JsonSchemaBaseOptions extends FileBaseOptions {
  /**
   * File Path from project root to json schema file
   */
  filePath: string;
}

/**
 * Utility patches to apply to generated TypeScript interfaces
 * not supported by json-schema-to-typescript
 */
export const PATCHERS = {
  /**
   * Make all properties readonly
   *
   * jsii will complain if properties aren't readonly
   */
  readonlyFields: (ts: string | undefined): string | undefined => {
    if (!ts) return ts;
    // regex to set all fields that start with a lowercase letter to readonly
    return ts.replace(/^( +)([a-z])/gm, '$1readonly $2');
  },
};

export class JsonSchemaBase extends FileBase {
  protected schema: JSONSchema;
  private contents?: string;

  /**
   * Creates a new TypeScript interface from a json schema file.
   *
   * @param project The project
   * @param outFile File path from project root
   * @param options Options
   */
  constructor(project: Project, outFile: string, options: JsonSchemaBaseOptions) {
    super(project, outFile, options);
    this.schema = JSON.parse(fs.readFileSync(options.filePath).toString()) as JSONSchema;
  }

  /**
   * Generate TypeScript interface from JSON Schema
   * and apply patches to the generated interface
   *
   * @param name Name of the Interface to generate
   * @param patches Patches to apply to the generated interface
   */
  async generate(name: string, ...patches: ((schema: string | undefined) => string | undefined)[]) {
    this.contents = await compile(this.schema, name, {
      bannerComment: `// ${this.marker}`,
    });

    for (const patch of patches) {
      this.contents = patch(this.contents);
    }
  }

  /**
   * Returns the generated TypeScript Interface if it was compiled
   * else throws an error
   */
  protected synthesizeContent(_: IResolver): string | undefined {
    if (!this.contents) {
      throw new Error('contents not compiled');
    }
    return this.contents;
  }

  /**
   * Move a nested declaration to top level schema definitions
   * and update nested property to a reference instead.
   *
   * @param schema JSON Schema to modify
   * @param parentClass Name of the Parent Class containing the nested class definition as a property
   * @param className Name of the nested class to move to top level definitions
   */
  protected moveDeclarationToType(schema: JSONSchema, parentClass: string, className: string) {
    if (schema.definitions) {
      const parentDefinition = schema.definitions[parentClass];
      if (parentDefinition.properties && parentDefinition.properties[className]) {
        const newName = parentClass + className;
        schema.definitions[newName] = parentDefinition.properties[className];
        parentDefinition.properties[className] = { $ref: `#/definitions/${newName}` };
      }
    }
  }

  /**
   * Rename top level schema definition
   * and update property to new reference.
   *
   * @param schema JSON Schema to modify
   * @param propertyName Property name to update to new reference
   * @param oldName Old name of the definition
   * @param newName New name of the definition
   */
  protected renameDeclaration(schema: JSONSchema, propertyName: string, oldName: string, newName: string) {
    if (schema.definitions && schema.properties && schema.properties[propertyName]) {
      schema.definitions[newName] = schema.definitions[oldName];
      schema.properties[propertyName] = {
        $ref: `#/definitions/${newName}`,
      };
      delete schema.definitions[oldName];
    }
  }
}

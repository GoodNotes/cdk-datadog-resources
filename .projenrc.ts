import * as path from "path";
import { javascript, JsonPatch } from "projen";
import { AwsCdkConstructLibrary } from "projen/lib/awscdk";
import {
  DataDogMonitorSchemaGenerator,
  DataDogDashboardSchemaGenerator,
  DataDogSLOSchemaGenerator,
  PATCHERS,
} from "./projenrc";

const project = new AwsCdkConstructLibrary({
  author: "Gabriel Fürstenheim",
  authorAddress: "gabriel.f@goodnotes.com",
  cdkVersion: "2.92.0",
  defaultReleaseBranch: "master",
  name: "@goodnotes-oss/cdk-datadog-resources",
  repositoryUrl: "https://github.com/GoodNotes/cdk-datadog-resources.git",
  projenrcTs: true,

  /* AwsCdkConstructLibraryOptions */
  constructsVersion: "10.2.69",
  jsiiVersion: "~5.0.0",
  peerDeps: ["aws-cdk-lib@2.92.0"],
  bundledDeps: ["camelcase-keys", "decamelize"],
  devDeps: [
    "aws-cdk@2.93.0",
    "aws-cdk-lib@2.92.0",
    "json-schema-to-typescript",
  ],

  npmAccess: javascript.NpmAccess.PUBLIC,
  gitignore: ["cdk.out/"],
  prettier: true,
});

// JSII sets this to `false` so we need to be compatible
const tsConfigDev = project.tryFindObjectFile("tsconfig.dev.json");
tsConfigDev?.patch(
  JsonPatch.replace("/compilerOptions/esModuleInterop", false),
);

// docgen is currently the only task of post-compile and it fails for aws-cdk-lib in jsii
// https://github.com/cdklabs/jsii-docgen/issues/1122
const docgen = project.tasks.tryFind("docgen");
if (docgen) docgen.reset();

const schemaDir = "cf-schema";

const monitorProps = new DataDogMonitorSchemaGenerator(
  project,
  path.join(project.srcdir, "monitors", "datadog-monitor-schema.generated.ts"),
  {
    filePath: path.join(schemaDir, "datadog-monitor-4.6.0.json"),
  },
);

const dashboardProps = new DataDogDashboardSchemaGenerator(
  project,
  path.join(
    project.srcdir,
    "dashboards",
    "datadog-dashboard-schema.generated.ts",
  ),
  {
    filePath: path.join(schemaDir, "datadog-dashboard-2.1.0.json"),
  },
);

const sloProps = new DataDogSLOSchemaGenerator(
  project,
  path.join(project.srcdir, "slos", "datadog-slo-schema.generated.ts"),
  {
    filePath: path.join(schemaDir, "datadog-slo-1.1.0.json"),
  },
);

project.addTask("parse-json", {
  exec: "ts-node projenrc/parse-json.ts",
  description:
    "Parse a DataDog json file into DataDog Typescript compatible json",
  receiveArgs: true,
});

// call all Json Schema generators async, then synth
void Promise.all([
  monitorProps.generate("DatadogMonitorProps", PATCHERS.readonlyFields),
  dashboardProps.generate("DatadogDashboardProps", PATCHERS.readonlyFields),
  sloProps.generate("DatadogSLOProps", PATCHERS.readonlyFields),
]).then(() => {
  project.synth();
});

import { readFileSync, writeFileSync } from "fs";
import * as camelcaseKeys from "camelcase-keys";
import { Dashboard } from "../src/dashboards/datadog-api-dashboard.generated";
// convert a JSON string to a Dashboards API compatible JSON string

function convertDashboard(dashboard: any): Dashboard {
  return camelcaseKeys(dashboard, {
    deep: true,
    pascalCase: false,
  }) as Dashboard;
}

function readJsonFile(filePath: string): any {
  return JSON.parse(readFileSync(filePath).toString());
}

function writeJsonFile(filename: string, data: any) {
  writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
}

function convertDashboardFile(filePath: string): Dashboard {
  return convertDashboard(readJsonFile(filePath));
}

const args = process.argv.slice(2); // Ignore node and filename path
// ensure args are passed in
if (args.length < 2) {
  console.error("Usage: ts-node parse-json.js <type> <json-file>");
  console.error(
    "  type: dashboard - convert a datadog json file to a dashboards api compatible object",
  );
  process.exit(1);
}
const [type, file] = args;
if (type !== "dashboard") {
  console.error(`Unknown type: ${type}`);
  process.exit(1);
} else {
  const newFile = file.replace(".json", ".converted.json");
  const convertData = convertDashboardFile(file);
  writeJsonFile(newFile, convertData);
  console.log(`Converted to ${newFile}`);
}

import { CfnResource } from "aws-cdk-lib";
import * as camelcaseKeys from "camelcase-keys";
import { Construct } from "constructs";
import { DatadogMonitorProps } from "./datadog-monitor-schema.generated";

/**
 * Datadog Monitor 4.6.0
 */
export class DatadogMonitor {
  constructor(scope: Construct, id: string, props: DatadogMonitorProps) {
    const cfnProperties = camelcaseKeys(props, {
      deep: true,
      pascalCase: true,
    });
    new CfnResource(scope, id, {
      type: "Datadog::Monitors::Monitor",
      properties: { ...cfnProperties },
    });
  }
}

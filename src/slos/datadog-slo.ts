import { CfnResource } from "aws-cdk-lib";
import * as camelcaseKeys from "camelcase-keys";
import { Construct } from "constructs";
import { DatadogSLOProps } from "./datadog-slo-schema.generated";

/**
 * Datadog SLO 1.1.0
 */
export class DatadogSLO {
  constructor(scope: Construct, id: string, props: DatadogSLOProps) {
    const cfnProperties = camelcaseKeys(props, {
      deep: true,
      pascalCase: true,
    });
    new CfnResource(scope, id, {
      type: "Datadog::SLOs::SLO",
      properties: { ...cfnProperties },
    });
  }
}

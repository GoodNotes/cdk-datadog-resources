import { CfnResource } from "aws-cdk-lib";
import * as camelcaseKeys from "camelcase-keys";
import { Construct } from "constructs";
import { Dashboard } from "./datadog-api-dashboard.generated";
import { DatadogDashboardProps } from "./datadog-dashboard-schema.generated";
import { snakeCaseKeys } from "../util";

/**
 * Wrapper for generated Schema with typed dashboard property
 */
export interface DataDogDashboardCfnOptions extends DatadogDashboardProps {
  /** Typed Dashboard instance */
  readonly dashboard?: Dashboard;
}

/**
 * Datadog Dashboard 2.1.0
 */
export class DatadogDashboard {
  constructor(scope: Construct, id: string, props: DataDogDashboardCfnOptions) {
    let propsCopy = { ...props };
    if (props.dashboard) {
      propsCopy = {
        ...props,
        dashboardDefinition: JSON.stringify(snakeCaseKeys(props.dashboard)),
      };
      delete propsCopy.dashboard;
    }
    const cfnProperties = camelcaseKeys(propsCopy, {
      deep: true,
      pascalCase: true,
    });
    new CfnResource(scope, id, {
      type: "Datadog::Dashboards::Dashboard",
      properties: { ...cfnProperties },
    });
  }
}

import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { DatadogMonitor, MonitorType } from "../src";

test("Snapshot test", () => {
  const stack = new Stack();

  new DatadogMonitor(stack, "TestMonitor", {
    query: "avg(last_1h):sum:system.cpu.system{host:host0} > 100",
    type: MonitorType.QUERY_ALERT,
    name: "Test Monitor",
    options: {
      thresholds: {
        critical: 100,
        warning: 80,
        oK: 90,
      },
      notifyNoData: true,
      evaluationDelay: 60,
    },
  });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});

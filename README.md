# AWS CDK Datadog Resources

[![npm version](https://badge.fury.io/js/%40goodnotes-oss%2Fcdk-datadog-resources.svg)](https://badge.fury.io/js/%goodnotes-oss%2Fcdk-datadog-resources)

An AWS CDK construct library that wraps [DataDog/datadog-cloudformation-resources](https://github.com/DataDog/datadog-cloudformation-resources).

## Requirements

Before using this library, [register datadog-cloudformation-resources to your AWS account.](https://github.com/DataDog/datadog-cloudformation-resources#datadog-aws-cloudformation)

You need to register the correct version listed in `Supported Resources`.

## Supported CDK Languages

- TypeScript
- ~~Python~~. Not currently supported
- ~~Java~~ Sorry, there is a problem with the release. ([#22](https://github.com/NomadBlacky/cdk-datadog-resources/issues/22))

## Supported Resources

| Supported? | Resource                | Datadog CF Resource Name         | Description                                              | Datadog CF Version |
| :--------: | ----------------------- | -------------------------------- | -------------------------------------------------------- |--------------------|
|     ✅     | Monitors                | `Datadog::Monitors::Monitor`     | [Create, update, and delete Datadog monitors.][3]        | [4.6.0][6]         |

[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md#300--2021-02-16

## Installation

TypeScript

```shell
npm install @goodnotes-oss/cdk-datadog-resources
```

## Usage

Below are examples of TypeScript. Credentials are not required because that is configured at CFN extension level Check [requirements](#requirements)

### Monitors

```typescript
import { DatadogMonitor } from '@goodnotes-oss/cdk-datadog-resources';

new DatadogMonitor(yourStack, 'TestMonitor', {
  query: 'avg(last_1h):sum:system.cpu.system{host:host0} > 100',
  type: MonitorType.QUERY_ALERT,
  name: 'Test Monitor',
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
```


## Fork
This is a fork of https://github.com/NomadBlacky/cdk-datadog-resources, which is currently unmaintained.
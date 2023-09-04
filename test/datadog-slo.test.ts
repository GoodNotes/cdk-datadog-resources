import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DatadogSLO, SLOType, TimeframeType } from '../src';

test('Snapshot test', () => {
  const stack = new Stack();

  new DatadogSLO(stack, 'TestSLO', {
    name: 'Example-Service-Level-Objective',
    description: 'Example SLO',
    groups: ['env:test', 'role:mysql'],
    tags: ['env:prod', 'app:core'],
    type: SLOType.METRIC,
    query: {
      denominator: 'sum:httpservice.hits{!code:3xx}.as_count()',
      numerator: 'sum:httpservice.hits{code:2xx}.as_count()',
    },
    thresholds: [
      {
        target: 97.0,
        targetDisplay: '97.0',
        timeframe: TimeframeType.SEVENDAYS,
        warning: 98,
        warningDisplay: '98.0',
      },
    ],
  });
  expect(Template.fromStack(stack)).toMatchSnapshot();
});

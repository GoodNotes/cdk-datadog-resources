import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DatadogDashboard } from '../src';

test('Snapshot test', () => {
  const stack = new Stack();

  new DatadogDashboard(stack, 'TestDashboard', {
    dashboard: {
      title: 'Example-Dashboard',
      widgets: [
        {
          definition: {
            title: 'Metrics HOP',
            titleSize: '16',
            titleAlign: 'left',
            showLegend: false,
            type: 'distribution',
            customLinks: [
              {
                label: 'Example',
                link: 'https://example.org/',
              },
            ],
            xaxis: {
              max: 'auto',
              includeZero: true,
              scale: 'linear',
              min: 'auto',
            },
            yaxis: {
              max: 'auto',
              includeZero: true,
              scale: 'linear',
              min: 'auto',
            },
            requests: [
              {
                query: {
                  query: 'histogram:trace.Load{*}',
                  dataSource: 'metrics',
                  name: 'query1',
                },
                requestType: 'histogram',
                style: {
                  palette: 'dog_classic',
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 0,
            width: 4,
            height: 2,
          },
        },
      ],
      layoutType: 'ordered',
    },
  });
  expect(Template.fromStack(stack)).toMatchSnapshot();
});

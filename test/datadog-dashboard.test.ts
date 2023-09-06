import { readFileSync } from "fs";
import { join as pathJoin } from "path";
import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { DatadogDashboard } from "../src";

test("Snapshot test", () => {
  const stack = new Stack();

  new DatadogDashboard(stack, "TestDashboard", {
    dashboard: {
      title: "Example-Dashboard",
      widgets: [
        {
          definition: {
            title: "Metrics HOP",
            titleSize: "16",
            titleAlign: "left",
            showLegend: false,
            type: "distribution",
            customLinks: [
              {
                label: "Example",
                link: "https://example.org/",
              },
            ],
            xaxis: {
              max: "auto",
              includeZero: true,
              scale: "linear",
              min: "auto",
            },
            yaxis: {
              max: "auto",
              includeZero: true,
              scale: "linear",
              min: "auto",
            },
            requests: [
              {
                query: {
                  query: "histogram:trace.Load{*}",
                  dataSource: "metrics",
                  name: "query1",
                },
                requestType: "histogram",
                style: {
                  palette: "dog_classic",
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
      layoutType: "ordered",
    },
  });
  expect(Template.fromStack(stack)).toMatchSnapshot();
});

test("ArgoCD Dashboard", () => {
  const stack = new Stack();

  new DatadogDashboard(stack, "TestDashboard", {
    // This object was generated from DataDog -> Export Dashboard JSON
    // pj parse-json dashboard test/fixtures/argocd-dashboard.json
    // NOTE: the template_variables field `default: ""` had to be converted to `defaults: []`
    dashboard: {
      title: "[GNC] Argo CD Overview",
      description:
        "## Argo CD Overview\n\n### The Argo CD dashboard gives you broad visibility into your Argo CD Clusters\n\nThis dashboard provides a high-level overview of your Argo CD clusters so that you can monitor the deployments, performance, and overall health of a cluster.\n\n### Useful Links\n\n- [Datadog Argo CD Integration Documentation](https://docs.datadoghq.com/integrations/argocd/)\n- [Argo CD Official Documentation](https://argo-cd.readthedocs.io/en/latest/)\n- [Monitoring Argo CD Blogpost](https://www.datadoghq.com/blog/argo-cd-datadog/)\n\nClone this template dashboard to make changes and add your own graph widgets. (cloned)",
      widgets: [
        {
          id: 8741772350597652,
          definition: {
            title: "Overview",
            bannerImg: "/static/images/logos/argocd_small.svg",
            showTitle: false,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 5723783152443636,
                definition: {
                  type: "note",
                  content:
                    "\n### Useful Links\n- [Datadog Argo CD Integration Documentation](https://docs.datadoghq.com/integrations/argocd/)\n- [Argo CD Official Documentation](https://argo-cd.readthedocs.io/en/latest/)\n- [Monitor Argo CD Blogpost](https://www.datadoghq.com/blog/argo-cd-datadog/)",
                  backgroundColor: "transparent",
                  fontSize: "14",
                  textAlign: "left",
                  verticalAlign: "top",
                  showTick: false,
                  tickPos: "50%",
                  tickEdge: "left",
                  hasPadding: true,
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 4,
                  height: 2,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 0,
            width: 4,
            height: 5,
          },
        },
        {
          id: 2293131439045202,
          definition: {
            title: "Overview",
            backgroundColor: "vivid_blue",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 1107851890687136,
                definition: {
                  title: "Number of Applications",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Number of Applications",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.info{$host,$kube_cluster_name,$health_status,$kube_namespace,$repo} by {host}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "blue",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 148852812141642,
                definition: {
                  title: "Containers in ArgoCD namespace by Host",
                  titleSize: "16",
                  titleAlign: "left",
                  type: "hostmap",
                  requests: {
                    fill: {
                      q: "avg:process.stat.container.cpu.user_pct{$kube_cluster_name,$kube_namespace} by {host}",
                    },
                    size: {
                      q: "avg:process.stat.container.memory.rss{$kube_cluster_name,$kube_namespace} by {host}",
                    },
                  },
                  nodeType: "container",
                  noMetricHosts: true,
                  noGroupHosts: true,
                  group: ["host"],
                  scope: ["$kube_cluster_name", "$kube_namespace"],
                  style: {
                    palette: "green_to_orange",
                    paletteFlip: false,
                  },
                },
                layout: {
                  x: 4,
                  y: 0,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 8391951914104866,
                definition: {
                  title: "App Controllers",
                  titleSize: "16",
                  titleAlign: "left",
                  type: "query_value",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          aggregator: "max",
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "count:argocd.app_controller.go.goroutines{$host,$kube_cluster_name,$kube_namespace}",
                        },
                      ],
                      responseFormat: "scalar",
                    },
                  ],
                  autoscale: true,
                  precision: 2,
                },
                layout: {
                  x: 0,
                  y: 3,
                  width: 2,
                  height: 1,
                },
              },
              {
                id: 3088551287926924,
                definition: {
                  title: "AppSet Controllers (pending)",
                  titleSize: "16",
                  titleAlign: "left",
                  type: "query_value",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          aggregator: "max",
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "count:argocd.app_controller.go.goroutines{$host,$kube_cluster_name,$kube_namespace}",
                        },
                      ],
                      responseFormat: "scalar",
                    },
                  ],
                  autoscale: true,
                  precision: 2,
                },
                layout: {
                  x: 2,
                  y: 3,
                  width: 2,
                  height: 1,
                },
              },
              {
                id: 3083362413703058,
                definition: {
                  title: "Repository Servers",
                  titleSize: "16",
                  titleAlign: "left",
                  type: "query_value",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          aggregator: "max",
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "count:argocd.repo_server.go.goroutines{$host,$kube_cluster_name,$kube_namespace}",
                        },
                      ],
                      responseFormat: "scalar",
                    },
                  ],
                  autoscale: true,
                  precision: 2,
                },
                layout: {
                  x: 4,
                  y: 3,
                  width: 2,
                  height: 1,
                },
              },
              {
                id: 2764269609392968,
                definition: {
                  title: "API Servers",
                  titleSize: "16",
                  titleAlign: "left",
                  type: "query_value",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          aggregator: "max",
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "count:argocd.api_server.go.goroutines{$host,$kube_cluster_name,$kube_namespace}",
                        },
                      ],
                      responseFormat: "scalar",
                    },
                  ],
                  autoscale: true,
                  precision: 2,
                },
                layout: {
                  x: 6,
                  y: 3,
                  width: 2,
                  height: 1,
                },
              },
            ],
          },
          layout: {
            x: 4,
            y: 0,
            width: 8,
            height: 5,
          },
        },
        {
          id: 5039638453713644,
          definition: {
            title: "Logs",
            backgroundColor: "vivid_blue",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 7799454257481500,
                definition: {
                  title: "",
                  titleSize: "16",
                  titleAlign: "left",
                  requests: [
                    {
                      responseFormat: "event_list",
                      query: {
                        dataSource: "logs_pattern_stream",
                        queryString: "status:error source:argocd",
                        indexes: [],
                        groupBy: [
                          {
                            facet: "service",
                          },
                        ],
                      },
                      columns: [
                        {
                          field: "status_line",
                          width: "auto",
                        },
                        {
                          field: "matches",
                          width: "auto",
                        },
                        {
                          field: "volume",
                          width: "auto",
                        },
                        {
                          field: "service",
                          width: "auto",
                        },
                        {
                          field: "message",
                          width: "auto",
                        },
                      ],
                    },
                  ],
                  type: "list_stream",
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 12,
                  height: 3,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 5,
            width: 12,
            height: 4,
          },
        },
        {
          id: 3103904444573384,
          definition: {
            title: "Application Status",
            backgroundColor: "vivid_green",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 4761912700194790,
                definition: {
                  title: "Applications by Repositories",
                  titleSize: "16",
                  titleAlign: "left",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          aggregator: "avg",
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "count:argocd.app_controller.app.info{$host,$kube_cluster_name,$health_status,$kube_namespace,$repo} by {repo,host,name}",
                        },
                      ],
                      responseFormat: "scalar",
                    },
                  ],
                  type: "sunburst",
                  hideTotal: false,
                  legend: {
                    type: "table",
                  },
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 12,
                  height: 4,
                },
              },
              {
                id: 7617765285986134,
                definition: {
                  title: "Number of Applications",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "horizontal",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Number of Applications",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.info{$host,$kube_cluster_name,$health_status,$kube_namespace,$repo} by {sync_status}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 4,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 8732078285048376,
                definition: {
                  title: "Applications Not in Sync by Sync_Status & Host",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Application not Synced",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.info{!sync_status:synced,$host,$kube_cluster_name,$health_status,$kube_namespace,$repo} by {sync_status,host,name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 4,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 4491005302659932,
                definition: {
                  title: "Number of Application Syncs",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Application Syncs",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.sync.count{$host,$kube_cluster_name,$health_status,$kube_namespace,$repo} by {host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "blue",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 7,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 3479937394251732,
                definition: {
                  title: "Number of Non Successful Application Syncs",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Unsuccessful Syncs",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.sync.count{!phase:succeeded,$host,$kube_cluster_name,$health_status,$kube_namespace,$repo} by {phase,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "blue",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 7,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 2091528630387406,
                definition: {
                  type: "note",
                  content: "Application Controller Telemetry",
                  backgroundColor: "green",
                  fontSize: "18",
                  textAlign: "center",
                  verticalAlign: "center",
                  showTick: false,
                  tickPos: "50%",
                  tickEdge: "left",
                  hasPadding: true,
                },
                layout: {
                  x: 0,
                  y: 10,
                  width: 12,
                  height: 1,
                },
              },
              {
                id: 4927792811835832,
                definition: {
                  title: "Application Controller Memory Usage by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Memory Allocated",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.app_controller.go.memstats.heap.alloc_bytes{$host,$kube_cluster_name,$kube_namespace} by {cluster_name,host}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 11,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 6525343257017112,
                definition: {
                  title: "Application Controller Goroutines Usage by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Goroutines",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.app_controller.go.goroutines{$host,$kube_cluster_name,$kube_namespace} by {kube_namespace,host}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 4,
                  y: 11,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 3471621043457984,
                definition: {
                  title: "Application Controller CPU Time by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "CPU Time",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.process.cpu.seconds.count{$host,$kube_cluster_name,$kube_namespace} by {kube_namespace,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 8,
                  y: 11,
                  width: 4,
                  height: 3,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 9,
            width: 12,
            height: 1,
          },
        },
        {
          id: 8970831812548910,
          definition: {
            title: "Controller Stats",
            backgroundColor: "vivid_orange",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 1683090577470882,
                definition: {
                  title: "Count of Application Reconciliation",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Application Reconciliation",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.reconcile.count{$host,$kube_cluster_name,$kube_namespace} by {namespace,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "orange",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 2882037992742898,
                definition: {
                  title:
                    "Count of Application Reconciliation by Duration Bounds",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Reconciliation Duration",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.reconcile.bucket{$host,$kube_cluster_name,$kube_namespace} by {upper_bound,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "orange",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 2092421836560578,
                definition: {
                  title: "Depth of the Workqueue",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Workqueue depth",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.workqueue.depth{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "orange",
                      },
                      displayType: "bars",
                    },
                  ],
                  yaxis: {
                    includeZero: true,
                    scale: "linear",
                    min: "auto",
                    max: "auto",
                  },
                },
                layout: {
                  x: 0,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 4125569125075486,
                definition: {
                  title: "Count of Kubernetes Requests Executed",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Kubectl Request Executed",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.app.k8s.request.count{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "orange",
                      },
                      displayType: "bars",
                    },
                  ],
                  yaxis: {
                    includeZero: true,
                    scale: "linear",
                    min: "auto",
                    max: "auto",
                  },
                },
                layout: {
                  x: 6,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 6916335121689932,
                definition: {
                  title: "Count of Kubectl Executions",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Kubectl Execution",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.kubectl.exec.count{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "orange",
                      },
                      displayType: "bars",
                    },
                  ],
                  yaxis: {
                    includeZero: true,
                    scale: "linear",
                    min: "auto",
                    max: "auto",
                  },
                },
                layout: {
                  x: 0,
                  y: 6,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 1713544962494578,
                definition: {
                  title: "Count of Pending Kubectl Executions",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Pending Kubectl Execution",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.app_controller.kubectl.exec.pending{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "orange",
                      },
                      displayType: "bars",
                    },
                  ],
                  yaxis: {
                    includeZero: true,
                    scale: "linear",
                    min: "auto",
                    max: "auto",
                  },
                },
                layout: {
                  x: 6,
                  y: 6,
                  width: 6,
                  height: 3,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 10,
            width: 12,
            height: 1,
          },
        },
        {
          id: 2661663506447074,
          definition: {
            title: "Server Stats",
            backgroundColor: "vivid_purple",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 7853075716472980,
                definition: {
                  title: "Count of Service Requests by Service",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "All Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{$host,$kube_cluster_name,$kube_namespace} by {grpc_service,kube_cluster_name,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 2986577135722696,
                definition: {
                  title: "Count of Cluster Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Cluster Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:cluster.clusterservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 4161309530762940,
                definition: {
                  title: "Count of Application Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Application Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:application.applicationservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 3346295316212716,
                definition: {
                  title: "Count of Repository Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Repository Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:repository.repositoryservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,kube_cluster_name,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 251735075640654,
                definition: {
                  title: "Count of Session Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Session Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:session.sessionservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,kube_cluster_name,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 6,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 6377937600157456,
                definition: {
                  title: "Count of Version Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Version Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:version.versionservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 6,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 8207475356653118,
                definition: {
                  title: "Count of Account Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Account Service Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:account.accountservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,kube_cluster_name,host}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 9,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 5496058710860268,
                definition: {
                  title: "Count of Settings Service Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Settings Service Request ",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.grpc.server.handled.count{grpc_service:cluster.settingsservice,$host,$kube_cluster_name,$kube_namespace} by {grpc_code,grpc_method,host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "purple",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 9,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 3658743930291138,
                definition: {
                  type: "note",
                  content: "API Server Telemetry",
                  backgroundColor: "purple",
                  fontSize: "18",
                  textAlign: "center",
                  verticalAlign: "center",
                  showTick: false,
                  tickPos: "50%",
                  tickEdge: "left",
                  hasPadding: true,
                },
                layout: {
                  x: 0,
                  y: 12,
                  width: 12,
                  height: 1,
                },
              },
              {
                id: 5099362422931018,
                definition: {
                  title: "API Server Memory Usage by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Memory Allocated",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.api_server.go.memstats.heap.alloc_bytes{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 13,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 5166753638637396,
                definition: {
                  title: "API Server Goroutines Usage by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Goroutines",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.api_server.go.goroutines{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 4,
                  y: 13,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 6597509157761322,
                definition: {
                  title: "API Server CPU Time by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "CPU Time",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.api_server.process.cpu.seconds.count{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 8,
                  y: 13,
                  width: 4,
                  height: 3,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 11,
            width: 12,
            height: 1,
          },
        },
        {
          id: 444244913319832,
          definition: {
            title: "Repository Server Stats",
            backgroundColor: "vivid_orange",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 8507386561737364,
                definition: {
                  title: "Count of Git Ls-Remote Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Ls-remote Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.repo_server.git.request.count{request_type:ls-remote,$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 5597200409579852,
                definition: {
                  title: "Git Ls-Remote Requests Performance",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.repo_server.git.request.duration.seconds.bucket{request_type:ls-remote,$host,$kube_cluster_name,$kube_namespace} by {upper_bound,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 1635931665551580,
                definition: {
                  title: "Count of Git Fetch Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Fetch Request",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.repo_server.git.request.count{request_type:fetch,$host,$kube_cluster_name,$kube_namespace}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 1418427818359380,
                definition: {
                  title: "Fetch Git Requests Performance",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.repo_server.git.request.duration.seconds.bucket{request_type:fetch,kube_cluster_name,$host,$kube_cluster_name,$kube_namespace}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 1888889021360466,
                definition: {
                  title: "Count of of Redis Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Request",
                          formula: "query2",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query2",
                          query:
                            "sum:argocd.api_server.redis.request.count{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 6,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 1452795846002068,
                definition: {
                  title: "Number of Failed Redis Requests",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Number of Requests Failures",
                          formula: "query2",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query2",
                          query:
                            "sum:argocd.api_server.redis.request.count{failed:true,$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 6,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 915681521277132,
                definition: {
                  type: "note",
                  content: "Repository Server Telemetry",
                  backgroundColor: "orange",
                  fontSize: "18",
                  textAlign: "center",
                  verticalAlign: "center",
                  showTick: false,
                  tickPos: "50%",
                  tickEdge: "left",
                  hasPadding: true,
                },
                layout: {
                  x: 0,
                  y: 9,
                  width: 12,
                  height: 1,
                },
              },
              {
                id: 4222714840704378,
                definition: {
                  title: "Repository Server Memory Usage by Cluster",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Memory Allocated",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.repo_server.go.memstats.heap.alloc_bytes{$host,$kube_cluster_name,$kube_namespace} by {kube_cluster_name,host}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 10,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 1739824276453470,
                definition: {
                  title: "Repository Server Goroutines Usage",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Goroutines",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.repo_server.go.goroutines{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 4,
                  y: 10,
                  width: 4,
                  height: 3,
                },
              },
              {
                id: 7302272394223286,
                definition: {
                  title: "Repository Server CPU Time",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "CPU Time",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "sum:argocd.repo_server.process.cpu.seconds.count{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}.as_count()",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "dog_classic",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 8,
                  y: 10,
                  width: 4,
                  height: 3,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 12,
            width: 12,
            height: 1,
          },
        },
        {
          id: 5257189791506674,
          definition: {
            title: "Cluster Stats",
            backgroundColor: "vivid_green",
            showTitle: true,
            type: "group",
            layoutType: "ordered",
            widgets: [
              {
                id: 877335939374388,
                definition: {
                  title: "Count of Cluster Resource Objects",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "API Resource Object",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.app_controller.cluster.api.resource_objects{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "green",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 6895703789485698,
                definition: {
                  title: "Count of API Resources",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "API Resource",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.app_controller.cluster_api_resources{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "green",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 0,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 8008111599023896,
                definition: {
                  title: "Count of Cluster Events",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Cluster Event",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.app_controller.cluster.events.count{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "green",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "bars",
                    },
                  ],
                },
                layout: {
                  x: 0,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
              {
                id: 1101747570951110,
                definition: {
                  title: "Age of Cluster Cache",
                  titleSize: "16",
                  titleAlign: "left",
                  showLegend: true,
                  legendLayout: "auto",
                  legendColumns: ["avg", "min", "max", "value", "sum"],
                  type: "timeseries",
                  requests: [
                    {
                      formulas: [
                        {
                          alias: "Cluster Cache Age",
                          formula: "query1",
                        },
                      ],
                      queries: [
                        {
                          dataSource: "metrics",
                          name: "query1",
                          query:
                            "avg:argocd.app_controller.cluster.cache.age.seconds{$host,$kube_cluster_name,$kube_namespace} by {host,kube_cluster_name}",
                        },
                      ],
                      responseFormat: "timeseries",
                      style: {
                        palette: "green",
                        lineType: "solid",
                        lineWidth: "normal",
                      },
                      displayType: "line",
                    },
                  ],
                },
                layout: {
                  x: 6,
                  y: 3,
                  width: 6,
                  height: 3,
                },
              },
            ],
          },
          layout: {
            x: 0,
            y: 13,
            width: 12,
            height: 7,
            isColumnBreak: true,
          },
        },
      ],
      templateVariables: [
        {
          name: "host",
          prefix: "host",
          availableValues: [],
          defaults: ["*"],
        },
        {
          name: "kube_cluster_name",
          prefix: "kube_cluster_name",
          availableValues: [],
          defaults: ["*"],
        },
        {
          name: "kube_namespace",
          prefix: "kube_namespace",
          availableValues: [],
          defaults: ["*"],
        },
        {
          name: "health_status",
          prefix: "health_status",
          availableValues: [],
          defaults: ["*"],
        },
        {
          name: "repo",
          prefix: "repo",
          availableValues: [],
          defaults: ["*"],
        },
      ],
      layoutType: "ordered",
      notifyList: [],
      reflowType: "fixed",
    },
  });

  const dashboardDefinition = JSON.parse(
    readFileSync(
      pathJoin(__dirname, "fixtures", "argocd-dashboard.json"),
      "utf8",
    ),
  );
  const stackTemplate = Template.fromStack(stack);
  // validate dashboard definition against fixture
  stackTemplate.hasResourceProperties("Datadog::Dashboards::Dashboard", {
    DashboardDefinition: JSON.stringify(dashboardDefinition),
  });
});

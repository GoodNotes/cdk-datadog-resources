/**
 * The type of the monitor
 */
export enum MonitorType {
  AUDIT_ALERT = 'audit alert',
  COMPOSITE = 'composite',
  EVENT_ALERT = 'event alert',
  EVENT_V_2_ALERT = 'event-v2 alert',
  LOG_ALERT = 'log alert',
  METRIC_ALERT = 'metric alert',
  PROCESS_ALERT = 'process alert',
  QUERY_ALERT = 'query alert',
  SERVICE_CHECK = 'service check',
  SYNTHETICS_ALERT = 'synthetics alert',
  TRACE_ANALYTICS_ALERT = 'trace-analytics alert',
  SLO_ALERT = 'slo alert',
  RUM_ALERT = 'rum alert',
  CI_PIPELINES_ALERT = 'ci-pipelines alert',
  ERROR_TRACKING_ALERT = 'error-tracking alert',
  CI_TESTS_ALERT = 'ci-tests alert'
}


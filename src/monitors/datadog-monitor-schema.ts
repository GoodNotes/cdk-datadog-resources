// This file was autogenerated by `yarn create-typescript-types`. DO NOT MODIFY

/**
 * Data source for event platform-based queries.
 */
export type MonitorFormulaAndFunctionEventAggregation =
  | 'count'
  | 'cardinality'
  | 'median'
  | 'pc75'
  | 'pc90'
  | 'pc95'
  | 'pc98'
  | 'pc99'
  | 'sum'
  | 'min'
  | 'max'
  | 'avg';

/**
 * Datadog Monitor 4.6.0
 */
export interface DatadogMonitorProps {
  readonly creator?: Creator;
  /**
   * ID of the monitor
   */
  readonly id?: number;
  /**
   * A message to include with notifications for the monitor
   */
  readonly message?: string;
  /**
   * Name of the monitor
   */
  readonly name?: string;
  /**
   * Tags associated with the monitor
   */
  readonly tags?: string[];
  /**
   * Integer from 1 (high) to 5 (low) indicating alert severity.
   */
  readonly priority?: number;
  readonly options?: MonitorOptions;
  /**
   * The monitor query
   */
  readonly query?: string;
  /**
   * The type of the monitor
   */
  readonly type?:
  | 'audit alert'
  | 'composite'
  | 'event alert'
  | 'event-v2 alert'
  | 'log alert'
  | 'metric alert'
  | 'process alert'
  | 'query alert'
  | 'service check'
  | 'synthetics alert'
  | 'trace-analytics alert'
  | 'slo alert'
  | 'rum alert'
  | 'ci-pipelines alert'
  | 'error-tracking alert'
  | 'ci-tests alert';
  /**
   * Whether or not the monitor is multi alert
   */
  readonly multi?: boolean;
  /**
   * Date of creation of the monitor
   */
  readonly created?: string;
  /**
   * Date of deletion of the monitor
   */
  readonly deleted?: string;
  /**
   * Date of modification of the monitor
   */
  readonly modified?: string;
  /**
   * A list of unique role identifiers to define which roles are allowed to edit the monitor. The unique identifiers for all roles can be pulled from the [Roles API](https://docs.datadoghq.com/api/latest/roles/#list-roles) and are located in the `data.id` field. Editing a monitor includes any updates to the monitor configuration, monitor deletion, and muting of the monitor for any amount of time. `restricted_roles` is the successor of `locked`. For more information about `locked` and `restricted_roles`, see the [monitor options docs](https://docs.datadoghq.com/monitors/guide/monitor_api_options/#permissions-options).
   */
  readonly restrictedRoles?: string[];
}
export interface Creator {
  /**
   * Name of the creator of the monitor
   */
  readonly name?: string;
  /**
   * Handle of the creator of the monitor
   */
  readonly handle?: string;
  /**
   * Email of the creator of the monitor
   */
  readonly email?: string;
}
/**
 * The monitor options
 */
export interface MonitorOptions {
  /**
   * Whether or not to include a sample of the logs
   */
  readonly enableLogsSample?: boolean;
  /**
   * Message to include with a re-notification when renotify_interval is set
   */
  readonly escalationMessage?: string;
  /**
   * Time in seconds to delay evaluation
   */
  readonly evaluationDelay?: number;
  /**
   * Whether or not to include triggering tags into notification title
   */
  readonly includeTags?: boolean;
  /**
   * Whether or not changes to this monitor should be restricted to the creator or admins
   */
  readonly locked?: boolean;
  /**
   * Number of locations allowed to fail before triggering alert
   */
  readonly minLocationFailed?: number;
  /**
   * Time in seconds to allow a host to start reporting data before starting the evaluation of monitor results
   */
  readonly newHostDelay?: number;
  /**
   * Number of minutes data stopped reporting before notifying
   */
  readonly noDataTimeframe?: number;
  /**
   * Whether or not to notify tagged users when changes are made to the monitor
   */
  readonly notifyAudit?: boolean;
  /**
   * Whether or not to notify when data stops reporting
   */
  readonly notifyNoData?: boolean;
  /**
   * Number of minutes after the last notification before the monitor re-notifies on the current status
   */
  readonly renotifyInterval?: number;
  /**
   * Whether or not the monitor requires a full window of data before it is evaluated
   */
  readonly requireFullWindow?: boolean;
  /**
   * ID of the corresponding synthetics check
   */
  readonly syntheticsCheckId?: number;
  readonly thresholds?: MonitorThresholds;
  readonly thresholdWindows?: MonitorThresholdWindows;
  /**
   * Number of hours of the monitor not reporting data before it automatically resolves
   */
  readonly timeoutH?: number;
  /**
   * The number of times re-notification messages should be sent on the current status at the provided re-notification interval.
   */
  readonly renotifyOccurrences?: number;
  /**
   * The types of monitor statuses for which re-notification messages are sent.
   */
  readonly renotifyStatuses?: ('alert' | 'no data' | 'warn')[];
  /**
   * How long the test should be in failure before alerting (integer, number of seconds, max 7200).
   */
  readonly minFailureDuration?: number;
  /**
   * Time (in seconds) to skip evaluations for new groups. For example, this option can be used to skip evaluations for new hosts while they initialize. Must be a non negative integer.
   */
  readonly newGroupDelay?: number;
  /**
   * List of requests that can be used in the monitor query.
   */
  readonly variables?: MonitorFormulaAndFunctionEventQueryDefinition[];
}
/**
 * The threshold definitions
 */
export interface MonitorThresholds {
  /**
   * Threshold value for triggering an alert
   */
  readonly critical?: number;
  /**
   * Threshold value for recovering from an alert state
   */
  readonly criticalRecovery?: number;
  /**
   * Threshold value for recovering from an alert state
   */
  readonly ok?: number;
  /**
   * Threshold value for triggering a warning
   */
  readonly warning?: number;
  /**
   * Threshold value for recovering from a warning state
   */
  readonly warningRecovery?: number;
}
/**
 * The threshold window definitions
 */
export interface MonitorThresholdWindows {
  /**
   * How long a metric must be anomalous before triggering an alert
   */
  readonly triggerWindow?: string;
  /**
   * How long an anomalous metric must be normal before recovering from an alert state
   */
  readonly recoveryWindow?: string;
}
/**
 * A formula and functions events query.
 */
export interface MonitorFormulaAndFunctionEventQueryDefinition {
  /**
   * Threshold value for triggering an alert.
   */
  readonly dataSource?: 'rum' | 'ci_pipelines' | 'ci_tests' | 'audit' | 'events' | 'logs' | 'spans';
  readonly search?: MonitorFormulaAndFunctionEventQueryDefinitionSearch;
  /**
   * An array of index names to query in the stream. Omit or use `[]` to query all indexes at once.
   */
  readonly indexes?: string[];
  readonly compute?: MonitorFormulaAndFunctionEventQueryDefinitionCompute;
  /**
   * Group by options.
   */
  readonly groupBy?: MonitorFormulaAndFunctionEventQueryGroupBy[];
  /**
   * Name of the monitor
   */
  readonly name?: string;
}
/**
 * Search options.
 */
export interface MonitorFormulaAndFunctionEventQueryDefinitionSearch {
  /**
   * The monitor query.
   */
  readonly query?: string;
}
/**
 * Compute options.
 */
export interface MonitorFormulaAndFunctionEventQueryDefinitionCompute {
  readonly aggregation?: MonitorFormulaAndFunctionEventAggregation;
  /**
   * A time interval in milliseconds.
   */
  readonly interval?: number;
  /**
   * Measurable attribute to compute.
   */
  readonly metric?: string;
}
/**
 * Credentials for the Datadog API
 */
export interface MonitorFormulaAndFunctionEventQueryGroupBy {
  /**
   * Event facet.
   */
  readonly facet?: string;
  /**
   * Event facet.
   */
  readonly limit?: number;
  readonly sort?: MonitorFormulaAndFunctionEventQueryGroupBySort;
}
/**
 * Options for sorting group by results.
 */
export interface MonitorFormulaAndFunctionEventQueryGroupBySort {
  readonly aggregation?: MonitorFormulaAndFunctionEventAggregation;
  /**
   * Options for sorting group by results.
   */
  readonly metric?: string;
  /**
   * Direction of sort.
   */
  readonly order?: 'asc' | 'desc';
}

// curl -Lo datadog-api-dashboard.generated.ts https://raw.githubusercontent.com/GoodNotes/ts-interface-generator/3e1d9a740ffe4d10f7279b636ca3e01a34dbc0dd/src/Dashboard.generated.ts
export interface Dashboard {
  /** Identifier of the dashboard author. */
  readonly authorHandle?: string;
  /** Name of the dashboard author. */
  readonly authorName?: string;
  /** Creation date of the dashboard. */
  readonly createdAt?: Date;
  /** Description of the dashboard. */
  readonly description?: string;
  /** ID of the dashboard. */
  readonly id?: string;
  /** Whether this dashboard is read-only. If True, only the author and admins can make changes to it. Prefer using `restricted_roles` to manage write authorization. */
  readonly isReadOnly?: boolean;
  /** Layout type of the dashboard. */
  readonly layoutType: 'ordered' | 'free' | UnparsedObject;
  /** Modification date of the dashboard. */
  readonly modifiedAt?: Date;
  /** List of handles of users to notify when changes are made to this dashboard. */
  readonly notifyList?: string[];
  /**
   * Reflow type for a **new dashboard layout** dashboard. Set this only when layout type is 'ordered'.
   * If set to 'fixed', the dashboard expects all widgets to have a layout, and if it's set to 'auto',
   * widgets should not have layouts.
   */
  readonly reflowType?: 'auto' | 'fixed' | UnparsedObject;
  /** A list of role identifiers. Only the author and users associated with at least one of these roles can edit this dashboard. */
  readonly restrictedRoles?: string[];
  /** List of team names representing ownership of a dashboard. */
  readonly tags?: string[];
  /** Array of template variables saved views. */
  readonly templateVariablePresets?: Array<DashboardTemplateVariablePreset>;
  /** List of template variables for this dashboard. */
  readonly templateVariables?: Array<DashboardTemplateVariable>;
  /** Title of the dashboard. */
  readonly title: string;
  /** The URL of the dashboard. */
  readonly url?: string;
  /** List of widgets to display on the dashboard. */
  readonly widgets: Array<Widget>;
}

export interface UnparsedObject {
  /** @internal */
  readonly _data: any;
}

export interface DashboardTemplateVariablePreset {
  /** The name of the variable. */
  readonly name?: string;
  /** List of variables. */
  readonly templateVariables?: Array<DashboardTemplateVariablePresetValue>;
}

export interface DashboardTemplateVariablePresetValue {
  /** The name of the variable. */
  readonly name?: string;
  /** (deprecated) The value of the template variable within the saved view. Cannot be used in conjunction with `values`. */
  readonly value?: string;
  /** One or many template variable values within the saved view, which will be unioned together using `OR` if more than one is specified. Cannot be used in conjunction with `value`. */
  readonly values?: string[];
}

export interface DashboardTemplateVariable {
  /** The list of values that the template variable drop-down is limited to. */
  readonly availableValues?: string[];
  /** One or many default values for template variables on load. If more than one default is specified, they will be unioned together with `OR`. Cannot be used in conjunction with `default`. */
  readonly defaults?: string[];
  /** The name of the variable. */
  readonly name: string;
  /** The tag prefix associated with the variable. Only tags with this prefix appear in the variable drop-down. */
  readonly prefix?: string;
}

export interface Widget {
  /** [Definition of the widget](https://docs.datadoghq.com/dashboards/widgets/). */
  readonly definition:
    | AlertGraphWidgetDefinition
    | AlertValueWidgetDefinition
    | ChangeWidgetDefinition
    | CheckStatusWidgetDefinition
    | DistributionWidgetDefinition
    | EventStreamWidgetDefinition
    | EventTimelineWidgetDefinition
    | FreeTextWidgetDefinition
    | GeomapWidgetDefinition
    | GroupWidgetDefinition
    | HeatMapWidgetDefinition
    | HostMapWidgetDefinition
    | IFrameWidgetDefinition
    | ImageWidgetDefinition
    | LogStreamWidgetDefinition
    | MonitorSummaryWidgetDefinition
    | NoteWidgetDefinition
    | QueryValueWidgetDefinition
    | RunWorkflowWidgetDefinition
    | ScatterPlotWidgetDefinition
    | SLOWidgetDefinition
    | SLOListWidgetDefinition
    | ServiceMapWidgetDefinition
    | ServiceSummaryWidgetDefinition
    | SunburstWidgetDefinition
    | TableWidgetDefinition
    | TimeseriesWidgetDefinition
    | ToplistWidgetDefinition
    | TreeMapWidgetDefinition
    | ListStreamWidgetDefinition
    | FunnelWidgetDefinition
    | TopologyMapWidgetDefinition
    | UnparsedObject;
  /** ID of the widget. */
  readonly id?: number;
  /** The layout for a widget on a `free` or **new dashboard layout** dashboard. */
  readonly layout?: WidgetLayout;
}

export interface AlertGraphWidgetDefinition {
  /** ID of the alert to use in the widget. */
  readonly alertId: string;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** The title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the alert graph widget. */
  readonly type: 'alert_graph' | UnparsedObject;
  /** Whether to display the Alert Graph as a timeseries or a top list. */
  readonly vizType: 'timeseries' | 'toplist' | UnparsedObject;
}

export interface WidgetTime {
  /** The available timeframes depend on the widget you are using. */
  readonly liveSpan?:
    | '1m'
    | '5m'
    | '10m'
    | '15m'
    | '30m'
    | '1h'
    | '4h'
    | '1d'
    | '2d'
    | '1w'
    | '1mo'
    | '3mo'
    | '6mo'
    | '1y'
    | 'alert'
    | UnparsedObject;
}

export interface AlertValueWidgetDefinition {
  /** ID of the alert to use in the widget. */
  readonly alertId: string;
  /** Number of decimal to show. If not defined, will use the raw value. */
  readonly precision?: number;
  /** How to align the text on the widget. */
  readonly textAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of value in the widget. */
  readonly titleSize?: string;
  /** Type of the alert value widget. */
  readonly type: 'alert_value' | UnparsedObject;
  /** Unit to display with the value. */
  readonly unit?: string;
}

export interface ChangeWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /**
   * Array of one request object to display in the widget.
   *
   * See the dedicated [Request JSON schema documentation](https://docs.datadoghq.com/dashboards/graphing_json/request_json)
   *  to learn how to build the `REQUEST_SCHEMA`.
   */
  readonly requests: Array<ChangeWidgetRequest>;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the change widget. */
  readonly type: 'change' | UnparsedObject;
}

export interface WidgetCustomLink {
  /** The flag for toggling context menu link visibility. */
  readonly isHidden?: boolean;
  /** The label for the custom link URL. Keep the label short and descriptive. Use metrics and tags as variables. */
  readonly label?: string;
  /** The URL of the custom link. URL must include `http` or `https`. A relative URL must start with `/`. */
  readonly link?: string;
  /** The label ID that refers to a context menu link. Can be `logs`, `hosts`, `traces`, `profiles`, `processes`, `containers`, or `rum`. */
  readonly overrideLabel?: string;
}

export interface ChangeWidgetRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** Show the absolute or the relative change. */
  readonly changeType?: 'absolute' | 'relative' | UnparsedObject;
  /** Timeframe used for the change comparison. */
  readonly compareTo?: 'hour_before' | 'day_before' | 'week_before' | 'month_before' | UnparsedObject;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** Whether to show increase as good. */
  readonly increaseGood?: boolean;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** What to order by. */
  readonly orderBy?: 'change' | 'name' | 'present' | 'past' | UnparsedObject;
  /** Widget sorting methods. */
  readonly orderDir?: 'asc' | 'desc' | UnparsedObject;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Query definition. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
  /** Whether to show the present value. */
  readonly showPresent?: boolean;
}

export interface LogQueryDefinition {
  /** Define computation for a log query. */
  readonly compute?: LogsQueryCompute;
  /** List of tag prefixes to group by in the case of a cluster check. */
  readonly groupBy?: Array<LogQueryDefinitionGroupBy>;
  /** A coma separated-list of index names. Use "*" query all indexes at once. [Multiple Indexes](https://docs.datadoghq.com/logs/indexes/#multiple-indexes) */
  readonly index?: string;
  /** This field is mutually exclusive with `compute`. */
  readonly multiCompute?: Array<LogsQueryCompute>;
  /** The query being made on the logs. */
  readonly search?: LogQueryDefinitionSearch;
}

export interface LogsQueryCompute {
  /** The aggregation method. */
  readonly aggregation: string;
  /** Facet name. */
  readonly facet?: string;
  /** Define a time interval in seconds. */
  readonly interval?: number;
}

export interface LogQueryDefinitionGroupBy {
  /** Facet name. */
  readonly facet: string;
  /** Maximum number of items in the group. */
  readonly limit?: number;
  /** Define a sorting method. */
  readonly sort?: LogQueryDefinitionGroupBySort;
}

export interface LogQueryDefinitionGroupBySort {
  /** The aggregation method. */
  readonly aggregation: string;
  /** Facet name. */
  readonly facet?: string;
  /** Widget sorting methods. */
  readonly order: 'asc' | 'desc' | UnparsedObject;
}

export interface LogQueryDefinitionSearch {
  /** Search value to apply. */
  readonly query: string;
}

export interface WidgetFormula {
  /** Expression alias. */
  readonly alias?: string;
  /** Define a display mode for the table cell. */
  readonly cellDisplayMode?: 'number' | 'bar' | UnparsedObject;
  /** List of conditional formats. */
  readonly conditionalFormats?: Array<WidgetConditionalFormat>;
  /** String expression built from queries, formulas, and functions. */
  readonly formula: string;
  /** Options for limiting results returned. */
  readonly limit?: WidgetFormulaLimit;
  /** Styling options for widget formulas. */
  readonly style?: WidgetFormulaStyle;
}

export interface WidgetConditionalFormat {
  /** Comparator to apply. */
  readonly comparator: '=' | '>' | '>=' | '<' | '<=' | UnparsedObject;
  /** Color palette to apply to the background, same values available as palette. */
  readonly customBgColor?: string;
  /** Color palette to apply to the foreground, same values available as palette. */
  readonly customFgColor?: string;
  /** True hides values. */
  readonly hideValue?: boolean;
  /** Displays an image as the background. */
  readonly imageUrl?: string;
  /** Metric from the request to correlate this conditional format with. */
  readonly metric?: string;
  /** Color palette to apply. */
  readonly palette:
    | 'blue'
    | 'custom_bg'
    | 'custom_image'
    | 'custom_text'
    | 'gray_on_white'
    | 'grey'
    | 'green'
    | 'orange'
    | 'red'
    | 'red_on_white'
    | 'white_on_gray'
    | 'white_on_green'
    | 'green_on_white'
    | 'white_on_red'
    | 'white_on_yellow'
    | 'yellow_on_white'
    | 'black_on_light_yellow'
    | 'black_on_light_green'
    | 'black_on_light_red'
    | UnparsedObject;
  /** Defines the displayed timeframe. */
  readonly timeframe?: string;
  /** Value for the comparator. */
  readonly value: number;
}

export interface WidgetFormulaLimit {
  /** Number of results to return. */
  readonly count?: number;
  /** Direction of sort. */
  readonly order?: 'asc' | 'desc' | UnparsedObject;
}

export interface WidgetFormulaStyle {
  /** The color palette used to display the formula. A guide to the available color palettes can be found at https://docs.datadoghq.com/dashboards/guide/widget_colors */
  readonly palette?: string;
  /** Index specifying which color to use within the palette. */
  readonly paletteIndex?: number;
}

export interface ProcessQueryDefinition {
  /** List of processes. */
  readonly filterBy?: string[];
  /** Max number of items in the filter list. */
  readonly limit?: number;
  /** Your chosen metric. */
  readonly metric: string;
  /** Your chosen search term. */
  readonly searchBy?: string;
}

export interface FormulaAndFunctionMetricQueryDefinition {
  /** The aggregation methods available for metrics queries. */
  readonly aggregator?: 'avg' | 'min' | 'max' | 'sum' | 'last' | 'area' | 'l2norm' | 'percentile' | UnparsedObject;
  /** Data source for metrics queries. */
  readonly dataSource: 'metrics' | UnparsedObject;
  /** Name of the query for use in formulas. */
  readonly name: string;
  /** Metrics query definition. */
  readonly query: string;
}

export interface FormulaAndFunctionEventQueryDefinition {
  /** Compute options. */
  readonly compute: FormulaAndFunctionEventQueryDefinitionCompute;
  /** Data source for event platform-based queries. */
  readonly dataSource:
    | 'logs'
    | 'spans'
    | 'network'
    | 'rum'
    | 'security_signals'
    | 'profiles'
    | 'audit'
    | 'events'
    | 'ci_tests'
    | 'ci_pipelines'
    | UnparsedObject;
  /** Group by options. */
  readonly groupBy?: Array<FormulaAndFunctionEventQueryGroupBy>;
  /** An array of index names to query in the stream. Omit or use `[]` to query all indexes at once. */
  readonly indexes?: string[];
  /** Name of the query for use in formulas. */
  readonly name: string;
  /** Search options. */
  readonly search?: FormulaAndFunctionEventQueryDefinitionSearch;
  /** Option for storage location. Feature in Private Beta. */
  readonly storage?: string;
}

export interface FormulaAndFunctionEventQueryDefinitionCompute {
  /** Aggregation methods for event platform queries. */
  readonly aggregation:
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
    | 'avg'
    | UnparsedObject;
  /** A time interval in milliseconds. */
  readonly interval?: number;
  /** Measurable attribute to compute. */
  readonly metric?: string;
}

export interface FormulaAndFunctionEventQueryGroupBy {
  /** Event facet. */
  readonly facet: string;
  /** Number of groups to return. */
  readonly limit?: number;
  /** Options for sorting group by results. */
  readonly sort?: FormulaAndFunctionEventQueryGroupBySort;
}

export interface FormulaAndFunctionEventQueryGroupBySort {
  /** Aggregation methods for event platform queries. */
  readonly aggregation:
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
    | 'avg'
    | UnparsedObject;
  /** Metric used for sorting group by results. */
  readonly metric?: string;
  /** Direction of sort. */
  readonly order?: 'asc' | 'desc' | UnparsedObject;
}

export interface FormulaAndFunctionEventQueryDefinitionSearch {
  /** Events search string. */
  readonly query: string;
}

export interface FormulaAndFunctionProcessQueryDefinition {
  /** The aggregation methods available for metrics queries. */
  readonly aggregator?: 'avg' | 'min' | 'max' | 'sum' | 'last' | 'area' | 'l2norm' | 'percentile' | UnparsedObject;
  /** Data sources that rely on the process backend. */
  readonly dataSource: 'process' | 'container' | UnparsedObject;
  /** Whether to normalize the CPU percentages. */
  readonly isNormalizedCpu?: boolean;
  /** Number of hits to return. */
  readonly limit?: number;
  /** Process metric name. */
  readonly metric: string;
  /** Name of query for use in formulas. */
  readonly name: string;
  /** Direction of sort. */
  readonly sort?: 'asc' | 'desc' | UnparsedObject;
  /** An array of tags to filter by. */
  readonly tagFilters?: string[];
  /** Text to use as filter. */
  readonly textFilter?: string;
}

export interface FormulaAndFunctionApmDependencyStatsQueryDefinition {
  /** Data source for APM dependency stats queries. */
  readonly dataSource: 'apm_dependency_stats' | UnparsedObject;
  /** APM environment. */
  readonly env: string;
  /** Determines whether stats for upstream or downstream dependencies should be queried. */
  readonly isUpstream?: boolean;
  /** Name of query to use in formulas. */
  readonly name: string;
  /** Name of operation on service. */
  readonly operationName: string;
  /** The name of the second primary tag used within APM; required when `primary_tag_value` is specified. See https://docs.datadoghq.com/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog. */
  readonly primaryTagName?: string;
  /** Filter APM data by the second primary tag. `primary_tag_name` must also be specified. */
  readonly primaryTagValue?: string;
  /** APM resource. */
  readonly resourceName: string;
  /** APM service. */
  readonly service: string;
  /** APM statistic. */
  readonly stat:
    | 'avg_duration'
    | 'avg_root_duration'
    | 'avg_spans_per_trace'
    | 'error_rate'
    | 'pct_exec_time'
    | 'pct_of_traces'
    | 'total_traces_count'
    | UnparsedObject;
}

export interface FormulaAndFunctionApmResourceStatsQueryDefinition {
  /** Data source for APM resource stats queries. */
  readonly dataSource: 'apm_resource_stats' | UnparsedObject;
  /** APM environment. */
  readonly env: string;
  /** Array of fields to group results by. */
  readonly groupBy?: string[];
  /** Name of this query to use in formulas. */
  readonly name: string;
  /** Name of operation on service. */
  readonly operationName?: string;
  /** Name of the second primary tag used within APM. Required when `primary_tag_value` is specified. See https://docs.datadoghq.com/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog */
  readonly primaryTagName?: string;
  /** Value of the second primary tag by which to filter APM data. `primary_tag_name` must also be specified. */
  readonly primaryTagValue?: string;
  /** APM resource name. */
  readonly resourceName?: string;
  /** APM service name. */
  readonly service: string;
  /** APM resource stat name. */
  readonly stat:
    | 'errors'
    | 'error_rate'
    | 'hits'
    | 'latency_avg'
    | 'latency_distribution'
    | 'latency_max'
    | 'latency_p50'
    | 'latency_p75'
    | 'latency_p90'
    | 'latency_p95'
    | 'latency_p99'
    | UnparsedObject;
}

export interface FormulaAndFunctionSLOQueryDefinition {
  /** Additional filters applied to the SLO query. */
  readonly additionalQueryFilters?: string;
  /** Data source for SLO measures queries. */
  readonly dataSource: 'slo' | UnparsedObject;
  /** Group mode to query measures. */
  readonly groupMode?: 'overall' | 'components' | UnparsedObject;
  /** SLO measures queries. */
  readonly measure:
    | 'good_events'
    | 'bad_events'
    | 'slo_status'
    | 'error_budget_remaining'
    | 'burn_rate'
    | 'error_budget_burndown'
    | UnparsedObject;
  /** Name of the query for use in formulas. */
  readonly name?: string;
  /** ID of an SLO to query measures. */
  readonly sloId: string;
  /** Name of the query for use in formulas. */
  readonly sloQueryType?: 'metric' | UnparsedObject;
}

export interface FormulaAndFunctionCloudCostQueryDefinition {
  /** Aggregator used for the request. */
  readonly aggregator?: 'avg' | 'last' | 'max' | 'min' | 'sum' | 'percentile' | UnparsedObject;
  /** Data source for Cloud Cost queries. */
  readonly dataSource: 'cloud_cost' | UnparsedObject;
  /** Name of the query for use in formulas. */
  readonly name: string;
  /** Query for Cloud Cost data. */
  readonly query: string;
}

export interface CheckStatusWidgetDefinition {
  /** Name of the check to use in the widget. */
  readonly check: string;
  /** Group reporting a single check. */
  readonly group?: string;
  /** List of tag prefixes to group by in the case of a cluster check. */
  readonly groupBy?: string[];
  /** The kind of grouping to use. */
  readonly grouping: 'check' | 'cluster' | UnparsedObject;
  /** List of tags used to filter the groups reporting a cluster check. */
  readonly tags?: string[];
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the check status widget. */
  readonly type: 'check_status' | UnparsedObject;
}

export interface DistributionWidgetDefinition {
  /** A list of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** (Deprecated) The widget legend was replaced by a tooltip and sidebar. */
  readonly legendSize?: string;
  /** List of markers. */
  readonly markers?: Array<WidgetMarker>;
  /**
   * Array of one request object to display in the widget.
   *
   * See the dedicated [Request JSON schema documentation](https://docs.datadoghq.com/dashboards/graphing_json/request_json)
   *  to learn how to build the `REQUEST_SCHEMA`.
   */
  readonly requests: Array<DistributionWidgetRequest>;
  /** (Deprecated) The widget legend was replaced by a tooltip and sidebar. */
  readonly showLegend?: boolean;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the distribution widget. */
  readonly type: 'distribution' | UnparsedObject;
  /** X Axis controls for the distribution widget. */
  readonly xaxis?: DistributionWidgetXAxis;
  /** Y Axis controls for the distribution widget. */
  readonly yaxis?: DistributionWidgetYAxis;
}

export interface WidgetMarker {
  /**
   * Combination of:
   *   - A severity error, warning, ok, or info
   *   - A line type: dashed, solid, or bold
   * In this case of a Distribution widget, this can be set to be `x_axis_percentile`.
   */
  readonly displayType?: string;
  /** Label to display over the marker. */
  readonly label?: string;
  /** Timestamp for the widget. */
  readonly time?: string;
  /** Value to apply. Can be a single value y = 15 or a range of values 0 < y < 10. */
  readonly value: string;
}

export interface DistributionWidgetRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The APM stats query for table and distributions widgets. */
  readonly apmStatsQuery?: ApmStatsQueryDefinition;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Widget query. */
  readonly q?: string;
  /** Query definition for Distribution Widget Histogram Request */
  readonly query?:
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | UnparsedObject;
  /** Request type for the histogram request. */
  readonly requestType?: 'histogram' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
  /** Widget style definition. */
  readonly style?: WidgetStyle;
}

export interface ApmStatsQueryDefinition {
  /** Column properties used by the front end for display. */
  readonly columns?: Array<ApmStatsQueryColumnType>;
  /** Environment name. */
  readonly env: string;
  /** Operation name associated with service. */
  readonly name: string;
  /** The organization's host group name and value. */
  readonly primaryTag: string;
  /** Resource name. */
  readonly resource?: string;
  /** The level of detail for the request. */
  readonly rowType: 'service' | 'resource' | 'span' | UnparsedObject;
  /** Service name. */
  readonly service: string;
}

export interface ApmStatsQueryColumnType {
  /** A user-assigned alias for the column. */
  readonly alias?: string;
  /** Define a display mode for the table cell. */
  readonly cellDisplayMode?: 'number' | 'bar' | UnparsedObject;
  /** Column name. */
  readonly name: string;
  /** Widget sorting methods. */
  readonly order?: 'asc' | 'desc' | UnparsedObject;
}

export interface WidgetStyle {
  /** Color palette to apply to the widget. */
  readonly palette?: string;
}

export interface DistributionWidgetXAxis {
  /** True includes zero. */
  readonly includeZero?: boolean;
  /** Specifies maximum value to show on the x-axis. It takes a number, percentile (p90 === 90th percentile), or auto for default behavior. */
  readonly max?: string;
  /** Specifies minimum value to show on the x-axis. It takes a number, percentile (p90 === 90th percentile), or auto for default behavior. */
  readonly min?: string;
  /** Specifies the scale type. Possible values are `linear`. */
  readonly scale?: string;
}

export interface DistributionWidgetYAxis {
  /** True includes zero. */
  readonly includeZero?: boolean;
  /** The label of the axis to display on the graph. */
  readonly label?: string;
  /** Specifies the maximum value to show on the y-axis. It takes a number, or auto for default behavior. */
  readonly max?: string;
  /** Specifies minimum value to show on the y-axis. It takes a number, or auto for default behavior. */
  readonly min?: string;
  /** Specifies the scale type. Possible values are `linear` or `log`. */
  readonly scale?: string;
}

export interface EventStreamWidgetDefinition {
  /** Size to use to display an event. */
  readonly eventSize?: 's' | 'l' | UnparsedObject;
  /** Query to filter the event stream with. */
  readonly query: string;
  /** The execution method for multi-value filters. Can be either and or or. */
  readonly tagsExecution?: string;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the event stream widget. */
  readonly type: 'event_stream' | UnparsedObject;
}

export interface EventTimelineWidgetDefinition {
  /** Query to filter the event timeline with. */
  readonly query: string;
  /** The execution method for multi-value filters. Can be either and or or. */
  readonly tagsExecution?: string;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the event timeline widget. */
  readonly type: 'event_timeline' | UnparsedObject;
}

export interface FreeTextWidgetDefinition {
  /** Color of the text. */
  readonly color?: string;
  /** Size of the text. */
  readonly fontSize?: string;
  /** Text to display. */
  readonly text: string;
  /** How to align the text on the widget. */
  readonly textAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Type of the free text widget. */
  readonly type: 'free_text' | UnparsedObject;
}

export interface GeomapWidgetDefinition {
  /** A list of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /**
   * Array of one request object to display in the widget. The request must contain a `group-by` tag whose value is a country ISO code.
   *
   * See the [Request JSON schema documentation](https://docs.datadoghq.com/dashboards/graphing_json/request_json)
   * for information about building the `REQUEST_SCHEMA`.
   */
  readonly requests: Array<GeomapWidgetRequest>;
  /** The style to apply to the widget. */
  readonly style: GeomapWidgetDefinitionStyle;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** The title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** The size of the title. */
  readonly titleSize?: string;
  /** Type of the geomap widget. */
  readonly type: 'geomap' | UnparsedObject;
  /** The view of the world that the map should render. */
  readonly view: GeomapWidgetDefinitionView;
}

export interface GeomapWidgetRequest {
  /** Widget columns. */
  readonly columns?: Array<ListStreamColumn>;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The widget metrics query. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Updated list stream widget. */
  readonly query?: ListStreamQuery;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
}

export interface ListStreamColumn {
  /** Widget column field. */
  readonly field: string;
  /** Widget column width. */
  readonly width: 'auto' | 'compact' | 'full' | UnparsedObject;
}

export interface ListStreamQuery {
  /** Compute configuration for the List Stream Widget. Compute can be used only with the logs_transaction_stream (from 1 to 5 items) list stream source. */
  readonly compute?: Array<ListStreamComputeItems>;
  /** Source from which to query items to display in the stream. */
  readonly dataSource:
    | 'logs_stream'
    | 'audit_stream'
    | 'ci_pipeline_stream'
    | 'ci_test_stream'
    | 'rum_issue_stream'
    | 'apm_issue_stream'
    | 'logs_issue_stream'
    | 'logs_pattern_stream'
    | 'logs_transaction_stream'
    | 'event_stream'
    | UnparsedObject;
  /** Size to use to display an event. */
  readonly eventSize?: 's' | 'l' | UnparsedObject;
  /** Group by configuration for the List Stream Widget. Group by can be used only with logs_pattern_stream (up to 3 items) or logs_transaction_stream (one group by item is required) list stream source. */
  readonly groupBy?: Array<ListStreamGroupByItems>;
  /** List of indexes. */
  readonly indexes?: string[];
  /** Widget query. */
  readonly queryString: string;
  /** Which column and order to sort by */
  readonly sort?: WidgetFieldSort;
  /** Option for storage location. Feature in Private Beta. */
  readonly storage?: string;
}

export interface ListStreamComputeItems {
  /** Aggregation value. */
  readonly aggregation:
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
    | 'avg'
    | 'earliest'
    | 'latest'
    | 'most_frequent'
    | UnparsedObject;
  /** Facet name. */
  readonly facet?: string;
}

export interface ListStreamGroupByItems {
  /** Facet name. */
  readonly facet: string;
}

export interface WidgetFieldSort {
  /** Facet path for the column */
  readonly column: string;
  /** Widget sorting methods. */
  readonly order: 'asc' | 'desc' | UnparsedObject;
}

export interface GeomapWidgetDefinitionStyle {
  /** The color palette to apply to the widget. */
  readonly palette: string;
  /** Whether to flip the palette tones. */
  readonly paletteFlip: boolean;
}

export interface GeomapWidgetDefinitionView {
  /** The 2-letter ISO code of a country to focus the map on. Or `WORLD`. */
  readonly focus: string;
}

export interface GroupWidgetDefinition {
  /** Background color of the group title. */
  readonly backgroundColor?: string;
  /** URL of image to display as a banner for the group. */
  readonly bannerImg?: string;
  /** Layout type of the group. */
  readonly layoutType: 'ordered' | UnparsedObject;
  /** Whether to show the title or not. */
  readonly showTitle?: boolean;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Type of the group widget. */
  readonly type: 'group' | UnparsedObject;
  /** List of widget groups. */
  readonly widgets: Array<Widget>;
}

export interface HeatMapWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** List of widget events. */
  readonly events?: Array<WidgetEvent>;
  /** Available legend sizes for a widget. Should be one of "0", "2", "4", "8", "16", or "auto". */
  readonly legendSize?: string;
  /** List of widget types. */
  readonly requests: Array<HeatMapWidgetRequest>;
  /** Whether or not to display the legend on this widget. */
  readonly showLegend?: boolean;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the heat map widget. */
  readonly type: 'heatmap' | UnparsedObject;
  /** Axis controls for the widget. */
  readonly yaxis?: WidgetAxis;
}

export interface WidgetEvent {
  /** Query definition. */
  readonly q: string;
  /** The execution method for multi-value filters. */
  readonly tagsExecution?: string;
}

export interface HeatMapWidgetRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The event query. */
  readonly eventQuery?: EventQueryDefinition;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Widget query. */
  readonly q?: string;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
  /** Widget style definition. */
  readonly style?: WidgetStyle;
}

export interface EventQueryDefinition {
  /** The query being made on the event. */
  readonly search: string;
  /** The execution method for multi-value filters. Can be either and or or. */
  readonly tagsExecution: string;
}

export interface WidgetAxis {
  /** Set to `true` to include zero. */
  readonly includeZero?: boolean;
  /** The label of the axis to display on the graph. Only usable on Scatterplot Widgets. */
  readonly label?: string;
  /** Specifies maximum numeric value to show on the axis. Defaults to `auto`. */
  readonly max?: string;
  /** Specifies minimum numeric value to show on the axis. Defaults to `auto`. */
  readonly min?: string;
  /** Specifies the scale type. Possible values are `linear`, `log`, `sqrt`, and `pow##` (for example `pow2` or `pow0.5`). */
  readonly scale?: string;
}

export interface HostMapWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** List of tag prefixes to group by. */
  readonly group?: string[];
  /** Whether to show the hosts that don’t fit in a group. */
  readonly noGroupHosts?: boolean;
  /** Whether to show the hosts with no metrics. */
  readonly noMetricHosts?: boolean;
  /** Which type of node to use in the map. */
  readonly nodeType?: 'host' | 'container' | UnparsedObject;
  /** Notes on the title. */
  readonly notes?: string;
  /** List of definitions. */
  readonly requests: HostMapWidgetDefinitionRequests;
  /** List of tags used to filter the map. */
  readonly scope?: string[];
  /** The style to apply to the widget. */
  readonly style?: HostMapWidgetDefinitionStyle;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the host map widget. */
  readonly type: 'hostmap' | UnparsedObject;
}

export interface HostMapWidgetDefinitionRequests {
  /** Updated host map. */
  readonly fill?: HostMapRequest;
  /** Updated host map. */
  readonly size?: HostMapRequest;
}

export interface HostMapRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Query definition. */
  readonly q?: string;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
}

export interface HostMapWidgetDefinitionStyle {
  /** Max value to use to color the map. */
  readonly fillMax?: string;
  /** Min value to use to color the map. */
  readonly fillMin?: string;
  /** Color palette to apply to the widget. */
  readonly palette?: string;
  /** Whether to flip the palette tones. */
  readonly paletteFlip?: boolean;
}

export interface IFrameWidgetDefinition {
  /** Type of the iframe widget. */
  readonly type: 'iframe' | UnparsedObject;
  /** URL of the iframe. */
  readonly url: string;
}

export interface ImageWidgetDefinition {
  /** Whether to display a background or not. */
  readonly hasBackground?: boolean;
  /** Whether to display a border or not. */
  readonly hasBorder?: boolean;
  /** Horizontal alignment. */
  readonly horizontalAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /**
   * Size of the margins around the image.
   * **Note**: `small` and `large` values are deprecated.
   */
  readonly margin?: 'sm' | 'md' | 'lg' | 'small' | 'large' | UnparsedObject;
  /**
   * How to size the image on the widget. The values are based on the image `object-fit` CSS properties.
   * **Note**: `zoom`, `fit` and `center` values are deprecated.
   */
  readonly sizing?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | 'zoom' | 'fit' | 'center' | UnparsedObject;
  /** Type of the image widget. */
  readonly type: 'image' | UnparsedObject;
  /** URL of the image. */
  readonly url: string;
  /** URL of the image in dark mode. */
  readonly urlDarkTheme?: string;
  /** Vertical alignment. */
  readonly verticalAlign?: 'center' | 'top' | 'bottom' | UnparsedObject;
}

export interface LogStreamWidgetDefinition {
  /** Which columns to display on the widget. */
  readonly columns?: string[];
  /** An array of index names to query in the stream. Use [] to query all indexes at once. */
  readonly indexes?: string[];
  /** ID of the log set to use. */
  readonly logset?: string;
  /** Amount of log lines to display */
  readonly messageDisplay?: 'inline' | 'expanded-md' | 'expanded-lg' | UnparsedObject;
  /** Query to filter the log stream with. */
  readonly query?: string;
  /** Whether to show the date column or not */
  readonly showDateColumn?: boolean;
  /** Whether to show the message column or not */
  readonly showMessageColumn?: boolean;
  /** Which column and order to sort by */
  readonly sort?: WidgetFieldSort;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the log stream widget. */
  readonly type: 'log_stream' | UnparsedObject;
}

export interface MonitorSummaryWidgetDefinition {
  /** Which color to use on the widget. */
  readonly colorPreference?: 'background' | 'text' | UnparsedObject;
  /** The number of monitors to display. */
  readonly count?: number;
  /** What to display on the widget. */
  readonly displayFormat?: 'counts' | 'countsAndList' | 'list' | UnparsedObject;
  /** Whether to show counts of 0 or not. */
  readonly hideZeroCounts?: boolean;
  /** Query to filter the monitors with. */
  readonly query: string;
  /** Whether to show the time that has elapsed since the monitor/group triggered. */
  readonly showLastTriggered?: boolean;
  /** Whether to show the priorities column. */
  readonly showPriority?: boolean;
  /** Widget sorting methods. */
  readonly sort?:
    | 'name'
    | 'group'
    | 'status'
    | 'tags'
    | 'triggered'
    | 'group,asc'
    | 'group,desc'
    | 'name,asc'
    | 'name,desc'
    | 'status,asc'
    | 'status,desc'
    | 'tags,asc'
    | 'tags,desc'
    | 'triggered,asc'
    | 'triggered,desc'
    | 'priority,asc'
    | 'priority,desc'
    | UnparsedObject;
  /** The start of the list. Typically 0. */
  readonly start?: number;
  /** Which summary type should be used. */
  readonly summaryType?: 'monitors' | 'groups' | 'combined' | UnparsedObject;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the monitor summary widget. */
  readonly type: 'manage_status' | UnparsedObject;
}

export interface NoteWidgetDefinition {
  /** Background color of the note. */
  readonly backgroundColor?: string;
  /** Content of the note. */
  readonly content: string;
  /** Size of the text. */
  readonly fontSize?: string;
  /** Whether to add padding or not. */
  readonly hasPadding?: boolean;
  /** Whether to show a tick or not. */
  readonly showTick?: boolean;
  /** How to align the text on the widget. */
  readonly textAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Define how you want to align the text on the widget. */
  readonly tickEdge?: 'bottom' | 'left' | 'right' | 'top' | UnparsedObject;
  /** Where to position the tick on an edge. */
  readonly tickPos?: string;
  /** Type of the note widget. */
  readonly type: 'note' | UnparsedObject;
  /** Vertical alignment. */
  readonly verticalAlign?: 'center' | 'top' | 'bottom' | UnparsedObject;
}

export interface QueryValueWidgetDefinition {
  /** Whether to use auto-scaling or not. */
  readonly autoscale?: boolean;
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** Display a unit of your choice on the widget. */
  readonly customUnit?: string;
  /** Number of decimals to show. If not defined, the widget uses the raw value. */
  readonly precision?: number;
  /** Widget definition. */
  readonly requests: Array<QueryValueWidgetRequest>;
  /** How to align the text on the widget. */
  readonly textAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Set a timeseries on the widget background. */
  readonly timeseriesBackground?: TimeseriesBackground;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the query value widget. */
  readonly type: 'query_value' | UnparsedObject;
}

export interface QueryValueWidgetRequest {
  /** Aggregator used for the request. */
  readonly aggregator?: 'avg' | 'last' | 'max' | 'min' | 'sum' | 'percentile' | UnparsedObject;
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The log query. */
  readonly auditQuery?: LogQueryDefinition;
  /** List of conditional formats. */
  readonly conditionalFormats?: Array<WidgetConditionalFormat>;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** TODO. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
}

export interface TimeseriesBackground {
  /** Timeseries is made using an area or bars. */
  readonly type: 'bars' | 'area' | UnparsedObject;
  /** Axis controls for the widget. */
  readonly yaxis?: WidgetAxis;
}

export interface RunWorkflowWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** Array of workflow inputs to map to dashboard template variables. */
  readonly inputs?: Array<RunWorkflowWidgetInput>;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the run workflow widget. */
  readonly type: 'run_workflow' | UnparsedObject;
  /** Workflow id. */
  readonly workflowId: string;
}

export interface RunWorkflowWidgetInput {
  /** Name of the workflow input. */
  readonly name: string;
  /** Dashboard template variable. Can be suffixed with '.value' or '.key'. */
  readonly value: string;
}

export interface ScatterPlotWidgetDefinition {
  /** List of groups used for colors. */
  readonly colorByGroups?: string[];
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** Widget definition. */
  readonly requests: ScatterPlotWidgetDefinitionRequests;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the scatter plot widget. */
  readonly type: 'scatterplot' | UnparsedObject;
  /** Axis controls for the widget. */
  readonly xaxis?: WidgetAxis;
  /** Axis controls for the widget. */
  readonly yaxis?: WidgetAxis;
}

export interface ScatterPlotWidgetDefinitionRequests {
  /** Scatterplot request containing formulas and functions. */
  readonly table?: ScatterplotTableRequest;
  /** Updated scatter plot. */
  readonly x?: ScatterPlotRequest;
  /** Updated scatter plot. */
  readonly y?: ScatterPlotRequest;
}

export interface ScatterplotTableRequest {
  /** List of Scatterplot formulas that operate on queries. */
  readonly formulas?: Array<ScatterplotWidgetFormula>;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
}

export interface ScatterplotWidgetFormula {
  /** Expression alias. */
  readonly alias?: string;
  /** Dimension of the Scatterplot. */
  readonly dimension: 'x' | 'y' | 'radius' | 'color' | UnparsedObject;
  /** String expression built from queries, formulas, and functions. */
  readonly formula: string;
}

export interface ScatterPlotRequest {
  /** Aggregator used for the request. */
  readonly aggregator?: 'avg' | 'last' | 'max' | 'min' | 'sum' | UnparsedObject;
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Query definition. */
  readonly q?: string;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
}

export interface SLOWidgetDefinition {
  /** Additional filters applied to the SLO query. */
  readonly additionalQueryFilters?: string;
  /** Defined global time target. */
  readonly globalTimeTarget?: string;
  /** Defined error budget. */
  readonly showErrorBudget?: boolean;
  /** ID of the SLO displayed. */
  readonly sloId?: string;
  /** Times being monitored. */
  readonly timeWindows?: Array<
    | '7d'
    | '30d'
    | '90d'
    | 'week_to_date'
    | 'previous_week'
    | 'month_to_date'
    | 'previous_month'
    | 'global_time'
    | UnparsedObject
  >;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the SLO widget. */
  readonly type: 'slo' | UnparsedObject;
  /** Define how you want the SLO to be displayed. */
  readonly viewMode?: 'overall' | 'component' | 'both' | UnparsedObject;
  /** Type of view displayed by the widget. */
  readonly viewType: string;
}

export interface SLOListWidgetDefinition {
  /** Array of one request object to display in the widget. */
  readonly requests: Array<SLOListWidgetRequest>;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the SLO List widget. */
  readonly type: 'slo_list' | UnparsedObject;
}

export interface SLOListWidgetRequest {
  /** Updated SLO List widget. */
  readonly query: SLOListWidgetQuery;
  /** Widget request type. */
  readonly requestType: 'slo_list' | UnparsedObject;
}

export interface SLOListWidgetQuery {
  /** Maximum number of results to display in the table. */
  readonly limit?: number;
  /** Widget query. */
  readonly queryString: string;
  /** Options for sorting results. */
  readonly sort?: Array<WidgetFieldSort>;
}

export interface ServiceMapWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** Your environment and primary tag (or * if enabled for your account). */
  readonly filters: string[];
  /** The ID of the service you want to map. */
  readonly service: string;
  /** The title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the service map widget. */
  readonly type: 'servicemap' | UnparsedObject;
}

export interface ServiceSummaryWidgetDefinition {
  /** Number of columns to display. */
  readonly displayFormat?: 'one_column' | 'two_column' | 'three_column' | UnparsedObject;
  /** APM environment. */
  readonly env: string;
  /** APM service. */
  readonly service: string;
  /** Whether to show the latency breakdown or not. */
  readonly showBreakdown?: boolean;
  /** Whether to show the latency distribution or not. */
  readonly showDistribution?: boolean;
  /** Whether to show the error metrics or not. */
  readonly showErrors?: boolean;
  /** Whether to show the hits metrics or not. */
  readonly showHits?: boolean;
  /** Whether to show the latency metrics or not. */
  readonly showLatency?: boolean;
  /** Whether to show the resource list or not. */
  readonly showResourceList?: boolean;
  /** Size of the widget. */
  readonly sizeFormat?: 'small' | 'medium' | 'large' | UnparsedObject;
  /** APM span name. */
  readonly spanName: string;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the service summary widget. */
  readonly type: 'trace_service' | UnparsedObject;
}

export interface SunburstWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** Show the total value in this widget. */
  readonly hideTotal?: boolean;
  /** Configuration of the legend. */
  readonly legend?: SunburstWidgetLegendTable | SunburstWidgetLegendInlineAutomatic | UnparsedObject;
  /** List of sunburst widget requests. */
  readonly requests: Array<SunburstWidgetRequest>;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the Sunburst widget. */
  readonly type: 'sunburst' | UnparsedObject;
}

export interface SunburstWidgetLegendTable {
  /** Whether or not to show a table legend. */
  readonly type: 'table' | 'none' | UnparsedObject;
}

export interface SunburstWidgetLegendInlineAutomatic {
  /** Whether to hide the percentages of the groups. */
  readonly hidePercent?: boolean;
  /** Whether to hide the values of the groups. */
  readonly hideValue?: boolean;
  /** Whether to show the legend inline or let it be automatically generated. */
  readonly type: 'inline' | 'automatic' | UnparsedObject;
}

export interface SunburstWidgetRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The log query. */
  readonly auditQuery?: LogQueryDefinition;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Widget query. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
}

export interface TableWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** Controls the display of the search bar. */
  readonly hasSearchBar?: 'always' | 'never' | 'auto' | UnparsedObject;
  /** Widget definition. */
  readonly requests: Array<TableWidgetRequest>;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the table widget. */
  readonly type: 'query_table' | UnparsedObject;
}

export interface TableWidgetRequest {
  /** Aggregator used for the request. */
  readonly aggregator?: 'avg' | 'last' | 'max' | 'min' | 'sum' | 'percentile' | UnparsedObject;
  /** The column name (defaults to the metric name). */
  readonly alias?: string;
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The APM stats query for table and distributions widgets. */
  readonly apmStatsQuery?: ApmStatsQueryDefinition;
  /** A list of display modes for each table cell. */
  readonly cellDisplayMode?: Array<'number' | 'bar' | UnparsedObject>;
  /** List of conditional formats. */
  readonly conditionalFormats?: Array<WidgetConditionalFormat>;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** For metric queries, the number of lines to show in the table. Only one request should have this property. */
  readonly limit?: number;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** Widget sorting methods. */
  readonly order?: 'asc' | 'desc' | UnparsedObject;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Query definition. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
}

export interface TimeseriesWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** List of widget events. */
  readonly events?: Array<WidgetEvent>;
  /** Columns displayed in the legend. */
  readonly legendColumns?: Array<'value' | 'avg' | 'sum' | 'min' | 'max' | UnparsedObject>;
  /** Layout of the legend. */
  readonly legendLayout?: 'auto' | 'horizontal' | 'vertical' | UnparsedObject;
  /** Available legend sizes for a widget. Should be one of "0", "2", "4", "8", "16", or "auto". */
  readonly legendSize?: string;
  /** List of markers. */
  readonly markers?: Array<WidgetMarker>;
  /** List of timeseries widget requests. */
  readonly requests: Array<TimeseriesWidgetRequest>;
  /** Axis controls for the widget. */
  readonly rightYaxis?: WidgetAxis;
  /** (screenboard only) Show the legend for this widget. */
  readonly showLegend?: boolean;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the timeseries widget. */
  readonly type: 'timeseries' | UnparsedObject;
  /** Axis controls for the widget. */
  readonly yaxis?: WidgetAxis;
}

export interface TimeseriesWidgetRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The log query. */
  readonly auditQuery?: LogQueryDefinition;
  /** Type of display to use for the request. */
  readonly displayType?: 'area' | 'bars' | 'line' | 'overlay' | UnparsedObject;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** Used to define expression aliases. */
  readonly metadata?: Array<TimeseriesWidgetExpressionAlias>;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** Whether or not to display a second y-axis on the right. */
  readonly onRightYaxis?: boolean;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Widget query. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
  /** Define request widget style. */
  readonly style?: WidgetRequestStyle;
}

export interface TimeseriesWidgetExpressionAlias {
  /** Expression alias. */
  readonly aliasName?: string;
  /** Expression name. */
  readonly expression: string;
}

export interface WidgetRequestStyle {
  /** Type of lines displayed. */
  readonly lineType?: 'dashed' | 'dotted' | 'solid' | UnparsedObject;
  /** Width of line displayed. */
  readonly lineWidth?: 'normal' | 'thick' | 'thin' | UnparsedObject;
  /** Color palette to apply to the widget. */
  readonly palette?: string;
}

export interface ToplistWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** List of top list widget requests. */
  readonly requests: Array<ToplistWidgetRequest>;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the top list widget. */
  readonly type: 'toplist' | UnparsedObject;
}

export interface ToplistWidgetRequest {
  /** The log query. */
  readonly apmQuery?: LogQueryDefinition;
  /** The log query. */
  readonly auditQuery?: LogQueryDefinition;
  /** List of conditional formats. */
  readonly conditionalFormats?: Array<WidgetConditionalFormat>;
  /** The log query. */
  readonly eventQuery?: LogQueryDefinition;
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** The log query. */
  readonly logQuery?: LogQueryDefinition;
  /** The log query. */
  readonly networkQuery?: LogQueryDefinition;
  /** The process query to use in the widget. */
  readonly processQuery?: ProcessQueryDefinition;
  /** The log query. */
  readonly profileMetricsQuery?: LogQueryDefinition;
  /** Widget query. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
  /** The log query. */
  readonly rumQuery?: LogQueryDefinition;
  /** The log query. */
  readonly securityQuery?: LogQueryDefinition;
  /** Define request widget style. */
  readonly style?: WidgetRequestStyle;
}

export interface TreeMapWidgetDefinition {
  /** (deprecated) The attribute formerly used to determine color in the widget. */
  readonly colorBy?: 'user' | UnparsedObject;
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** (deprecated) The attribute formerly used to group elements in the widget. */
  readonly groupBy?: 'user' | 'family' | 'process' | UnparsedObject;
  /** List of treemap widget requests. */
  readonly requests: Array<TreeMapWidgetRequest>;
  /** (deprecated) The attribute formerly used to determine size in the widget. */
  readonly sizeBy?: 'pct_cpu' | 'pct_mem' | UnparsedObject;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of your widget. */
  readonly title?: string;
  /** Type of the treemap widget. */
  readonly type: 'treemap' | UnparsedObject;
}

export interface TreeMapWidgetRequest {
  /** List of formulas that operate on queries. */
  readonly formulas?: Array<WidgetFormula>;
  /** The widget metrics query. */
  readonly q?: string;
  /** List of queries that can be returned directly or used in formulas. */
  readonly queries?: Array<
    | FormulaAndFunctionMetricQueryDefinition
    | FormulaAndFunctionEventQueryDefinition
    | FormulaAndFunctionProcessQueryDefinition
    | FormulaAndFunctionApmDependencyStatsQueryDefinition
    | FormulaAndFunctionApmResourceStatsQueryDefinition
    | FormulaAndFunctionSLOQueryDefinition
    | FormulaAndFunctionCloudCostQueryDefinition
    | UnparsedObject
  >;
  /** Timeseries, scalar, or event list response. Event list response formats are supported by Geomap widgets. */
  readonly responseFormat?: 'timeseries' | 'scalar' | 'event_list' | UnparsedObject;
}

export interface ListStreamWidgetDefinition {
  /** Available legend sizes for a widget. Should be one of "0", "2", "4", "8", "16", or "auto". */
  readonly legendSize?: string;
  /** Request payload used to query items. */
  readonly requests: Array<ListStreamWidgetRequest>;
  /** Whether or not to display the legend on this widget. */
  readonly showLegend?: boolean;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** Title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the list stream widget. */
  readonly type: 'list_stream' | UnparsedObject;
}

export interface ListStreamWidgetRequest {
  /** Widget columns. */
  readonly columns: Array<ListStreamColumn>;
  /** Updated list stream widget. */
  readonly query: ListStreamQuery;
  /** Widget response format. */
  readonly responseFormat: 'event_list' | UnparsedObject;
}

export interface FunnelWidgetDefinition {
  /** Request payload used to query items. */
  readonly requests: Array<FunnelWidgetRequest>;
  /** Time setting for the widget. */
  readonly time?: WidgetTime;
  /** The title of the widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** The size of the title. */
  readonly titleSize?: string;
  /** Type of funnel widget. */
  readonly type: 'funnel' | UnparsedObject;
}

export interface FunnelWidgetRequest {
  /** Updated funnel widget. */
  readonly query: FunnelQuery;
  /** Widget request type. */
  readonly requestType: 'funnel' | UnparsedObject;
}

export interface FunnelQuery {
  /** Source from which to query items to display in the funnel. */
  readonly dataSource: 'rum' | UnparsedObject;
  /** The widget query. */
  readonly queryString: string;
  /** List of funnel steps. */
  readonly steps: Array<FunnelStep>;
}

export interface FunnelStep {
  /** The facet of the step. */
  readonly facet: string;
  /** The value of the step. */
  readonly value: string;
}

export interface TopologyMapWidgetDefinition {
  /** List of custom links. */
  readonly customLinks?: Array<WidgetCustomLink>;
  /** One or more Topology requests. */
  readonly requests: Array<TopologyRequest>;
  /** Title of your widget. */
  readonly title?: string;
  /** How to align the text on the widget. */
  readonly titleAlign?: 'center' | 'left' | 'right' | UnparsedObject;
  /** Size of the title. */
  readonly titleSize?: string;
  /** Type of the topology map widget. */
  readonly type: 'topology_map' | UnparsedObject;
}

export interface TopologyRequest {
  /** Query to service-based topology data sources like the service map or data streams. */
  readonly query?: TopologyQuery;
  /** Widget request type. */
  readonly requestType?: 'topology' | UnparsedObject;
}

export interface TopologyQuery {
  /** Name of the data source */
  readonly dataSource?: 'data_streams' | 'service_map' | UnparsedObject;
  /** Your environment and primary tag (or * if enabled for your account). */
  readonly filters?: string[];
  /** Name of the service */
  readonly service?: string;
}

export interface WidgetLayout {
  /** The height of the widget. Should be a non-negative integer. */
  readonly height: number;
  /**
   * Whether the widget should be the first one on the second column in high density or not.
   * **Note**: Only for the **new dashboard layout** and only one widget in the dashboard should have this property set to `true`.
   */
  readonly isColumnBreak?: boolean;
  /** The width of the widget. Should be a non-negative integer. */
  readonly width: number;
  /** The position of the widget on the x (horizontal) axis. Should be a non-negative integer. */
  readonly x: number;
  /** The position of the widget on the y (vertical) axis. Should be a non-negative integer. */
  readonly y: number;
}

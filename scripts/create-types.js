const js = require('json-schema-to-typescript')
const camelcaseKeys = require('camelcase-keys')
const fs = require('fs')
const schema = JSON.parse(fs.readFileSync('./cf-schema/datadog-monitor-4.6.0.json').toString())

const convertedSchema = camelcaseKeys(schema, {
  deep: true,
  pascalCase: false,
})

// Definitions in the json schema type are types
convertedSchema.definitions = camelcaseKeys(convertedSchema.definitions, {
  deep: false,
  pascalCase: true
})

js.compile(convertedSchema, 'DatadogMonitorProps', {bannerComment: '// This file was autogenerated by `yarn create-typescript-types`. DO NOT MODIFY\n'})
  .then(ts => fs.writeFileSync('src/monitors/datadog-monitor-schema.ts',  ts))
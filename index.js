#!/usr/bin/env node

const program = require('commander')
const { run } = require('./lib/commandRunner')

function collect (val, memo) {
  memo.push(val)
  return memo
}

program.version(require('./package.json').version)

program
  .command('configure')
  .action(options => run('configure', options))

program
  .command('equalize-env')
  .option('-t, --resource-type <resourceType>', 'resource type')
  .option('-n, --resource-name <resourceName>', 'resource name')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('--ignore <ignoredNamespace>', 'namespaces to ignore', collect, [])
  .option('--output-missing-vars [outputMissingVars]', 'display all the missing variables')
  .option('--store-resource-dumps [storeResourceDumps]', 'store the generated resource dumps')
  .action(options => run('equalizeEnv', options))

program
  .command('set-env')
  .option('-t, --resource-type <resourceType>', 'resource type')
  .option('-n, --resource-name <resourceName>', 'resource name')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('--ignore <ignoredNamespace>', 'namespaces to ignore', collect, [])
  .option('-v, --variable <variable>', 'variable with name and value', collect, [])
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .action(options => run('setEnv', options))

program
  .command('instantiate')
  .option('-t, --resource-type <resourceType>', 'resource type')
  .option('-n, --resources-names <resourcesNames>', 'resources names', collect, [])
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('--ignore <ignoredNamespace>', 'namespaces to ignore', collect, [])
  .option('-s, --source-ref [sourceRef]', 'tag/branch/commit hash from Git')
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .action(options => run('instantiate', options))

program
  .command('update-resource')
  .option('-t, --resource-type <resourceType>', 'resource type')
  .option('-n, --resources-names <resourcesNames>', 'resources names', collect, [])
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('--ignore <ignoredNamespace>', 'namespaces to ignore', collect, [])
  .option('-p, --property-path <propertyPath>', 'the path of the property that you want to add/replace')
  .option('-f, --filename <filename>', 'YAML file')
  .option('--filter-path <filterPath>', 'path to filter')
  .option('--filter-term <filterTerm>', 'term to filter')
  .option('--update-only', 'do not create new nodes, only update')
  .option('--ignore-path <ignorePath>', 'paths to ignore', collect, [])
  .action(options => run('updateResource', options))

program
  .command('scale')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('-n, --resources-names <resourcesNames>', 'resources names', collect, [])
  .option('--ignore <ignoredNamespace>', 'namespaces to ignore', collect, [])
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .option('--replicas <replicas>', 'number of replicas')
  .action(options => run('scale', options))

program
  .command('check-source-refs')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('-n, --resources-names <resourcesNames>', 'resources names', collect, [])
  .option('--ignore <ignoredNamespace>', 'namespaces to ignore', collect, [])
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .option('--repeat <repeat>', 'repeat every X seconds')
  .action(options => run('checkSourceRefs', options))

program
  .command('membership')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('--user <user>', 'user name')
  .option('--role <role>', 'project role')
  .option('--revoke', 'revoke permission')
  .action(options => run('membership', options))

program
  .command('check-resources')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('-n, --resources-names <resourcesNames>', 'resources names', collect, [])
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .action(options => run('checkResources', options))

program
  .command('check-env')
  .option('-t, --resource-type <resourceType>', 'resource type')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('-v, --variable <variable>', 'variable (value)', collect, [])
  .option('--search-by-value', 'search by value instead of name')
  .option('--whole-word', 'search for the exact term')
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .action(options => run('checkEnv', options))

program
  .command('check-route')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('--hostname <hostname>', 'hostname')
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .action(options => run('checkRoute', options))

program
  .command('export-resources')
  .option('-r, --namespace-regex <namespaceRegex>', 'regular expression to filter the namespace')
  .option('-n, --resources-names <resourcesNames>', 'resources names', collect, [])
  .option('--environment-alias <environmentAlias>', 'environment alias')
  .action(options => run('exportResources', options))

program.parse(process.argv)

if (!program.args.length) program.outputHelp()

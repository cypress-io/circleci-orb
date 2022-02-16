// documents orb usage examples
// grabs examples from orb.yml itself and generates markdown

import { safeDump } from 'js-yaml'
import json2md from 'json2md'
import { example, getOrb, normalizeString } from '../scripts/utils'
import { symmetricDifference } from 'ramda'
import chalk from 'chalk'

const orb = getOrb()
const examples = orb.examples

const exampleTitles = {
  simple: 'installs NPM dependencies and runs Cypress tests',
  'component-tests':
    'installs NPM dependencies and runs Cypress component tests',
  recording: 'Runs all Cypress tests and records them on the Cypress Dashboard',
  'parallel-on-2-machines':
    'Runs all Cypress tests by load balancing them on two machines',
  yarn: 'install dependencies using Yarn',
  'custom-install': 'install dependencies using any command',
  'custom-verify': 'use custom command to verify Cypress',
  'custom-cache-key':
    'apply custom key for npm install (or yarn install) cache',
  'using-node14': 'running tests using Node 14',
  chrome: 'running tests using Chrome browser',
  'start-server': 'start server before running tests',
  'wait-for-server-to-respond':
    'wait for server to respond before starting tests',
  'build-app': 'build application after install',
  groups: 'running several groups of tests',
  release: 'running another job after tests',
  'linux-and-mac': 'building using orb on Mac and Linux',
  'custom-executor': 'use custom executor',
  'env-vars': 'set additional environment variables',
  'install-private-npm-modules': 'install private NPM dependencies',
  'store-test-reports': 'store test reports on Circle',
  artifacts: 'store screenshots and videos on Circle',
  'any-artifacts': 'store other folders as artifacts on Circle',
  'custom-command': 'use a custom command to launch tests',
  'custom-command-prefix': 'prefix default test command',
  'no-workspace':
    'faster for a single cypress/run job without saving workspace',
  'private-npm-module': 'complete NPM module publishing example',
  'custom-directory': 'run commands in a subfolder of a monorepo',
  'custom-cache-and-directory': 'use custom cache key in a monorepo situation',
  'print-info': 'Run "cypress info" command after install',
  'install-extra-tool':
    'run commands after installing NPM modules but before caching',
  config: 'pass additional config parameter via --config argument',
  'config-file': 'custom configuration file',
  env: 'Passing values via --env CLI argument',
  tags: 'tag recorded run',
  'attach-workspace':
    'attaches the workspace assuming previous job has installed it',
  'run-tasks-post-checkout':
    'perform steps after code checkout but before installing dependencies',
  'run-on-master-branch': 'run different tests depending on the branch',
  debug: 'turn on specific DEBUG logs',
  'custom-build-id':
    'Using custom ci-build-id parameter to tie jobs into a logical run',
}

// we want to make sure all orb examples are represented in the object above
// and appear in the generated Markdown in the above order
const checkExamples = () => {
  const knownNames = Object.keys(exampleTitles)
  const examplesNames = Object.keys(examples)
  const unknownNames = symmetricDifference(knownNames, examplesNames)
  if (unknownNames.length) {
    console.error('Hmm, I see example names that are different')
    console.error(unknownNames.map((name) => chalk.red(name)).join('\n'))
    console.error(
      'Check orb.yml examples and scripts/examples.ts to resolve the lists',
    )
    throw new Error('example names do not match')
  }
}
checkExamples()

const getToc = () => {
  const knownNames = Object.keys(exampleTitles)

  const items = knownNames.map((name) => {
    const description = exampleTitles[name]
    return `[${name}](#${name}) - ${description}`
  })
  return { ul: items }
}

const docExample = (name: string, example: example) => {
  const usage = safeDump(example.usage).trim()
  const codeExample = {
    code: {
      language: 'yaml',
      content: usage.split('\n'),
    },
  }
  // console.log(codeExample)
  return [
    { h2: name },
    { p: normalizeString(example.description) },
    codeExample,
  ]
}

const getExampleFragments = () => {
  // use order we have defined, but check that all examples match
  checkExamples()

  const knownNames = Object.keys(exampleTitles)
  const fragments = knownNames.map((name) => {
    return docExample(name, orb.examples[name])
  })
  return fragments
}

const header = {
  h1: 'Examples',
}

const toc = getToc()

const contents = []
  .concat(header)
  .concat(toc)
  .concat(...getExampleFragments())
// console.log(contents)

const md = json2md(contents)
console.log(md)

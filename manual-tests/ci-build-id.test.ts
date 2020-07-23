import test from 'ava'
import { stripIndent } from 'common-tags'
import yaml from 'js-yaml'
import { find } from 'ramda'
import debugApi from 'debug'
import { effectiveConfig, extractCypressRun } from '../scripts/utils'

const debug = debugApi('test')

test('ci-build-id using commit SHA env variable', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              record: true
              parallel: true
              ci-build-id: testing-commit-$\{CIRCLE_SHA1\}
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  if (debug.enabled) {
    debug('effective config')
    console.error(result)
  }

  const runTestsStep = extractCypressRun(result)
  debug('run test step: %o', runTestsStep)
  const runCommand = runTestsStep.command
  t.is(typeof runCommand, 'string')

  t.snapshot(runCommand, 'has no quotes around commit sha')
})

import test from 'ava'
import { stripIndent } from 'common-tags'
import debugApi from 'debug'
import { effectiveConfig, extractCypressRun } from '../scripts/utils'

const debug = debugApi('test')

test('config parameter', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              config: pageLoadTimeout=100000,watchForFileChanges=false
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

  debug('run command: %s', runCommand)
  t.snapshot(runCommand, 'passing config options')
})

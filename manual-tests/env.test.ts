import test from 'ava'
import { stripIndent } from 'common-tags'
import debugApi from 'debug'
import { effectiveConfig, extractCypressRun } from '../scripts/utils'

const debug = debugApi('test')

test('env parameter', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              env: foo=bar,baz=qux
  `

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
  t.snapshot(runCommand, 'passing env values')
})

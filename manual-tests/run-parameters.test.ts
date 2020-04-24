import test from 'ava'
import { stripIndent } from 'common-tags'
import yaml from 'js-yaml'
import {find} from 'ramda'
import debugApi from 'debug'
import { effectiveConfig } from '../scripts/utils'

const debug = debugApi('test')

test('timeout parameter', async t => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              timeout: 15m
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  if (debug.enabled) {
    debug('effective config')
    console.error(result)
  }
  const parsed = yaml.safeLoad(result)
  debug('parsed %o', parsed)

  const isRunStep = (step) => step.run && step.run.name === 'Run Cypress tests'
  const runTestsStep = find(isRunStep)(parsed.jobs['cypress/run'].steps)
  debug('found run step %o', runTestsStep)
  t.snapshot(runTestsStep, 'must have no_output_timeout of 15 minutes')
})

import test from 'ava'
import { stripIndent } from 'common-tags'
import yaml from 'js-yaml'
import { find } from 'ramda'
import debugApi from 'debug'
import { effectiveConfig } from '../scripts/utils'

const debug = debugApi('test')

test('timeout parameter', async (t) => {
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

test('timeout parameter with custom command', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              timeout: 15m
              command: npm run e2e
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  if (debug.enabled) {
    debug('effective config')
    console.error(result)
  }
  const parsed = yaml.safeLoad(result)
  debug('parsed %o', parsed)

  const isRunStep = (step) => step.run && step.run.command === 'npm run e2e'
  const runTestsStep = find(isRunStep)(parsed.jobs['cypress/run'].steps)
  debug('found run step %o', runTestsStep)
  t.snapshot(runTestsStep, 'must have no_output_timeout of 15 minutes')
})

test('command-prefix parameter', async (t) => {
  const commandPrefix = 'npx percy exec --'
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              command-prefix: ${commandPrefix}
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  if (debug.enabled) {
    debug('effective config')
    console.error(result)
  }
  const parsed = yaml.safeLoad(result)
  debug('parsed %o', parsed)

  const isRunStep = (step) =>
    step.run && step.run.command === `${commandPrefix} cypress run`
  const runTestsStep = find(isRunStep)(parsed.jobs['cypress/run'].steps)
  debug('found run step %o', runTestsStep)
  t.snapshot(runTestsStep, 'must have prefixed test command')
})

test('should ignore command-prefix parameter if custom command parameter is provided', async (t) => {
  const customCommand = 'echo hello && npx cypress run'
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              command: ${customCommand} 
              command-prefix: npx percy exec -- 
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  if (debug.enabled) {
    debug('effective config')
    console.error(result)
  }
  const parsed = yaml.safeLoad(result)
  debug('parsed %o', parsed)

  const isRunStep = (step) => step.run && step.run.command === customCommand
  const runTestsStep = find(isRunStep)(parsed.jobs['cypress/run'].steps)
  debug('found run step %o', runTestsStep)
  t.snapshot(runTestsStep, 'custom command overrides prefixed test command')
})

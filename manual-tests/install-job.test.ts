import test from 'ava'
import { stripIndent } from 'common-tags'
import { effectiveConfig, extractBuildStep } from '../scripts/utils'

test('install job', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'with no parameters')
})

test('install job 2', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install:
              yarn: true
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'with yarn true')
})

test('install job 3', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install:
              install-command: 'my own install command'
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'using custom install command')
})

test('use custom verify command', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install:
              install-command: 'my own install command'
              verify-command: 'my own verify command'
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'using custom verify command')
})

test('install with build command uses working directory', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install:
              working_directory: examples/subfolder
              build: npm run build
  `
  t.is(typeof workflows, 'string')
  const yml = await effectiveConfig(workflows)

  const buildStep = extractBuildStep(yml, 'cypress/install')
  t.deepEqual(
    buildStep,
    {
      name: 'Build',
      command: 'npm run build',
      working_directory: 'examples/subfolder',
    },
    'build step has the working directory',
  )
})

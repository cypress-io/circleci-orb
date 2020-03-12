import test from 'ava'
import { stripIndent } from 'common-tags'
import { effectiveConfig } from '../scripts/utils'

test('install job', async t => {
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

test('install job 2', async t => {
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

test('install job 3', async t => {
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

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

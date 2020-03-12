import test from 'ava'
import { stripIndent } from 'common-tags'
import { effectiveConfig } from '../scripts/utils'

test('install', async t => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'install job with no parameters')
})

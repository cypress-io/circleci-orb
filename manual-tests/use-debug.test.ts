import test from 'ava'
import { stripIndent } from 'common-tags'
import { effectiveConfig } from '../scripts/utils'
import os from 'os'

test('exports DEBUG variable', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              debug: cypress:cli
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)

  // we are only interested in the start of the steps
  const start = 'steps:' + os.EOL
  const from = result.indexOf(start) + start.length
  t.true(from > 0, 'found steps')
  const to = result.indexOf('- attach_workspace:' + os.EOL, from)
  t.true(to > from, 'found attach workspace')
  const fragment = result.substr(from, to - from)
  const withoutIndent = stripIndent(fragment)
  t.snapshot(withoutIndent, 'sets DEBUG to value')
})

test('does not export DEBUG variable', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)

  // we are only interested in the start of the steps
  const start = 'steps:' + os.EOL
  const from = result.indexOf(start) + start.length
  t.true(from > 0, 'found steps')
  const to = result.indexOf('- attach_workspace:' + os.EOL, from)
  t.true(to > from, 'found attach workspace')
  const fragment = result.substr(from, to - from)
  const withoutIndent = stripIndent(fragment)
  t.snapshot(withoutIndent, 'no custom DEBUG variable')
})

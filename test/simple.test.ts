import test from 'ava'
import { stripIndent } from 'common-tags'
import { processWorkflows } from './utils'

test('simple', t => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run
  `
  t.is(typeof workflows, 'string')
  return processWorkflows(workflows)
})

test('simple with record', t => {
  t.plan(0)
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              record: true
  `
  return processWorkflows(workflows)
})

test('parallel 2 machines', t => {
  t.plan(0)
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/install
          - cypress/run:
              requires:
                - cypress/install
              record: true
              parallel: true
              parallelism: 2
              group: "2 machines"
  `
  return processWorkflows(workflows)
})

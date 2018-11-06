import test from 'ava'
import { stripIndent } from 'common-tags'
import * as execa from 'execa'
import { readFileSync } from 'fs'
import { safeDump, safeLoad } from 'js-yaml'
import { join } from 'path'
import * as tempWrite from 'temp-write'

const orbFilename = join(__dirname, '..', 'orb.yml')
const orb = safeLoad(readFileSync(orbFilename, 'utf-8'))

const validate = (filename: string): Promise<void> => {
  const cmd = `circleci config validate ${filename}`
  return execa.shell(cmd, { stdio: 'inherit' })
}

const inlineOrb = (workflows: string): string => {
  const intro = stripIndent`
    version: 2.1
    orbs:
      cypress: cypress-io/cypress@1.0.0
  `
  const config = intro + '\n' + workflows
  const yaml = safeLoad(config)
  yaml.orbs.cypress = orb
  const inlined = safeDump(yaml)
  return inlined
}

const processWorkflows = (workflows: string): Promise<any> => {
  const inlined = inlineOrb(workflows)
  const filename = tempWrite.sync(inlined, 'config.yml')
  return validate(filename)
}

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

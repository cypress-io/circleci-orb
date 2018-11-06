import test from 'ava';
import { stripIndent } from 'common-tags';
import * as execa from 'execa';
import { readFileSync } from 'fs';
import { safeDump, safeLoad } from 'js-yaml';
import { join } from 'path';
import * as tempWrite from 'temp-write';

const orbFilename = join(__dirname, '..', 'orb.yml')
const orb = safeLoad(readFileSync(orbFilename, 'utf-8'))

const validate = (filename: string):Promise<void> => {
  const cmd = `circleci config validate ${filename}`
  return execa.shell(cmd, {stdio: 'inherit'})
}

const inlineOrb = (config:string):string => {
  const yaml = safeLoad(config)
  yaml.orbs.cypress = orb
  const inlined = safeDump(yaml)
  return inlined
}

test('simple', t => {
  const config = stripIndent`
    # simple example workflow
    version: 2.1
    orbs:
      cypress: cypress-io/cypress@1.0.0
    workflows:
      build:
        jobs:
          - cypress/run
  `
  t.is(typeof config, 'string')
  const inlined = inlineOrb(config)
  const filename = tempWrite.sync(inlined, 'config.yml')
  return validate(filename)
})

test('simple with record', t => {
  const config = stripIndent`
    # record test results on dashboard
    version: 2.1
    orbs:
      cypress: cypress-io/cypress@1.0.0
    workflows:
      build:
        jobs:
          - cypress/run:
              record: true
  `
  t.is(typeof config, 'string')
  const inlined = inlineOrb(config)
  const filename = tempWrite.sync(inlined, 'config.yml')
  return validate(filename)
})

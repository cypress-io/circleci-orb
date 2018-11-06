// @ts-check
import { stripIndent } from 'common-tags'
import * as execa from 'execa'
import { readFileSync } from 'fs'
import { safeDump, safeLoad } from 'js-yaml'
import { join } from 'path'
import * as tempWrite from 'temp-write'

export type example = {
  description: string
  usage: {
    workflows: string
  }
}

type orb = {
  examples: {
    [key: string]: example
  }
}

export const getOrb = (): orb => {
  const orbFilename = join(__dirname, '..', 'orb.yml')
  const orb = safeLoad(readFileSync(orbFilename, 'utf-8'))
  return orb
}

const validate = (filename: string): Promise<void> => {
  const cmd = `circleci config validate ${filename}`
  return execa.shell(cmd, { stdio: 'inherit' })
}

const inlineOrb = (workflows: string): string => {
  const orb = getOrb()
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

export const processWorkflows = (workflows: string): Promise<any> => {
  const inlined = inlineOrb(workflows)
  const filename = tempWrite.sync(inlined, 'config.yml')
  return validate(filename)
}

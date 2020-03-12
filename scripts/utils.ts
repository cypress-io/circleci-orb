// @ts-check
import { stripIndent } from 'common-tags'
import execa from 'execa'
import { readFileSync } from 'fs'
import { safeDump, safeLoad } from 'js-yaml'
import * as tempWrite from 'temp-write'
import { join } from 'path'
import { prop, split, filter, startsWith, join as joinStrings } from 'ramda'
import os from 'os'

const isComment = s => !startsWith('# ', s)

const computeEffectiveConfig = async (filename: string) => {
  return execa('circleci', ['config', 'process', filename])
    .then(prop('stdout'))
    .then(split(os.EOL))
    .then(filter(isComment))
    .then(joinStrings(os.EOL))
}

export type example = {
  description: string
  usage: {
    jobs?: string
    workflows: string
    executors?: string
  }
}

export type parameter = {
  type: string
  description: string
  default?: string | number | boolean
}

export type parallelism = string

export type parameters = {
  [key: string]: parameter
}

export type job = {
  description: string
  parameters: parameters
  executor: string
  parallelism: parallelism
}

export type executor = {
  description: string
  docker: [
    {
      image: string
    }
  ]
}

type orb = {
  examples: {
    [key: string]: example
  }
  jobs: {
    [key: string]: job
  }
  executors: {
    [key: string]: executor
  }
}

export const normalizeString = (fromYaml: string): string =>
  fromYaml.replace(/\n/g, ' ')

export const getOrb = (): orb => {
  const orbFilename = join(__dirname, '..', 'src', 'orb.yml')
  const orb = safeLoad(readFileSync(orbFilename, 'utf-8'))
  return orb
}

const validate = async (filename: string): Promise<void> => {
  await execa('circleci', ['config', 'validate', filename], { stdio: 'inherit' })
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

export const effectiveConfig = (workflows: string): Promise<any> => {
  const inlined = inlineOrb(workflows)
  const filename = tempWrite.sync(inlined, 'config.yml')
  return computeEffectiveConfig(filename)
}

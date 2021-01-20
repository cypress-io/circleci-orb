// @ts-check
import { stripIndent } from 'common-tags'
import execa from 'execa'
import { readFileSync } from 'fs'
import { safeDump, safeLoad } from 'js-yaml'
import * as tempWrite from 'temp-write'
import { join } from 'path'
import {
  find,
  prop,
  split,
  filter,
  startsWith,
  join as joinStrings,
} from 'ramda'
import os from 'os'
import yaml from 'js-yaml'
import debugApi from 'debug'

const debug = debugApi('test')

const isComment = (s) => !startsWith('# ', s)

const computeEffectiveConfig = async (filename: string): Promise<string> => {
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
    },
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
  await execa('circleci', ['config', 'validate', filename], {
    stdio: 'inherit',
  })
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
  return computeEffectiveConfig(filename).then((s) => {
    // special handling for test run command that includes a few empty escaped newlines
    // to get each 'command: "npx cypress run\\\\n \\\\n"' into
    // 'command: "npx cypress run"
    const lines = s
      .split(os.EOL)
      .map((line) => {
        if (/\s+command: "/.test(line)) {
          return line.replace(/"npx .+"/, (match) => {
            return match
              .replace(/\\\\\\n/g, '')
              .replace(/\s+/g, ' ')
              .trim()
              .replace(' "', '"')
          })
        } else {
          return line
        }
      })
      .join(os.EOL)

    return lines
  })
}

/**
 * Removes new lines in parsed run command
 */
export const removeNewLines = (runCommand: string) =>
  runCommand.replace(/\\\n/g, '').replace(/\s+/g, ' ').trim()

/**
 * Given Circle YML text finds the Cypress run command object.
 */
export const extractCypressRun = (circleText: string) => {
  const parsed = yaml.safeLoad(circleText)
  debug('parsed %o', parsed)

  const isRunStep = (step) => step.run && step.run.name === 'Run Cypress tests'
  const runTestsStep = find(isRunStep)(parsed.jobs['cypress/run'].steps)
  debug('found run step %o', runTestsStep)

  runTestsStep.run.command = removeNewLines(runTestsStep.run.command)

  return runTestsStep.run
}

/**
 * Given Circle YML text finds the build command object.
 */
export const extractBuildStep = (
  circleText: string,
  jobName: string = 'cypress/run',
) => {
  const parsed = yaml.safeLoad(circleText)
  debug('parsed %o', parsed)

  const isBuildStep = (step) => step.run && step.run.name === 'Build'
  const found = find(isBuildStep)(parsed.jobs[jobName].steps)
  debug('found build step %o', found)

  found.run.command = removeNewLines(found.run.command)

  return found.run
}

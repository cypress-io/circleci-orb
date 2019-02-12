// documents orb usage examples
// grabs examples from orb.yml itself and generates markdown

import { safeDump } from 'js-yaml'
import * as json2md from 'json2md'
import { example, getOrb, normalizeString } from '../scripts/utils'
import {symmetricDifference} from 'ramda'

const orb = getOrb()
const examples = orb.examples

const exampleTitles = {
  simple: 'installs NPM dependencies and runs Cypress tests',
  recording: 'Runs all Cypress tests and records them on the Cypress Dashboard',
  'parallel-on-2-machines': 'Runs all Cypress tests by load balancing them on two machines',
  yarn: 'install dependencies using Yarn',
  'using-node6': 'running tests using Node 6',
  chrome: 'running tests using Chrome browser',
  'start-server': 'start server before running tests',
  'wait-for-server-to-respond': 'wait for server to respond before starting tests',
  'build-app': 'build application after install',
  groups: 'running several groups of tests',
  release: 'running another job after tests',
  'linux-and-mac': 'building using orb on Mac and Linux',
  'custom-executor': 'use custom executor',
  'env-vars': 'set additional environment variables',
  'install-private-npm-modules': 'install private NPM dependencies',
  'store-test-reports': 'store test reports on Circle',
  artifacts: 'store screenshots and videos on Cicle',
  'any-artifacts': 'store other folders as artifacts on Circle'
}

const getToc = () => {
  const knownNames = Object.keys(exampleTitles)
  const examplesNames = Object.keys(examples)
  const unknownNames = symmetricDifference(knownNames, examplesNames)
  if (unknownNames.length) {
    console.error('Hmm, I see example names that are different')
    console.error(unknownNames.join(', '))
    console.error('Check orb.yml examples and scripts/examples.ts to resolve the lists')
    throw new Error('example names do not match')
  }

  const items = knownNames.map(name => {
    const description = exampleTitles[name]
    return `[${name}](#${name}) - ${description}`
  })
  return {ul: items}
}

const docExample = (name: string, example: example) => {
  const usage = safeDump(example.usage)
  const codeExample = {
    code: {
      language: 'yaml',
      content: usage.split('\n'),
    },
  }
  // console.log(codeExample)
  return [
    { h2: name },
    { p: normalizeString(example.description) },
    codeExample,
  ]
}

const fragments = Object.keys(examples).map(name => {
  return docExample(name, orb.examples[name])
})

const header = {
  h1: 'Examples',
}

const toc = getToc()

const contents = [].concat(header).concat(toc).concat(...fragments)
// console.log(contents)

const md = json2md(contents)
console.log(md)

// documents orb usage examples
// grabs examples from orb.yml itself and generates markdown

import { safeDump } from 'js-yaml'
import * as json2md from 'json2md'
import { example, getOrb, normalizeString } from '../scripts/utils'

const orb = getOrb()
const examples = orb.examples

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
const contents = [].concat(header).concat(...fragments)
// console.log(contents)

const md = json2md(contents)
console.log(md)

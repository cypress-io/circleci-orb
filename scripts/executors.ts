// documents orb executors
// grabs them from from orb.yml and generates markdown

import { stripIndent } from 'common-tags'
import * as json2md from 'json2md'
import { executor, getOrb, normalizeString } from '../scripts/utils'

const orb = getOrb()

const docExecutor = (name: string, executor: executor) => {
  const image = executor.docker[0].image
  const list: object[] = [
    { h2: name },
    { p: normalizeString(executor.description) },
    { p: `Docker image: \`${image}\`` },
  ]
  return list
}

const executorNames = Object.keys(orb.executors)

const fragments = executorNames.map(name => {
  return docExecutor(name, orb.executors[name])
})

const header = {
  h1: 'Executors',
}
const description = {
  p: normalizeString(stripIndent`
    Docker images that jobs can use via \`executor\` parameter.
    Typically an image from [cypress-io/cypress-docker-images](https://github.com/cypress-io/cypress-docker-images)
  `),
}
const contents = []
  .concat(header)
  .concat(description)
  .concat(...fragments)
// console.error(contents)

const md = json2md(contents)
console.log(md)

// documents orb jobs
// grabs jobs from orb.yml itself and generates markdown

import { stripIndent } from 'common-tags'
import * as json2md from 'json2md'
import { getOrb, job, normalizeString, parameter } from '../scripts/utils'

const orb = getOrb()

const docParameters = (job: job) => {
  const names = Object.keys(job.parameters).sort()
  return names.map(name => {
    const parameter: parameter = job.parameters[name]
    const list = [
      {
        p: `**\`${name}\`**`,
      },
      {
        blockquote: parameter.description.trim(),
      },
      {
        p: `type: ${parameter.type}`,
      },
    ]
    if ('default' in parameter && parameter.default !== '') {
      list.push({
        p: `default: \`${parameter.default}\``,
      })
    }
    return list
  })
}

const docJob = (name: string, job: job) => {
  const list: object[] = [{ h2: name }, { p: normalizeString(job.description) }]
  const parameters = docParameters(job)
  return list.concat(...parameters)
}

// control the order of jobs to document
// because "run" is the most important command
const jobNames = ['run', 'install']

const fragments = jobNames.map(name => {
  return docJob(name, orb.jobs[name])
})

const header = {
  h1: 'Jobs',
}
const description = {
  p: normalizeString(stripIndent`
    Public jobs defined in this orb that your config workflow can use.
    See [examples.md](./examples.md)
  `),
}

const getJobContents = (name: string, job: job) => {
  return {
    ul: [{
      p: name
    }]
  }
}

const toLink = (name) => `[${name}](#${name})`

const getToc = () => {
  const toc = {ul: []}
  jobNames.forEach(name => {
    toc.ul.push(toLink(name))
    const job: job = orb.jobs[name]
    const params = {ul: []}
    Object.keys(job.parameters).forEach(name => {
      params.ul.push(name)
    })
    toc.ul.push(params)
  })
  return toc
}

const contents = []
  .concat(header)
  .concat(description)
  .concat(getToc())
  .concat(...fragments)
// console.error(contents)

const md = json2md(contents)
console.log(md)

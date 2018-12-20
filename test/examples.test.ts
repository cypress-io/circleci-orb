// @ts-check
import test from 'ava-ts'
import { safeDump } from 'js-yaml'
import { getOrb, processWorkflows } from '../scripts/utils'

const orb = getOrb()
const exampleNames = Object.keys(orb.examples)
exampleNames.forEach(name => {
  const example = orb.examples[name]
  test(name, t => {
    t.plan(0)
    const jobs = example.usage.jobs
    const workflows = example.usage.workflows
    const executors = example.usage.executors
    const output = { workflows }
    if (jobs) {
      //@ts-ignore
      output.jobs = jobs
    }
    if (executors) {
      //@ts-ignore
      output.executors = executors
    }

    const text = safeDump(output)
    // console.log(text)
    return processWorkflows(text)
  })
})

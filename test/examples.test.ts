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
    const workflows = example.usage.workflows
    const text = safeDump({ workflows })
    return processWorkflows(text)
  })
})

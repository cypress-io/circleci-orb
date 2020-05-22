import test from 'ava'
import { stripIndent } from 'common-tags'
import { effectiveConfig } from '../scripts/utils'

// https://github.com/cypress-io/circleci-orb/issues/265
test('store video and screenshots in working directory', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              working_directory: path/to/subfolder
              store_artifacts: true
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)

  // we are only interested in some lines, not entire config
  const storeArtifactsAt = result.search(/\n\s+- store_artifacts:/)
  t.true(storeArtifactsAt > 20, 'cannot find store artifacts')
  const workflowsAt = result.indexOf('workflows:', storeArtifactsAt)
  t.true(workflowsAt > 0, 'cannot find workflows')

  const fragment = result.slice(storeArtifactsAt, workflowsAt)
  // fragment should include "path/to/subfolder" prefix
  t.snapshot(fragment, 'store artifacts fragment')
})

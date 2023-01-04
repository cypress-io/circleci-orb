# Cypress CircleCI Orb

The Cypress CircleCI Orb is a piece of configuration set in your `circle.yml` file to correctly install, cache and run [Cypress.io](https://cypress.io) tests on CircleCI with very little effort. See this orb in [CircleCI Registry](https://circleci.com/orbs/registry/orb/cypress-io/cypress)

## Example
```yml
# to use orbs, must use version >= 2.1
version: 2.1
orbs:
    # import Cypress orb by specifying an exact version x.y.z
    # or the latest version 3.x.x using "@3" syntax
    cypress: cypress-io/cypress@3
workflows:
    build:
        jobs:
            # "cypress" is the name of the imported orb
            # run is the name of the job defined in Cypress orb
            - cypress/run
```
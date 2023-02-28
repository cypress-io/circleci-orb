# Cypress CircleCI Orb [![CircleCI](https://circleci.com/gh/cypress-io/circleci-orb.svg?style=svg)](https://circleci.com/gh/cypress-io/circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/cypress-io/cypress.svg)](https://circleci.com/developer/orbs/orb/cypress-io/cypress) [![renovate-app badge][renovate-badge]][renovate-app] [![GitHub license](https://img.shields.io/github/license/cypress-io/circleci-orb?logo=license)](https://github.com/cypress-io/circleci-orb/blob/master/LICENSE.md)

## About

The [Cypress CircleCI Orb](https://github.com/cypress-io/circleci-orb) is a
piece of configuration set in your `.circleci/config.yml` file to correctly
install, cache and run Cypress with very little effort.

💡 In CircleCI, a **Job** is a collection of steps to carry out an action. A **Command** defines a sequence of steps as a map to be executed in a job. **Executors** define the underlying technology to run a job. Below are all of these options that will allow you to run your Cypress tests with an out-of-the-box or customized configuration.

For the Orb Quick Start Guide and usage cases, view the CircleCI
[Cypress orb documentation](https://circleci.com/developer/orbs/orb/cypress-io/cypress).
## How to enable

**Note:** To use CircleCI Orbs in your projects, you need to enable some settings:

From organization settings allow using uncertified orbs `Settings -> Security -> Allow uncertified orbs`

See the official [CircleCI documentation](https://circleci.com/docs/2.0/using-orbs/).

---

## Jobs

### _run_

A complete job to run Cypress tests in your application. This is the out-of-the-box solution that will work for most use cases.

#### Basic Setup

A typical project can have:

```yaml
version: 2.1
orbs:
  # "cypress-io/cypress@3" installs the latest published
  # version "s.x.y" of the orb. We recommend you then use
  # the strict explicit version "cypress-io/cypress@3.x.y"
  # to lock the version and prevent unexpected CI changes
  cypress: cypress-io/cypress@3
workflows:
  build:
    jobs:
      - cypress/run # "run" job comes from "Cypress" orb
          start-command: 'npm run start'
```

By using the `run` job definitions that Cypress provides inside the orb, it
brings simplicity and static checks of parameters to your CircleCI
configuration.

You can find more usage examples at
[our official orb page](https://circleci.com/developer/orbs/orb/cypress-io/cypress).

#### Arguments

You can pass arguments to the `cypress/run` job to override any default behaviors. See the [full list of arguments](https://circleci.com/developer/orbs/orb/cypress-io/cypress#jobs-run).
## Parallelization

A more complex project that needs to install dependencies 
and run tests across 4 CI machines [in parallel](https://docs.cypress.io/guides/guides/parallelization)
may have:

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
workflows:
  build:
    jobs:
      - cypress/run:
          # split specs across machines
          # record results with Cypress Cloud
          cypress-command: 'npx cypress run --parallel --record'
          start-command: 'npm run start'
          parallelism: 4 # use 4 CircleCI machines to finish quickly
```
**Note:** recording test results and spec parallelization requires [Cypress Cloud](https://on.cypress.io/dashboard-introduction) account. You should also set your [record key](https://on.cypress.io/projects#Record-key) as `CYPRESS_RECORD_KEY` environment variable in the CircleCI project.

### ⚠️ Usage and Consumption

There are 2 key metrics to understand when running a CI job across multiple
machines:
- **Consumption time** on CircleCI 
- **Actual time** it takes for tests to run

**Consumption time** is essentially the amount of CircleCI resources that a job requires
to execute. For example, you may have a job that runs on 5 machines and takes 1 minute
for all to complete. In this example it would only take 1 minute of **actual time** to execute
all the jobs but would **consume** 5 minutes of CircleCI resources. 

The Cypress CircleCI Orb
was designed to be as simple and fast as possible for the majority of use cases.
If you are running your tests in parallel across more than 5
machines, you may _not_ want to use the `cypress/run` job directly as it will consume
more CircleCI resources than are necessary.

> **Parallelization Across 5+ Machines**
>
> To lower your consumption time when running in parallel on more than 5 machines,
> see [this example](https://circleci.com/developer/orbs/orb/cypress-io/cypress#usage-commands). 
>
> Here we use the `cypress/install` and
> `cypress/run-tests` commands separately to first install dependencies to a workspace and then run tests in parallel. 

## Commands

### _install_

Command that installs your application's node modules and Cypress dependencies.

> ⚠️ Note: this command is only necessary if you plan to execute the `run` command later. Especially if you run the tests on multiple machines in parallel.

#### Arguments

You can pass arguments to the `cypress/install` command to override any default behaviors. See the [full list of arguments](https://circleci.com/developer/orbs/orb/cypress-io/cypress#commands-install).

### _run-tests_

Command that runs Cypress tests (assuming your machine has already installed
necessary dependencies).

#### Arguments

You can pass arguments to the `cypress/run-tests` command to override any default behaviors. See the [full list of arguments](https://circleci.com/developer/orbs/orb/cypress-io/cypress#commands-run-tests).

## Executors

A single Docker container used to run Cypress tests. This executor extends the [circleci/browser-tools orb](https://circleci.com/developer/orbs/orb/circleci/browser-tools).

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
executor: cypress/default
jobs:
  - cypress/run:
```

You can also use your own executor by passing in your own Docker image. See the full list of Cypress images on [Docker Hub](https://hub.docker.com/r/cypress/browsers/tags), or compose your own image with the [Cypress Docker Factory](https://github.com/cypress-io/cypress-docker-images#cypressfactory).

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
executor:
  docker:
    image: cypress/browsers:node-16.18.1-chrome-109.0.5414.74-1-ff-109.0-edge-109.0.1518.52-1 # your Docker image here
jobs:
  - cypress/run:
```

## Examples

#### Example using the `cypress/default` executor with `cypress/install` and `cypress/run-tests` commands:

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
jobs:
  install:
    executor: cypress/default
    steps:
      - cypress/install:
          install-browsers: true
      - persist_to_workspace:
          root: ~/
          paths:
            - .cache/Cypress
            - project
  run-tests:
    executor: cypress/default
    parallelism: 10
    steps:
      - run: echo "This step assumes dependencies were installed using the cypress/install job"
      - attach_workspace:
          at: ~/
      - cypress/run-tests:
          cypress-command: 'npx cypress run --parallel --record'
          start-command: 'npm run start'
```

---

## Additional Info

### Effective config

If you install [CircleCI local CLI](https://circleci.com/docs/local-cli/), you can see the final _effective_ configuration your project resolves to by running `circleci config process <config filename>` from the terminal.

### Versions

Cypress orb is _versioned_ so you can be sure that the configuration will _not_ suddenly change as we change orb commands. We follow semantic versioning to make sure you can upgrade project configuration to minor and patch versions without breaking changes.

You can find all changes and published orb versions for Cypress orb at [cypress-io/circleci-orb/releases](https://github.com/cypress-io/circleci-orb/releases).

We are using `cypress-io/cypress@3` version in our examples, so you get the latest published orb version 3.x.x. But we recommend locking it down to an exact version to prevent unexpected changes from suddenly breaking your builds.

### License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
[local-cli]: https://circleci.com/docs/2.0/local-cli/
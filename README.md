# Cypress CircleCI Orb

The [Cypress CircleCI Orb](https://github.com/cypress-io/circleci-orb) is a
piece of configuration set in your `.circleci/config.yml` file to correctly
install, cache and run Cypress with very little effort.

For the Orb Quick Start Guide and usage cases, view the CircleCI
[Cypress orb documentation](https://circleci.com/developer/orbs/orb/cypress-io/cypress).

---

## How to enable

**Note ⚠️:** To use CircleCI Orbs in your projects, you need to enable two settings:

- From organization settings allow using uncertified orbs `Settings -> Security -> Allow uncertified orbs`
- From the project's settings allow beta features `Settings -> Advanced Settings -> Enable pipelines`

See the official [CircleCI documentation](https://circleci.com/docs/2.0/using-orbs/).

---

In CircleCi, a "job" is just a collection of steps to carry out an action and a "command" defines a sequence of steps as a map to be executed in a job."

Below are the jobs and commands that will allow you to run your Cypress tests with an out-of-the-box or customized configuration.

## Jobs

### run

A single, complete job to run Cypress tests in your application. This is the out-of-the-box solution that will work for most use-cases.

## Basic Setup

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
```

By using the `run` job definitions that Cypress provides inside the orb, it
brings simplicity and static checks of parameters to your CircleCI
configuration.

You can find multiple examples at
[our official orb page](https://circleci.com/developer/orbs/orb/cypress-io/cypress)

### Arguments

You can pass arguments to the `cypress/run` job to override any default behaviors.

**install-command** **_(String)_**

Overrides the default NPM command (npm ci)

**post-install** **_(String)_**

Additional command(s) to run after running install but before verifying Cypress
and caching.

**cypress-cache-key** **_(String)_**

Cache key used to cache the Cypress binary.

> The default value is `cypress-cache-{{ arch }}-{{ checksum: "package.json" }}`

**cypress-cache-path** **_(String)_**

By, default, this will cache the `~/.cache/Cypress` directory so that the
Cypress binary is cached. You can override this by providing your own cache path.

**node-cache-version** **_(String)_**

Used to change the default node cache version (v1) if you need to clear this
cache for any reason.

**include-branch-in-node-cache-key** **_(String)_**

If true, the node cache will only apply to jobs within the same branch.
The default is set to false so the node cache will persist across jobs and branches
as long as the `package.json` file has not been changed. If you want each PR to create a new
cache of your dependencies than you can set this to true.

**working-directory** **_(String)_**

Directory containing the `package.json` file. Used primarily for those using
monorepos or your cypress tests aren't at the root of the repository.

**package-manager** **_(Enum)_**

Select the default node package manager to use. NPM v5+ required.

> Available values include: `npm` (default), `yarn`, or `yarn-berry`

**start-command** **_(String)_**

Command used to start your local dev server for Cypress to test against.

**cypress-command** **_(String)_**

Command used to run your Cypress tests, including any flags you want to use.

**parallelism** **_(Integer)_**

Number of Circle machines to use for load balancing, min 1 (requires `parallel`
and `record` flags in your `cypress-command`). Defaults to 1.

**install-browsers** **_(Boolean)_**

Cypress uses Electron by default to run your tests.
This flag used to install additional browsers to run your tests. This is only needed
if you are passing the `--browser` flag in your `cypress-command`.
Enabling this command will use the [CircleCI Browser Tools Orb](https://circleci.com/developer/orbs/orb/circleci/browser-tools)
to install the Chrome and Firefox binaries at runtime. If you need additional
browser support (example: `edge`), you can leave this flag as false and make
sure you use an executor with a docker image that includes the browsers of your
choosing. See
[https://hub.docker.com/r/cypress/browsers/tags](https://hub.docker.com/r/cypress/browsers/tags).

## Parallelization

A more complex project that needs to install dependencies, build an application
and run tests across 4 CI machines [in parallel](/guides/guides/parallelization)
may have:

> Note: `--parallel` flag tells Cypress to run tests in parallel. `parallelism` parameter tells Circle to run across `n` number of machines.`

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
workflows:
  build:
    jobs:
      - cypress/run:
          cypress-command: "npx cypress run --record --parallel"
          start-command: "npm start"
          parallelism: 4
```

### Consumption

There are 2 key metrics to understand when running a CI job across multiple
machines, **consumption time** and the actual time it takes for **tests to run**.
Consumption time is essentually the amount of CircleCI resources that a job requires
to execute. For example, you may have a job that runs on 5 machines and takes 1 minute
for all to complete. In this example it would only take 1 minute of actual time to execute
all the jobs but would consume 5 minutes of CircleCI resources. The Cypress CircleCI Orb
was designed to be as simple and fast as possible for the majority of use cases.
This means that if you are running your tests in parallel across more than 5
machines, then you may _not_ want to use the `cypress/run` job as it will consume
more CircleCI resources than are necessary.

> **Parallelization Across More Than 5 Machines**
>
> To lower your consumption time when running in parallel on more than 5 machines,
> see [this example](https://circleci.com/developer/orbs/orb/cypress-io/cypress#usage-commands) using the `cypress/install` and
> `cypress/run-tests` commands.

## Commands

### install

Command that installs your application's node modules and Cypress dependencies.

### run-tests

Command that runs Cypress tests (assuming your machine has already installed
necessary dependencies)

## Executors

A single Docker container used to run Cypress tests. This executor extends the [circleci/browser-tools orb](https://circleci.com/developer/orbs/orb/circleci/browser-tools).

### Arguments

#### **node-version** **_(String)_**

The version of Node to run your tests with.

> Defaults to "16.16"

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
jobs:
  install:
    docker:
      - image: cypress/browsers:node-16.18.1-chrome-109.0.5414.74-1-ff-109.0-edge-109.0.1518.52-1 # your Docker image here
```

You can also use your own executor by passing in your own Docker image. See our full list of images on [Docker Hub](https://hub.docker.com/r/cypress/browsers/tags), or feel free to compose your own image and use as part of the workflow.

## Examples

#### Example using `cypress/install` and `cypress/run-tests` commands:

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
      - run: echo "This step assumes dependencies were isntalled using the
          cypress/install job"
      - attach_workspace:
          at: ~/
      - cypress/run-tests:
          cypress-command: "npx cypress run --parallel --record --group Chrome --browser chrome"
          start-command: "npm run start"
      - cypress/run-tests:
          cypress-command:
            "npx cypress run --parallel --record --group Firefox --browser
            firefox"
          start-command: "npm run start"
```

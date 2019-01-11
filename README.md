# Cypress CircleCI Orb [![CircleCI](https://circleci.com/gh/cypress-io/circleci-orb.svg?style=svg)](https://circleci.com/gh/cypress-io/circleci-orb) [![renovate-app badge][renovate-badge]][renovate-app]

The Cypress CircleCI Orb is a piece of configuration set in your `circle.yml` file to correctly install, cache and run [Cypress.io](https://www.cypress.io) tests on [CircleCI](https://circleci.com) with very little effort.

**Note ⚠️:** To use CircleCI Orbs in your projects, you need to enable two settings:

- from organization settings allow using uncertified orbs `Settings -> Security -> Allow uncertified orbs`
- from the project's settings allow beta features `Settings -> Advanced Settings -> Enable build processing (preview)`

See the official [CircleCI documentation](https://circleci.com/docs/2.0/using-orbs/).

## Examples

Each example below should be placed into `circle.yml` or `.circleci/config.yml` file

### simple

Install dependencies (using `npm ci`) and run all Cypress tests:

```yaml
# to use orbs, must use version >= 2.1
version: 2.1
orbs:
  # import Cypress orb by specifying an exact version
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      # "cypress" is the name of the imported orb
      # "run" is the name of the job defined in Cypress orb
      - cypress/run
```

### record on Dashboard

Runs all Cypress tests and records them on the Cypress Dashboard

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      - cypress/run:
          record: true
```

### parallel

A more complex project that needs to install dependencies, build an application and run tests across 10 CI machines [in parallel](https://on.cypress.io/parallelization) may have:

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      # first get the source code and install npm dependencies
      - cypress/install:
          # run a custom app build step
          build: 'npm run build'
      - cypress/run:
          # make sure app has been installed and built
          # before running tests across multiple machines
          # this avoids installing same dependencies 10 times
          requires:
            - cypress/install
          record: true # record results on Cypress Dashboard
          parallel: true # split all specs across machines
          parallelism: 10 # use 10 CircleCI machines to finish quickly
          group: 'all tests' # name this group "all tests" on the dashboard
          start: 'npm start' # start server before running tests
```

In all cases, you are using `run` and `install` job definitions that Cypress provides inside the orb. Using the orb brings simplicity and static checks of parameters to CircleCI configuration.

### other examples

- [install dependencies using Yarn](docs/examples.md#yarn)
- [running tests using Node 6](docs/examples.md#using-node6)
- [running tests using Chrome browser](docs/examples.md#chrome)
- [start server before running tests](docs/examples.md#start-server)
- [wait for server to respond before starting tests](docs/examples.md#wait-for-server-to-respond)
- [parallel run across two machines](docs/examples.md#parallel-on-2-machines)
- [build application after install](docs/examples.md#build-app)
- [running several groups of tests](docs/examples.md#groups)
- [running another job after tests](docs/examples.md#release)
- [building using orb on Mac and Linux](docs/examples.md#linux-and-mac)
- [use any executor](docs/examples.md#custom-executor)
- [set additional environment variables](docs/examples.md#env-vars)

All examples are in [docs/examples.md](docs/examples.md) and are generated from the [src/orb.yml](src/orb.yml) file.

Also take a look at [cypress-io/cypress-example-circleci-orb](https://github.com/cypress-io/cypress-example-circleci-orb) and [cypress-io/cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink/pull/148/files).

## Jobs and executors

See [docs/jobs.md](docs/jobs.md) and [docs/executors.md](docs/executors.md) for a full list of public jobs and executors that this orb provides.

The CircleCI Orb exports the following job definitions to be used by the user projects:

### `run`

This job allows you to run Cypress tests on a one or more machines, record screenshots and videos, use the custom Docker image, etc.

A typical example:

```yaml
# to use orbs, must use version >= 2.1
version: 2.1
orbs:
  # import Cypress orb by specifying an exact version
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      # checks out code, installs npm dependencies
      # and runs all Cypress tests and records results on Cypress Dashboard
      # cypress/run job comes from "cypress" orb imported above
      - cypress/run:
          record: true
```

See all its parameters at the [cypress/run job example](docs/jobs.md#run)

### `install`

⚠️ Warning: this job is only necessary if you plan to execute the `run` job later. If you only want to run all tests on a single machine, then you do not need a separate `install` job.

Sometimes you need to install the project's npm dependencies and build the application _once_ before running tests, especially if you run the tests on multiple machines in parallel. For example:

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      # install dependencies first (on 1 machine)
      - cypress/install
      # now run tests
      - cypress/run:
          # give this job a custom name for clarity
          name: 'end-to-end tests'
          requires:
            # use previously installed dependencies
            # to avoid installing them on each machine running tests
            - cypress/install
          record: true # record results to Cypress Dashboard
          parallel: true # run tests in parallel
          parallelism: 3 # use 3 CircleCI machines
          group: 3 machines # name this group "3 machines"
```

See available parameters at the [cypress/install job example](docs/jobs.md#install).

To better understand why we use a separate `install` job, take a look at the workflow diagram below.

![Workflow](img/install-and-run-3x.png)

The first job `install` runs on a single machine, and usually is very fast because it uses previously cached npm modules and Cypress binary to avoid reinstalling them. The second job `run` can run on multiple machines (in this case it runs on 3 machines), and uses workspace created by the `install` job to get 3 identical file systems before running tests. You can see the 3 parallel runs by clicking on the `run` job.

![3 parallel jobs](img/run-3x.png)

## Versions

Cypress orb is _versioned_ so you can be sure that the configuration will _not_ suddenly change as we change orb commands. We follow semantic versioning to make sure you can upgrade project configuration to minor and patch versions without breaking changes.

You can find all changes and published orb versions at [cypress-io/circleci-orb/releases](https://github.com/cypress-io/circleci-orb/releases).

## Effective config

If you install [Circle local CLI][local-cli], you can see the final _effective_ configuration your project resolves to by running `circleci config process <config filename>` from the terminal.

For example, if your current CircleCI configuration file is `.circleci/config.yml` and it contains the following:

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      - cypress/run
```

The fully resolved configuration will show:

```shell
$ circleci config process .circleci/config.yml
# Orb 'cypress-io/cypress@1.1.0' resolved to 'cypress-io/cypress@1.1.0'
version: 2
jobs:
  cypress/run:
    docker:
    - image: cypress/base:10
    parallelism: 1
    steps:
    - checkout
    - restore_cache:
        keys:
        - cache-{{ .Branch }}-{{ checksum "package.json" }}
    - run:
        name: Npm CI
        command: npm ci
    - run:
        command: npx cypress verify
    - save_cache:
        key: cache-{{ .Branch }}-{{ checksum "package.json" }}
        paths:
        - ~/.npm
        - ~/.cache
    - persist_to_workspace:
        root: ~/
        paths:
        - project
        - .cache/Cypress
    - attach_workspace:
        at: ~/
    - run:
        name: Run Cypress tests
        command: 'npx cypress run'
workflows:
  build:
    jobs:
    - cypress/run
  version: 2
```

### Ejecting

If you want to customize the orb configuration, you can save and tweak the output of the `circleci config process ...` to suit your needs.

⚠️ Warning: there is no automated way to go from the "ejected" configuration back to using the orb.

## Development

If you want to develop this orb and publish new versions, see our [Contributing Guide](CONTRIBUTING.md).

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
[local-cli]: https://circleci.com/docs/2.0/local-cli/

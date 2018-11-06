# Cypress CircleCI Orb

> Run your Cypress.io end-to-end browser tests without spending time configuring CircleCI. This orb can also record results on the Cypress Dashboard and load balance tests in parallel mode.

## Basic example

Checks out code, install dependencies (using `npm ci`) and runs all Cypress tests

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
workflows:
  build:
    jobs:
      - cypress/run
```

## Examples

See [examples.md](examples.md) that are auto-generated from [orb.yml](orb.yml) itself. Also take a look at [cypress-io/cypress-example-circleci-orb](https://github.com/cypress-io/cypress-example-circleci-orb) and [cypress-io/cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink/pull/148/files)

## Jobs and executors

See [jobs.md](jobs.md) and [executors.md](executors.md) for all public jobs and executors that this orb provides.

## Effective config

From the user project, you can see fully resolved `circle.yml` code by running Circle CLI command

```
$ circleci config process .circleci/config.yml
# Orb 'cypress/cypress@1.0.0' resolved to 'cypress/cypress@1.0.0'
version: 2
jobs:
  cypress/run:
    docker:
    - image: cypress/base:10
    parallelism: 1
...
```

If the jobs provided by this orb are not enough, save the full config as the new `circle.yml` file and tweak it to better suit your needs.

## Source code

See [orb.yml](orb.yml)

## Development

If you want to develop this orb and publish new versions, see [contributors.md](contributors.md)

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

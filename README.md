# Cypress CircleCI Orb

> Run your Cypress.io end-to-end browser tests without spending time configuring CircleCI. This orb can also record results on the Cypress Dashboard and load balance tests in parallel mode.

## Example

You can find examples inside the [orb.yml](orb.yml) itself

### Single machine

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

### Recording on Dashboard

Runs on single machine and records test artifacts on Cypress Dashboard. Please set `CYPRESS_RECORD_KEY` environment variable on CI.

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
workflows:
  build:
    jobs:
      - cypress/run:
          record: true
```

### Parallel

Load balances tests across 4 machines and records test artifacts on Cypress Dashboard. Please set `CYPRESS_RECORD_KEY` environment variable on CI.

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
workflows:
  build:
    jobs:
      - cypress/install
      - cypress/run:
          requires:
            - cypress/install
          record: true        # parallel run requires recording
          parallel: true      # load balanced mode
          parallelism: 4      # use 4 machines
          group: "4 machines" # optional group name
```

## Source code

See [orb.yml](orb.yml)

## Namespace

This orb is part of `cypress-io` namespace, same as Cypress.io GitHub organization name.

## Development

There are scripts for creating namespace, orbs, etc in `package.json`. They all start with `orb:` prefix, use `npm run` to view them. Usually you need to only run `npm run orb:publish` to publish new version of the orb.

## Publishing

You can see existing orbs

```shell
$ circleci orb list cypress-io
```

You can publish new orb version manually, by incrementing version for example

```shell
$ circleci orb publish increment orb.yml cypress-io/cypress patch
Orb `cypress-io/cypress` has been incremented to `cypress-op/cypress@1.0.2`.
Please note that this is an open orb and is world-readable.
```

or by specifying new version

```shell
circleci orb publish orb.yml cypress-io/cypress@0.0.1
```

but the better way is to let the [publish.js](publish.js) increment the version, tag the commit and publish the orb.

```shell
npm run orb:publish
```

Uses [simple semantic commit convention](https://github.com/bahmutov/simple-commit-message), just prefix your commits

```text
major: breaking change
minor: new feature added
fix: a patch release
```

Note: you can publish temporary version of the orb using `dev` label. This is super useful for testing the orb in child projects before publishing an official immutable version. For example:

```
circleci orb publish orb.yml cypress-io/cypress@dev:1.1.0
```

## Demo project

Use [cypress-io/circleci-orb-test](https://github.com/cypress-io/circleci-orb-test) to see this orb in action. Note that you can define examples right [inside the orb](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/usage-examples.md). See `examples:` section in [orb.yml](orb.yml) file.

## Additional information

- https://github.com/CircleCI-Public/circleci-orbs
- [Orb configuration](https://github.com/CircleCI-Public/config-preview-sdk/tree/master/docs)
- [Authoring orbs](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/orbs-authoring.md)
- [Testing orbs](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/orbs-testing.md)

## Examples of orbs

- https://github.com/CircleCI-Public/circleci-orbs/blob/master/src/rollbar/orb.yml
- https://github.com/CircleCI-Public/circleci-orbs/blob/master/src/codecov/orb.yml
- https://github.com/CircleCI-Public/circleci-orbs/blob/master/src/heroku/orb.yml

# Cypress CircleCI Orb

> Run your Cypress.io end-to-end browser tests without spending time configuring CircleCI. This orb can also record results on the Cypress Dashboard and load balance tests in parallel mode.

## Example

### Single machine

Checks out code, install dependencies (using `npm ci`) and runs all Cypress tests

```yaml
version: 2.1
orbs:
  cypress: cypress/cypress@dev:0.0.1
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
  cypress: cypress/cypress@dev:0.0.1
workflows:
  build:
    jobs:
      - cypress/run
          record: true
```

### Parallel

Load balances tests across 4 machines and records test artifacts on Cypress Dashboard. Please set `CYPRESS_RECORD_KEY` environment variable on CI.

```yaml
version: 2.1
orbs:
  cypress: cypress/cypress@dev:0.0.1
workflows:
  build:
    jobs:
      - cypress/install
      - cypress/run-4x:
          requires:
            - cypress/install
          group: "4 machines" # optional group name
```

There are jobs from `run-1x` to `run-10x`.

## Source code

See [orb.yml](orb.yml)

## Namespace

Each GitHub organization can have a single CircleCI namespace. In our case it is `cypress` but I am trying to rename it to `cypress-io` [see this issue](https://github.com/cypress-io/circleci-orb-test/issues/4)

## Development

There are scripts for creating namespace, orbs, etc in `package.json`. They all start with `orb:` prefix, use `npm run` to view them. Usually you need to only run `npm run orb:publish` to publish new version of the orb.

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

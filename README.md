# Cypress CircleCI Orb

> Run your Cypress.io end-to-end browser tests without spending time configuring CircleCI. This orb can also record results on the Cypress Dashboard and load balance tests in parallel mode.

## Examples

See [examples.md](examples.md) that are auto-generated from [orb.yml](orb.yml) itself.

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
          record: true # parallel run requires recording
          parallel: true # load balanced mode
          parallelism: 4 # use 4 machines
          group: '4 machines' # optional group name
```

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

## Namespace

This orb is part of `cypress-io` namespace, same as Cypress.io GitHub organization name.

## Development

If you want to develop this orb and publish new versions, see [contributors.md](contributors.md)

## Demo project

Use [cypress-io/cypress-example-circleci-orb](https://github.com/cypress-io/cypress-example-circleci-orb) to see this orb in action, also see [cypress-io/cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink/pull/148/files)

Note that you can define examples right [inside the orb](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/usage-examples.md). See `examples:` section in [orb.yml](orb.yml) file.

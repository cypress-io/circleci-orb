# Cypress CircleCI Orb

> Run your Cypress.io end-to-end browser tests without spending time configuring CircleCI. This orb can also record results on the Cypress Dashboard and load balance tests in parallel mode.

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

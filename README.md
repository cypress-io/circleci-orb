# Cypress CircleCI Orb

See [orb.yml](orb.yml)

## Namespace

Each GitHub organization can have a single CircleCI namespace. In our case it is `cypress` but I am trying to rename it to `cypress-io` [see this issue](https://github.com/cypress-io/circleci-orb-test/issues/4)

## Development

There are scripts for creating namespace, orbs, etc in `package.json`. They all start with `orb:` prefix, use `npm run` to view them. Usually you need to only run `npm run orb:publish` to publish new version of the orb.

## Demo project

Use [cypress-io/circleci-orb-test](https://github.com/cypress-io/circleci-orb-test) to see this orb in action.

## Additional information

- https://github.com/CircleCI-Public/circleci-orbs
- https://github.com/CircleCI-Public/config-preview-sdk/tree/master/docs
- [Testing orbs](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/orbs-testing.md)

## Development

In the 'package.json', there are scripts for creating namespaces, orbs, etc. They all start with an `orb:` prefix. Use `npm run` to view them. Usually you need to only run `npm run orb:publish` to publish a new version of the orb.

## Examples

The more examples, the better. All examples in `docs/examples.md` are generated automatically from `src/orb.yml` source code via `npm run docs`. To make sure the examples referenced from the [README.md](README.md) list are correct, the list of links is checked in [scripts/examples.ts](scripts/examples.ts) file.

## Publishing

To see existing orbs:

```shell
$ circleci orb list cypress-io
```

### Commits

Use [simple semantic commit convention](https://github.com/bahmutov/simple-commit-message), just prefix your commits:

```text
major: breaking change
minor: new feature added
fix: a patch release
```

### Development

You can publish a [dev version](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/orbs-authoring.md) of the orb for testing before publishing a production immutable version. For example, to publish version `1.0.0-my-fork`, run:

```shell
node ./scripts/publish --dev 1.0.0-my-fork
```

You can first do a dry dev publish to see the command with:

```shell
node ./scripts/publish --dev 1.0.0-my-fork --dry
```

Note: you can publish a temporary version of the orb using the `dev` label. This is super useful for testing the orb in child projects before publishing an official immutable version. For example:

```
circleci orb publish src/orb.yml cypress-io/cypress@dev:1.1.0
```

It is a good idea to test a dev version of the orb first using [cypress-io/cypress-example-circleci-orb](https://github.com/cypress-io/cypress-example-circleci-orb) before publishing new public version.

### Testing

Because we need to see the effective config for a few basic orb uses, please install [CircleCI CLI tool][circleci-cli] and run the following tests before committing.

```shell
npm run manual:tests
```

If you want to run a single test file

```shell
npx ava-ts manual-tests/<filename>.ts
```

Any changes that modify the effective configs will probably not match previously saved snapshots.

### Production

You can publish a new orb version manually, by incrementing the version. For example:

```shell
$ circleci orb publish increment src/orb.yml cypress-io/cypress patch
Orb `cypress-io/cypress` has been incremented to `cypress-op/cypress@1.0.2`.
Please note that this is an open orb and is world-readable.
```

Or by specifying new version:

```shell
circleci orb publish src/orb.yml cypress-io/cypress@0.0.1
```

The better way is to let the [publish.js](publish.js) increment the version, tag the commit and publish the orb.

```shell
npm run orb:publish
```

After publishing, the `package.json` file will have new version (if any). A new git tag will be created and you should push the updated code and tag to GitHub

```shell
git push --tag
```

After pushing, go to [GitHub releases](https://github.com/cypress-io/circleci-orb/releases) and update notes for the new release.

## Additional information

- https://github.com/CircleCI-Public/circleci-orbs
- [Orb configuration](https://github.com/CircleCI-Public/config-preview-sdk/tree/master/docs)
- [Authoring orbs](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/orbs-authoring.md)
- [Testing orbs](https://github.com/CircleCI-Public/config-preview-sdk/blob/master/docs/orbs-testing.md)

## Examples of orbs

- https://github.com/CircleCI-Public/circleci-orbs/blob/master/src/rollbar/orb.yml
- https://github.com/CircleCI-Public/circleci-orbs/blob/master/src/codecov/orb.yml
- https://github.com/CircleCI-Public/circleci-orbs/blob/master/src/heroku/orb.yml

[circleci-cli]: https://circleci.com/docs/2.0/orb-author-cli/#authoring-an-orb---circleci-cli

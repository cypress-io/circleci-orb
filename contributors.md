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

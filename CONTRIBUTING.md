# Contributing Guide

This repo leverages the CircleCI _orb-tools_ orb as part of the [Orb Development Kit](https://circleci.com/docs/2.0/orb-author/#orb-development-kit). It provides a full suite of jobs for packing, validating, reviewing, and testing and deploying the orb to the orb registry.

## Development

The repo provides a subset of the orb-tools orb jobs and scripts can be ran locally. It is useful to be able to lint, shellcheck, and review your orbs locally, before committing. With this setup, it is possible to test your code locally, but integration tests of the built orb will be ran on CircleCI.

**Note:** A dev build of the orb will be published as part of the `orb-tools/publish` job run on every commit. You can use it to test your changes during development. It is also used to do the integration tests as part of the `./.circleci/test-deploy.yml` workflow.

![Development Publish of the Orb](/assets//dev-publish-example.png)

### Installing CircleCI CLI

> The [CircleCI command line interface (CLI)](https://circleci-public.github.io/circleci-cli/) brings CircleCI's advanced and powerful tools to your > terminal. See [Installing the CircleCI local CLI](https://circleci.com/docs/local-cli/) for instructions on how to install it locally on your machine.

### Local Packing

All CircleCI orbs are single YAML files, typically named `orb.yml`. However, for development, it is often easier to break the code up into more manageable chunks. The `circleci orb pack` command, a component of the [orb development kit](https://circleci.com/docs/orb-development-kit/), is used to "pack" or condense the seprate YAML files together into a single `orb.yml` file.

```bash
circleci orb pack ./src
```

### Local Validating

Once the `orb.yml` file has been generate via _packing_ you can now validate the configuration using the CircleCI CLI.

```bash
circleci orb validate orb.yml
```

### Local Linting

The orb-tools `orb-tools/lint` job uses a utility [yamllint](https://yamllint.readthedocs.io/en/stable/), which can be downloaded and run locally, or you can invoke the job locally with the CircleCI CLI.

Assuming your `./circleci/config.yml` file appears similar to the one in this repository, you will have imported the orb-tools orb and defined the `orb-tools/lint` job in a workflow. Use the Circle CLI from this directory with the following command to locally lint your orb:

#### CircleCI Local Linting

```bash
circleci local execute --job orb-tools/lint
```

#### YamlLint Local Linting

```bash
yamllint ./src
```

**Local Shellcheck**
[Shellcheck](https://github.com/koalaman/shellcheck) is a static analysis tool for shell scripts, and haves like a linter for our shell scripts.

#### CircleCI Local Shellcheck

```bash
circleci local execute --job shellcheck/check
```

### Local Review

The `review` job is a suite of Bash unit tests written using [bats-core](https://github.com/bats-core/bats-core), a test automation framework for Bash. Each test focuses on checking for a best practice in the orb. The tests can be executed directly with the `bats` CLI, or you can invoke the job locally with the CircleCI CLI.

#### CircleCI Local Review

```bash
circleci local execute --job orb-tools/review
```

**Note**: You will _always_ see a failure at the end of this job when ran locally because the job contains a step to upload test results to CircleCI.com, which is _not_ supported in the local agent.

### Commits

Use [simple semantic commit convention](https://github.com/bahmutov/simple-commit-message), just prefix your commits:

```text
major: breaking change
minor: new feature added
fix: a patch release
```

### Production

<!-- TODO -->

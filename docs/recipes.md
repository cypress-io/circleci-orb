# Recipes

- [Install, test and release](#install-test-and-release)
- [Install, then run two different test jobs](#install-and-run-two-test-jobs)
- [Install dependencies using Yarn](#using-yarn)
- [Custom test command](#custom-test-command)
- [Service containers](#service-containers)
- [Windows](#windows)

## Install test and release

Imagine you would like to install dependencies, run Cypress tests, then publish a new version of your library to NPM. To avoid re-installing dependencies in every job, you can use the following recipe from [bahmutov/cypress-react-unit-test](https://github.com/bahmutov/cypress-react-unit-test). The `cypress/install` job builds the application and passes the entire workspace down to `cypress/run` jobs.

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      # install and cache dependencies in this job
      # AND build the library once
      # then the workspace will be passed to other jobs
      - cypress/install:
          name: Install
          build: npm run transpile

      # the test job automatically attaches the workspace
      # created by the install job, so it is ready to test
      - cypress/run:
          name: Test
          requires:
            - Install
          # notice a trick to avoid re-installing dependencies
          # in this job - a do-nothing "install-command" parameter
          install-command: echo 'Nothing to install in this job'
          # we are not going to use results from this job anywhere else
          no-workspace: true

      # this job attaches the workspace left by the install job
      # so it is ready to run Cypress tests
      # only we will run semantic release script instead
      - cypress/run:
          name: NPM release
          # we need newer Node for semantic release
          executor: cypress/base-12-6-0
          requires:
            - Install
            - Test
          install-command: echo 'Nothing to install in this job'
          no-workspace: true
          # instead of "cypress run" do NPM release 😁
          command: npm run semantic-release
```

The above workflow runs jobs sequentially on CircleCI

![Install test and release workflow](/img/release-workflow.png)

## Install and run two test jobs

If you want to run a single install job, then run two different unrelated test jobs, follow this recipe from [bahmutov/cy-api](https://github.com/bahmutov/cy-api). Each test job starts a local HTTP server, waits for the port 3000 to respond, then runs the Cypress tests.

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      # first, run a single job to install dependencies and Cypress
      # and perform a few more small steps like linting
      - cypress/install:
          name: Install
          post-steps:
            - run:
                name: Show info 📺
                command: npx cypress info
            # catch accidental "it.only" tests
            - run:
                name: Catch accidental "it.only" 🖐
                command: npm run stop-only

      # reuse the workspace from the install job
      # to run end-to-end tests in Electron browser
      - cypress/run:
          name: Electron test
          requires:
            - Install
          install-command: echo 'Nothing to install in this job'
          # to run tests, we need to start the web application
          start: npm start
          wait-on: 'http://localhost:3003'
          no-workspace: true

      # reuse the workspace from the install job
      # to run end-to-end tests in Firefox browser
      - cypress/run:
          name: Firefox test
          executor: cypress/browsers-chrome78-ff70
          requires:
            - Install
          install-command: echo 'Nothing to install in this job'
          # to run tests, we need to start the web application
          start: npm start
          wait-on: 'http://localhost:3003'
          # run tests using Firefox browser pre-installed in the executor image
          browser: firefox
          no-workspace: true

      # wait for all jobs to finish and possible run NPM release
      - cypress/run:
          name: NPM release
          requires:
            - Install
            - Electron test
            - Firefox test
          # nothing to install - cypress/install job does it
          # and nothing to pass to the next job
          install-command: echo 'Nothing to install in this job'
          no-workspace: true
          # instead of "cypress run" do NPM release 😁
          command: npm run semantic-release
```

![Run two test jobs after install](/img/two-test-jobs.png)

## Using Yarn

You can find a good example of using Yarn to install dependencies in [cypress-io/cypress-example-todomvc-redux](https://github.com/cypress-io/cypress-example-todomvc-redux) repository. Summary of details:

```yml
# see https://github.com/cypress-io/circleci-orb
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/install:
          name: Install
          yarn: true
          executor: cypress/base-12-14-0

      - cypress/run:
          name: full tests
          executor: cypress/base-12-14-0
          requires:
            - Install
          install-command: echo 'Nothing to install in this job'
          # more commands

      - cypress/run:
          name: component tests
          executor: cypress/base-12-14-0
          requires:
            - Install
          install-command: echo 'Nothing to install in this job'
          # more commands

      - cypress/run:
          name: smoke tests
          executor: cypress/base-12-14-0
          requires:
            - Install
          install-command: echo 'Nothing to install in this job'
          # we will only run smoke tests on master branch
          filters:
            branches:
              only:
                - master
          start: npm start
          command: NODE_ENV=test npx cypress run --config-file cypress-smoke.json
          no-workspace: true
```

![Yarn example](/img/yarn.png)

## Custom test command

You can use this orb to correctly install Cypress, but run your own test command using a specific version of Node 12 (via an executor). This recipe comes from [cypress-io/cypress-webpack-preprocessor](https://github.com/cypress-io/cypress-webpack-preprocessor) where we test how Cypress is compatible with the latest Webpack version.

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          executor: cypress/base-12-14-0
          yarn: true
          command: npm test
          post-steps:
            - run:
                name: Lint code 🧹
                command: npm run lint
            - run:
                name: Install latest webpack 📦
                command: yarn add -D webpack@latest webpack-cli@latest
            - run:
                name: Run tests w/ webpack@latest 🧪
                command: npm test
            - run:
                name: Semantic release 🚀
                command: npm run semantic-release
```

## Service containers

If your test container needs additional containers like a Postgres database, you can define a custom executor to be used with the orb's jobs. For example, the [bahmutov/hasura-example](https://github.com/bahmutov/hasura-example) spins the main test container and 2 service containers: one with Postgres database, another with Hasura GraphQL engine.

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
executors:
  pg-and-hasura:
    docker:
      - image: cypress/base:12.16.1
      - image:
          postgres:12
          # database env variables
      - image:
          hasura/graphql-engine:v1.1.1
          # hasura env variables
workflows:
  hasura_workflow:
    jobs:
      - cypress/run:
          executor: pg-and-hasura
          # runs Cypress tests
```

## Windows

You can use this orb with [CircleCI Windows](https://circleci.com/docs/2.0/hello-world-windows/) containers.

```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
  # for testing on Windows
  # https://circleci.com/docs/2.0/hello-world-windows/
  win: circleci/windows@1
workflows:
  build:
    jobs:
      - cypress/run:
          name: Windows test
          executor:
            # executor comes from the "windows" orb
            name: win/vs2019
            shell: bash.exe
          start: npm start
          # no need to save the workspace after this job
          no-workspace: true
```

See [cypress-example-todomvc](https://github.com/cypress-io/cypress-example-todomvc) for live example.

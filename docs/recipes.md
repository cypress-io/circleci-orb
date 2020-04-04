# Recipes

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

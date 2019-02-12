# Examples


 - [simple](#simple) - installs NPM dependencies and runs Cypress tests
 - [recording](#recording) - Runs all Cypress tests and records them on the Cypress Dashboard
 - [parallel-on-2-machines](#parallel-on-2-machines) - Runs all Cypress tests by load balancing them on two machines
 - [yarn](#yarn) - install dependencies using Yarn
 - [using-node6](#using-node6) - running tests using Node 6
 - [chrome](#chrome) - running tests using Chrome browser
 - [start-server](#start-server) - start server before running tests
 - [wait-for-server-to-respond](#wait-for-server-to-respond) - wait for server to respond before starting tests
 - [build-app](#build-app) - build application after install
 - [groups](#groups) - running several groups of tests
 - [release](#release) - running another job after tests
 - [linux-and-mac](#linux-and-mac) - building using orb on Mac and Linux
 - [custom-executor](#custom-executor) - use custom executor
 - [env-vars](#env-vars) - set additional environment variables
 - [install-private-npm-modules](#install-private-npm-modules) - install private NPM dependencies
 - [store-test-reports](#store-test-reports) - store test reports on Circle
 - [artifacts](#artifacts) - store screenshots and videos on Cicle
 - [any-artifacts](#any-artifacts) - store other folders as artifacts on Circle

## simple


Runs all Cypress tests without recording results on the Dashboard

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run

```

## yarn


Installs NPM dependencies using "yarn install --frozen-lockfile" command

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          yarn: true

```

## using-node6


Runs all Cypress tests on Node 6 image

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          executor: cypress/base-6

```

## recording


Runs all Cypress tests and records them on the Cypress Dashboard

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          record: true

```

## artifacts


Stores test screenshots and videos as CircleCI artifacts using "store_artifacts" job option. Note, this setting assumes the default Cypress folders for screenshots and videos. If you store screenshots and videos in custom folders, see "any-artifacts" example how to store arbitrary folders. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          store_artifacts: true

```

## any-artifacts


Stores additional folders like "mochawesome-report" as a CircleCI artifact

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          post-steps:
            - store_artifacts:
                path: mochawesome-report

```

## chrome


Runs tests using Chrome browser in custom executor (Cypress docker image)

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          executor: cypress/browsers-chrome69
          browser: chrome

```

## start-server


Starts server and then runs all Cypress tests

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start

```

## wait-for-server-to-respond


Starts server, waits for it to respond and then runs all Cypress tests. Uses `npx wait-on ...` command under the hood, see [wait-on](https://github.com/jeffbski/wait-on#readme). Note, if you are using Webpack server, it might not respond to the default HTTP OPTIONS request. In that case use `wait-on` to send `HTTP GET` request by using url `wait-on: 'http-get://localhost:....'`. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start
          wait-on: 'http://localhost:4200'

```

## parallel-on-2-machines


Runs all Cypress tests by load balancing them on two machines

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/install
      - cypress/run:
          requires:
            - cypress/install
          record: true
          parallel: true
          parallelism: 2
          group: 2 machines

```

## install-private-npm-modules


In this example, we write the NPM auth token before running "npm install" command. This allows us to install private NPM modules for example. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/install:
          pre-steps:
            - run: 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'
      - cypress/run:
          requires:
            - cypress/install

```

## build-app


Install dependencies and run custom build command on one machine. Then run on 3 machines tests in load balancing mode. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/install:
          build: npm run build
      - cypress/run:
          requires:
            - cypress/install
          record: true
          parallel: true
          parallelism: 3
          group: 3x

```

## groups


Runs all tests on 4 machines using Electron browser (default). Also runs some tests using "spec" parameter on Chrome browser. Records both groups on Cypress dashboard. Notice "name" under each "cypress/run" job which will be shown in the Circle workflow UI to tell jobs apart. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/install
      - cypress/run:
          name: 4 machines
          requires:
            - cypress/install
          record: true
          parallel: true
          parallelism: 4
          group: 4 machines
      - cypress/run:
          name: Chrome
          requires:
            - cypress/install
          executor: cypress/browsers-chrome69
          record: true
          parallel: true
          parallelism: 2
          group: smoke tests
          browser: chrome
          spec: cypress/integration/smoke/*

```

## release


If you want to run a job after running Cypress tests, you can reuse the workspace from the `cypress/run` job. For example, to run a semantic release script you could do the following 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
jobs:
  release:
    executor: cypress/base-10
    steps:
      - attach_workspace:
          at: ~/
      - run: npm run semantic-release
workflows:
  build:
    jobs:
      - cypress/install
      - cypress/run:
          requires:
            - cypress/install
      - release:
          requires:
            - cypress/run

```

## linux-and-mac


Runs tests on Linux and on Mac via two jobs. Note how the user defines and uses own executor "mac" 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
executors:
  mac:
    macos:
      xcode: 10.1.0
workflows:
  build:
    jobs:
      - cypress/run:
          name: Linux test
      - cypress/run:
          name: Mac test
          executor: mac

```

## custom-executor


Use any executor to run the job defined by the orb. Assumes the executor has all OS dependencies necessary to run Cypress. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
executors:
  with-chrome:
    docker:
      - image: 'cypress/browsers:chrome69'
workflows:
  build:
    jobs:
      - cypress/run:
          executor: with-chrome

```

## store-test-reports


Stores test results using post-steps parameter, see https://on.cypress.io/reporters, assumes that reports are saved in folder "cypress/results" 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          post-steps:
            - store_test_results:
                path: cypress/results

```

## env-vars


Set environment variables when running the job using executor.

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1
executors:
  base10-foo-bar:
    docker:
      - image: 'cypress/base:10'
    environment:
      FOO: foo
      BAR: bar
workflows:
  build:
    jobs:
      - cypress/run:
          executor: base10-foo-bar

```


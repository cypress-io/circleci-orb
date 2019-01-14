# Examples

## simple


Runs all Cypress tests without recording results on the Dashboard

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      - cypress/run

```

## yarn


Installs NPM dependencies using "yarn install" command

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.4.0
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
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      - cypress/run:
          record: true

```

## artifacts


Stores test screenshots and videos as CircleCI artifacts

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.2.0
workflows:
  build:
    jobs:
      - cypress/run:
          store_artifacts: true

```

## chrome


Runs tests using Chrome browser in custom executor (Cypress docker image)

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.1.0
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start

```

## wait-for-server-to-respond


Starts server, waits for it to respond and then runs all Cypress tests. Uses `npx wait-on ...` command under the hood, see [wait-on](https://github.com/jeffbski/wait-on#readme) 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.4.0
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
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.1.0
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
  cypress: cypress-io/cypress@1.3.0
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
  cypress: cypress-io/cypress@1.3.0
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

## env-vars


Set environment variables when running the job using executor.

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.3.0
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


# Examples

## simple


Runs all Cypress tests without recording results on the Dashboard

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
workflows:
  build:
    jobs:
      - cypress/run

```

## using-node6


Runs all Cypress tests on Node 6 image

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
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
  cypress: cypress-io/cypress@1.0.0
workflows:
  build:
    jobs:
      - cypress/run:
          record: true

```

## chrome


Runs tests using Chrome browser in custom executor (Cypress docker image)

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
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
  cypress: cypress-io/cypress@1.0.0
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start

```

## parallel-on-2-machines


Runs all Cypress tests by load balancing them on two machines

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
          record: true
          parallel: true
          parallelism: 2
          group: 2 machines

```

## build-app


Install dependencies and run custom build command on one machine. Then run on 3 machines tests in load balancing mode. 

```yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@1.0.0
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


# Executors


Docker images that jobs can use via `executor` parameter. Typically an image from [cypress-io/cypress-docker-images](https://github.com/cypress-io/cypress-docker-images)

## default


Single Docker container with Cypress dependencies, see https://github.com/cypress-io/cypress-docker-images/tree/master/base 


Docker image: `cypress/base:<< parameters.node >>`

## base-6


Single Docker container with Node 6 and Cypress dependencies


Docker image: `cypress/base:6`

## base-8


Single Docker container with Node 8 and Cypress dependencies


Docker image: `cypress/base:8`

## base-10


Single Docker container with Node 10 and Cypress dependencies, pointing at the Docker image `cypress/base:10` tag. Use example: `executor: cypress/base-10`. 


Docker image: `cypress/base:10`

## base-10-22-0


Single Docker container pointing at the immutable `cypress/base:10.22.0` image. 


Docker image: `cypress/base:10.22.0`

## base-12-6-0


Single Docker container with Node 12.6.0 and Cypress dependencies Use example: `executor: cypress/base-12-6-0`. 


Docker image: `cypress/base:12.6.0`

## base-12-14-0


Single Docker container with Node 12.14.0 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-12-14-0`. 


Docker image: `cypress/base:12.14.0`

## base-12-16-1


Single Docker container with Node 12.16.1 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-12-16-1`. 


Docker image: `cypress/base:12.16.1`

## base-12-18-3


Single Docker container with Node 12.18.3 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-12-18-3`. 


Docker image: `cypress/base:12.18.3`

## base-12


Single Docker container with the latest Node v12 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-12`. 


Docker image: `cypress/base:12`

## base-14-0-0


Single Docker container with Node 14.0.0 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-14-0-0`. 


Docker image: `cypress/base:14.0.0`

## base-14-7-0


Single Docker container with Node 14.7.0 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-14-7-0`. 


Docker image: `cypress/base:14.7.0`

## base-14


Single Docker container with the latest Node v14 and Cypress dependencies see https://github.com/cypress-io/cypress-docker-images/tree/master/base. Use example: `executor: cypress/base-14`. 


Docker image: `cypress/base:14`

## browsers-chrome69


Docker container with Node 10, Cypress dependencies and Chrome 69


Docker image: `cypress/browsers:chrome69`

## browsers-chrome73


Docker container with Node 11.13.0, Cypress dependencies and Chrome 73


Docker image: `cypress/browsers:node11.13.0-chrome73`

## browsers-chrome74


Docker container with Node 10.1.2, Cypress dependencies and Chrome 74


Docker image: `cypress/browsers:node10.2.1-chrome74`

## browsers-chrome75


Docker container with Node 12.6.0, Cypress dependencies and Chrome 75


Docker image: `cypress/browsers:node12.6.0-chrome75`

## browsers-chrome76


Docker container with Node 10.16.0, Cypress dependencies and Chrome 76


Docker image: `cypress/browsers:node10.16.0-chrome76`

## browsers-chrome77


Docker container with Node 12.6.0, Cypress dependencies and Chrome 77


Docker image: `cypress/browsers:node12.6.0-chrome77`

## browsers-chrome78-ff70


Docker container with Node 12.13.0, Cypress dependencies and Chrome 78 and Firefox 70. Use example: `executor: cypress/browsers-chrome78-ff70`. 


Docker image: `cypress/browsers:node12.13.0-chrome78-ff70`

## browsers-chrome73-ff68


Docker container with Node 12.0.0, Cypress dependencies, Chrome 73 and Firefox 68.0.2


Docker image: `cypress/browsers:node12.0.0-chrome73-ff68`


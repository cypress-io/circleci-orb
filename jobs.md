# Jobs


Public jobs defined in this orb that your config workflow can use. See [examples.md](./examples.md)

## run


A single complete job to run Cypress end-to-end tests in your project. If recording on the Dashboard, set `CYPRESS_RECORD_KEY` environment variable


**`browser`**

> Browser to use to run end-to-end tests. Typically "electron" (default) or "chrome".
> See https://on.cypress.io/launching-browsers


type: string


**`build`**

> Custom build command to run after install


type: string


**`command`**

> Custom test command to run Cypress tests


type: string


**`executor`**

> Cypress executor to use


type: executor


default: `cypress/base-10`


**`group`**

> Test group name when recording on the dashboard


type: string


default: `default group`


**`parallel`**

> Use test balancing using Cypress Dashboard
> see https://on.cypress.io/parallelization


type: boolean


default: `false`


**`parallelism`**

> Number of Circle machines to use for load balancing, min 1
> (requires "parallel" parameter set to true)


type: integer


default: `1`


**`record`**

> Record results on Cypress Dashboard, see https://on.cypress.io/dashboard-service


type: boolean


default: `false`


**`spec`**

> Spec pattern to use to run only some test files


type: string


**`start`**

> Optional server start command to run in the background before running Cypress tests


type: string

## install


Checks out code, installs dependencies, attaches code to the workspace


**`build`**

> Custom build command to run after install


type: string


**`executor`**

> Cypress executor to use


type: executor


default: `cypress/base-10`


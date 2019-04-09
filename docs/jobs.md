# Jobs


Public jobs defined in this orb that your config workflow can use. See [examples.md](./examples.md)


 - [run](#run)
     - executor
     - record
     - parallel
     - parallelism
     - group
     - build
     - start
     - wait-on
     - browser
     - spec
     - command
     - store_artifacts
     - yarn
     - cache-key
    
 - [install](#install)
     - executor
     - build
     - yarn
    

## run


A single complete job to run Cypress end-to-end tests in your project. If recording on the Dashboard, set `CYPRESS_RECORD_KEY` environment variable


**`browser`**

> Browser to use to run end-to-end tests. Typically "electron" (default) or "chrome".
> See https://on.cypress.io/launching-browsers, requires using executor with the browser installed,
> electron browser is already included with Cypress.


type: string


**`build`**

> Custom build command to run after install


type: string


**`cache-key`**

> Npm cache key


type: string


default: `cache-{{ arch }}-{{ .Branch }}-{{ checksum "package.json" }}`


**`command`**

> Custom test command to run Cypress tests, which overrides all individual options.


type: string


**`executor`**

> Cypress executor to use, see [executors.md](executors.md).


type: executor


default: `base-10`


**`group`**

> Test group name when recording on the dashboard. Requires `record: true`


type: string


**`parallel`**

> Use test balancing using Cypress Dashboard,
> see https://on.cypress.io/parallelization. Requires `record: true`


type: boolean


default: `false`


**`parallelism`**

> Number of Circle machines to use for load balancing, min 1
> (requires "parallel" parameter set to true, and requires `record: true`)


type: integer


default: `1`


**`record`**

> Record results on Cypress Dashboard, see https://on.cypress.io/dashboard-service.
> This option is necessary to enable other related flags, like `parallel` and `group`.


type: boolean


default: `false`


**`spec`**

> Spec pattern to use to run only some test files.


type: string


**`start`**

> Optional server start command to run in the background before running Cypress tests


type: string


**`store_artifacts`**

> Store Cypress-generated screenshots and videos as CircleCI test artifacts.
> See https://circleci.com/docs/2.0/artifacts/


type: boolean


default: `false`


**`wait-on`**

> Optional url check using `wait-on` utility. Useful to delay tests until server boots and responds.
> Example:
>   wait-on: "http://localhost:4200" # wait for local port 4200 to respond to HEAD request
>   wait-on: "http-get://127.0.0.1:3000" # wait for port 3000 to respond to GET request


type: string


**`yarn`**

> Use yarn instead of npm


type: boolean


default: `false`

## install


Checks out code, installs dependencies, attaches code to the workspace


**`build`**

> Custom build command to run after install


type: string


**`executor`**

> Cypress executor to use


type: executor


default: `base-10`


**`yarn`**

> Use yarn instead of npm


type: boolean


default: `false`


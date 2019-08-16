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
     - no-workspace
     - working_directory
    
 - [install](#install)
     - executor
     - build
     - cache-key
     - yarn
     - working_directory
    

## run


A single complete job to run Cypress end-to-end tests in your project. If recording on the Dashboard, set `CYPRESS_RECORD_KEY` environment variable


**`browser`**

> Browser to use to run end-to-end tests. Typically "electron" (default) or "chrome".
> See https://on.cypress.io/launching-browsers, requires using executor with the browser installed,
> electron browser is already included with Cypress.


type: string


**`build`**

> Custom build command to run after install to build your application.
> Related parameter "start"


type: string


**`cache-key`**

> Custom CircleCI cache key for storing NPM modules and Cypress binary.


type: string


default: `cache-{{ arch }}-{{ .Branch }}-{{ checksum "package.json" }}`


**`command`**

> Custom test command to run Cypress tests, which overrides all individual options.


type: string


**`executor`**

> Cypress executor to use, see [executors.md](executors.md).
> You can define your own executor, see examples.


type: executor


default: `base-10`


**`group`**

> Test group name when recording on the dashboard. Requires `record: true`


type: string


**`no-workspace`**

> Do not write workspace (for example if there are no jobs to follow), which
> saves time on each build.


type: boolean


default: `false`


**`parallel`**

> Use test balancing using Cypress Dashboard,
> see https://on.cypress.io/parallelization. Requires `record: true` and
> only makes sense with CircleCI `parallelism` setting to spin several CI machines.
> Related options "record" and "group".


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

> Spec pattern to use to run only some test files, passed as `--spec ...` CLI argument.


type: string


**`start`**

> Optional server start command to run in the background before running Cypress tests.
> Related parameters "build" and "wait-on".


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


**`working_directory`**

> Directory containing package.json. Use this parameter if you're using a monorepo and your
> cypress tests aren't at the root of the repository (eg. `frontend`).


type: string


**`yarn`**

> Use yarn to install NPM modules instead of npm.


type: boolean


default: `false`

## install


Checks out code, installs dependencies, attaches code to the workspace for the future jobs to use (usually `cypress/run` follows the install step). 


**`build`**

> Custom build command to run after install to build the web application or web server.


type: string


**`cache-key`**

> Custom CircleCI cache key for storing NPM modules and Cypress binary.
> Use this parameter if you're using a monorepo and your cypress tests aren't at the root of the repository (eg. `frontend`). Additionally, monorepo users may want to provide a `cache-key` parameter to key the cache with an appropriate checksum. (i.e. `cache-key: 'cache-{{ arch }}-{{ .Branch }}-{{ checksum "frontend/package.json" }}'`)


type: string


default: `cache-{{ arch }}-{{ .Branch }}-{{ checksum "package.json" }}`


**`executor`**

> Cypress or custom executor name to use to run the install.


type: executor


default: `base-10`


**`working_directory`**

> Directory containing package.json. Use this parameter if you're using a monorepo and your
> cypress tests aren't at the root of the repository (eg. `frontend`).


type: string


**`yarn`**

> Use yarn to install NPM modules instead of npm.


type: boolean


default: `false`


# Jobs


Public jobs defined in this orb that your config workflow can use. See [examples.md](./examples.md)


 - [run](#run)
     - executor
     - record
     - parallel
     - parallelism
     - group
     - tags
     - post-install
     - build
     - start
     - wait-on
     - browser
     - spec
     - install-command
     - command
     - store_artifacts
     - yarn
     - cache-key
     - attach-workspace
     - no-workspace
     - working_directory
     - timeout
     - config-file
    
 - [install](#install)
     - executor
     - post-install
     - build
     - cache-key
     - yarn
     - install-command
     - working_directory
    

## run


A single complete job to run Cypress end-to-end tests in your project. If recording on the Dashboard, set `CYPRESS_RECORD_KEY` environment variable


**`attach-workspace`**

> Assuming there was an install job before, first attach
> the workspace to avoid re-installing dependencies


type: boolean


default: `false`


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


**`config-file`**

> Name of the Cypress configuration file to use


type: string


**`executor`**

> Cypress executor to use, see [executors.md](executors.md).
> You can define your own executor, see examples.


type: executor


default: `base-10`


**`group`**

> Test group name when recording on the dashboard. Requires `record: true`


type: string


**`install-command`**

> Overrides the default NPM or Yarn command


type: string


**`no-workspace`**

> Do not write workspace after this job is done.
> This is useful if there are no jobs to follow,
> which saves time on each build.


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


**`post-install`**

> Additional commands to run after running install
> but before verifying Cypress and saving cache.


type: steps


default: ``


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


**`tags`**

> Comma-separated tags to send to the dashboard. Requires `record: true`


type: string


**`timeout`**

> Optional timeout for running tests


type: string


default: `10m`


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

> Npm cache key


type: string


default: `cache-{{ arch }}-{{ .Branch }}-{{ checksum "package.json" }}`


**`executor`**

> Cypress or custom executor name to use to run the install.


type: executor


default: `base-10`


**`install-command`**

> Overrides the default NPM or Yarn command


type: string


**`post-install`**

> Additional commands to run after running install
> but before verifying Cypress and saving cache.


type: steps


default: ``


**`working_directory`**

> Directory containing package.json. Use this parameter if you're using a monorepo and your
> cypress tests aren't at the root of the repository (eg. `frontend`). Additionally,
> monorepo users will want to provide a `cache-key` parameter to key the cache with an
> appropriate checksum. (i.e. `cache-key: 'cache-{{ arch }}-{{ .Branch }}-{{ checksum "frontend/package.json" }}'`)


type: string


**`yarn`**

> Use yarn to install NPM modules instead of npm.


type: boolean


default: `false`


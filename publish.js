const minimist = require('minimist')
const execa = require('execa')

const argv = require('minimist')(process.argv.slice(2))

const setNewVersion = () => {
  return execa('npm', ['run', 'set-next-version'], {stdio: 'inherit'})
}

const getPackageVersion = () => {
  const version = require('./package').version
  return version
}

const loadNameAndVersion = () => {
  const namespace = 'cypress-io'
  const orbName = 'cypress'

  let name
  if (argv.dev) {
    const version = getPackageVersion()
    name = `${namespace}/${orbName}@${version}`
  } else {
    const version = argv.dev
    name = `${namespace}/${orbName}@dev:${version}`
  }
  console.log('publishing orb %s', name)
  return name
}

const publishOrb = (nameVersion) => {
  const cmd = `circleci orb publish orb.yml ${nameVersion}`
  if (argv.dry) {
    console.log('dry run: %s', cmd)
    return Promise.resolve()
  } else {
    return execa.shell(cmd, {stdio: 'inherit'})
  }
}

const getDevVersion = () =>
  Promise.resolve(argv.dev)

let decideVersion

if (argv.dev) {
  decideVersion = getDevVersion()
} else {
  decideVersion = setNewVersion()
}

decideVersion
  .then(loadNameAndVersion)
  .then(publishOrb)
  .catch(e => {
    console.error(e.message)
    process.exit(1)
  })

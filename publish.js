const execa = require('execa')

const setNewVersion = () => {
  return execa('npm', ['run', 'set-next-version'], {stdio: 'inherit'})
}

const loadNameAndVersion = () => {
  const version = require('./package').version
  const name = `cypress/cypress@${version}`
  console.log('publishing %s of the orb', name)
  return name
}

const publishOrb = (nameVersion) => {
  const cmd = `echo circleci orb publish orb.yml ${nameVersion}`
  return execa.shell(cmd, {stdio: 'inherit'})
}

setNewVersion()
  .then(loadNameAndVersion)
  .then(publishOrb)
  .catch(e => {
    console.error(e.message)
    process.exit(1)
  })

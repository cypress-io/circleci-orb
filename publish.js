const execa = require('execa')

const setNewVersion = () => {
  return execa('npm', ['run', 'set-next-version'], {stdio: 'inherit'})
}

const loadNameAndVersion = () => {
  const version = require('./package').version
  const name = `cypress/cypress@${version}`
  console.log('publishing orb %s', name)
  return name
}

const publishOrb = (nameVersion) => {
  const cmd = `circleci orb publish orb.yml ${nameVersion}`
  return execa.shell(cmd, {stdio: 'inherit'})
}

setNewVersion()
  .then(loadNameAndVersion)
  .then(publishOrb)
  .catch(e => {
    console.error(e.message)
    process.exit(1)
  })

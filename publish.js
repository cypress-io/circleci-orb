const execa = require('execa')
const version = require('./package').version
const name = `cypress/cypress@${version}`
console.log('publishing %s of the orb', name)

const tag = (tag) => {
  const cmd = `git tag ${tag}`
  return execa.shell(cmd, {stdio: 'inherit'})
}

const publishOrb = (nameVersion) => {
  const cmd = `echo circleci orb publish orb.yml ${nameVersion}`
  return execa.shell(cmd, {stdio: 'inherit'})
}

publishOrb(name)
  .then(() =>
    tag(version)
  )
  .catch(e => {
    console.error(e.message)
    process.exit(1)
  })

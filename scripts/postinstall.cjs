const fs = require('node:fs')

const rootPath = require.main.paths[0].split('node_modules')[0]

// add npm script
const packageJsonPath = `${rootPath}package.json`
if (fs.existsSync(packageJsonPath)) {
  console.info('postinstall: add package.json scripts')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

  packageJson.scripts['release:patch'] = 'npm version -m \'release:patch\' patch'
  packageJson.scripts['release:minor'] = 'npm version -m \'release:minor\' minor'
  packageJson.scripts['release:major'] = 'npm version -m \'release:major\' major'

  packageJson.scripts.checkdeps = 'ncu'
  packageJson.scripts['checkdeps:apply'] = 'ncu -u'

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

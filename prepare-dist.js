import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function prepareDist() {
  try {
    // Path to package.json
    const packageJsonPath = path.resolve(__dirname, 'package.json')
    
    // Read the current package.json
    const packageJson = await fs.readJson(packageJsonPath)
    
    // Split the current version into its components
    const versionParts = packageJson.version.split('.').map(Number)
    
    // Increment the patch version (last part)
    versionParts[2] += 1
    
    // If patch version exceeds 99, increment minor version and reset patch
    if (versionParts[2] > 99) {
      versionParts[2] = 0
      versionParts[1] += 1
      
      // If minor version exceeds 99, increment major version and reset minor
      if (versionParts[1] > 99) {
        versionParts[1] = 0
        versionParts[0] += 1
      }
    }
    
    // Construct the new version string
    const newVersion = versionParts.join('.')
    
    // Update the version in package.json
    packageJson.version = newVersion
    
    // Write the updated package.json
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
    
    // Ensure dist directory exists
    const distPath = path.resolve(__dirname, 'dist')
    await fs.ensureDir(distPath)
    
    // Rename style.css to foundation-ui.css if it exists
    const styleCssPath = path.resolve(distPath, 'style.css')
    const foundationUiCssPath = path.resolve(distPath, 'foundation-ui.css')
    
    if (await fs.pathExists(styleCssPath)) {
      await fs.move(styleCssPath, foundationUiCssPath, { overwrite: true })
    }
    
    // Create package.json for distribution
    const distPackageJson = {
      name: '@yoosuf/foundation-ui',
      version: newVersion,
      description: 'A modern, accessible Vue 3 component library',
      main: './foundation-ui.umd.cjs',
      module: './foundation-ui.js',
      types: './foundation-ui.d.ts',
      exports: {
        ".": {
          "types": "./foundation-ui.d.ts",
          "import": "./foundation-ui.js",
          "require": "./foundation-ui.umd.cjs"
        },
        "./foundation-ui.css": "./foundation-ui.css"
      },
      files: ['dist']
    }
    
    // Write distribution package.json
    await fs.writeJson(path.resolve(distPath, 'package.json'), distPackageJson, { spaces: 2 })
    
    console.log(`Version updated to ${newVersion}`)
    
    return newVersion
  } catch (error) {
    console.error('Error in prepareDist:', error)
    throw error
  }
}

prepareDist()

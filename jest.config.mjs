import { withTransformEsmPackages } from '@repobuddy/jest'
import preset from '@repobuddy/jest/presets/ts-esm'

/** @type {import('jest').Config} */
const config = {
  ...withTransformEsmPackages(preset),
  resetMocks: true,
  transformIgnorePatterns: [
    "node_modules/(?!(ts-invariant)/)"
  ],
  testEnvironment: 'jsdom',
  watchPlugins: []
}
export default config
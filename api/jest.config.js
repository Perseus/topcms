module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    }
  },
  setupFiles: [ '<rootDir>/tests/jest/setEnvVars.ts' ],
};

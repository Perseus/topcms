module.exports = {
  verbose: true,
  roots: [ '<rootDir>/src/', '<rootDir>/tests/unit/' ],
  moduleFileExtensions: [ 'js', 'vue' ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vee-validate/dist/rules)',
  ],
  setupFilesAfterEnv: [ './tests/unit/utils/jest.setup.js' ],
};

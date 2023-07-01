
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.setup.js',
  ],
  testEnvironment:'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|query-string|decode-uri-component|split-on-first|filter-obj)',],
  collectCoverageFrom: [ 'src/**/**.{js,jsx,ts,tsx}','!src/**/**.spec.{js,jsx,ts,tsx}', ],
  collectCoverage: true,
  //coverageReporters: ['html', 'text', 'text-summary', 'cobertura', ["lcov", {"projectRoot": "/"}]],
  testResultsProcessor: "jest-sonar-reporter",
  testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
  moduleNameMapper: {
    'query-string': require.resolve('query-string'),
  }
};

const jestConfig = {
  displayName: {
    name: 'UNIT',
    color: 'blue',
  },
  moduleFileExtensions: ['ts', 'js'],
  preset: 'ts-jest',
  rootDir: '.',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testEnvironment: 'jsdom',
};

if (process.env.JEST_COLLECT_COVERAGE) {
  jestConfig.collectCoverage = true;
  jestConfig.collectCoverageFrom = [
    '<rootDir>/src/**/*.ts',
  ];
}

module.exports = jestConfig;

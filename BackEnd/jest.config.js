module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/test'], //  busca pruebas SOLO en backend/test
  testMatch: [
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'models/**/*.js'
  ],
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['<rootDir>/../frontend'] //  ignora frontend
};

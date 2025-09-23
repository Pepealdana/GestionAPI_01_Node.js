module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/test'], // Solo busca en backend/test
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'models/**/*.js'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/../frontend',   // Ignora todo lo de frontend
    '/node_modules/'
  ]
};

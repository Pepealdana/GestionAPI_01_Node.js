module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/backend'], // Solo mirar pruebas en backend
  testMatch: [
    '**/test/**/*.spec.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'backend/controllers/**/*.js',
    'backend/routes/**/*.js',
    'backend/models/**/*.js'
  ],
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['<rootDir>/frontend'] // 🚫 Ignorar frontend
};

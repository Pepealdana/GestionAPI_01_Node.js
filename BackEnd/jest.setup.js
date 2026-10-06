// Solo para pruebas automatizadas. Nunca usar este valor fuera de NODE_ENV=test.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-only-jwt-secret-not-for-production';

jest.setTimeout(30000); // Aumenta el tiempo máximo de pruebas (30s)

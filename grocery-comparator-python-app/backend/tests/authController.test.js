const request = require('supertest');
const app = require('../server'); // Backend app instance

describe('Auth Controller', () => {
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'test123' });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'test123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

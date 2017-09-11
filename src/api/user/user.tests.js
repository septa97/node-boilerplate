import test from 'tape';
import debug from 'debug'; // eslint-disable-line
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from './../../server';

const request = supertest(app);
const log = debug('user.tests'); // eslint-disable-line

test.onFinish(() => process.exit(0));

async function login() {
  try {
    const res = await request.post('/api/auth/login').send({
      email: 'jancharles.adona@gmail.com',
      password: 'passw0rd',
    });

    return res.body.token;
  } catch (err) {
    throw new Error(err);
  }
}

test('User API', t => {
  t.test('GET /api/user', async assert => {
    try {
      // Login first
      const token = await login();

      // Call the actual API
      const res = await request
        .get('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(HTTPStatus.OK);

      assert.ok(res.body, 'Has a response body');
      assert.end();
    } catch (err) {
      throw new Error(err);
    }
  });

  t.test('GET /api/user/:username', async assert => {
    try {
      // Login first
      const token = await login();

      // Call the actual API
      const res = await request
        .get('/api/user/septa97')
        .set('Authorization', `Bearer ${token}`)
        .expect(HTTPStatus.OK);

      assert.ok(res.body, 'Has a response body');
      assert.end();
    } catch (err) {
      throw new Error(err);
    }
  });
});

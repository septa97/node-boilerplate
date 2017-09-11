import test from 'tape';
import debug from 'debug'; // eslint-disable-line
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from './../../server';

const request = supertest(app);
const log = debug('auth.tests'); // eslint-disable-line

test.onFinish(() => process.exit(0));

test('Auth API', t => {
  t.test('POST /api/auth/login', async assert => {
    try {
      const res = await request
        .post('/api/auth/login')
        .send({
          email: 'jancharles.adona@gmail.com',
          password: 'passw0rd',
        })
        .expect(HTTPStatus.OK);

      assert.ok(res.body.token, 'Has a token');
      assert.end();
    } catch (err) {
      throw new Error(err);
    }
  });
});

/* eslint no-shadow: ["error", { "allow": ["t"] }] */
import test from 'tape';
import debug from 'debug';
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from './../src/server';

const request = supertest(app); // eslint-disable-line
const log = debug('auth.test'); // eslint-disable-line
const baseURL = '/api';

test.onFinish(() => process.exit(0));

const setup = () => {
  const fixtures = {};

  return fixtures;
};

test('auth API', t => {
  t.test('POST /auth/login', t => {
    t.test('ERROR Scenarios', t => {
      t.test(
        'should not login with an email that does not exist',
        async assert => {
          try {
            const res = await request.post(`${baseURL}/auth/login`).send({
              email: 'nonexistingemail@gmail.com',
              password: 'passw0rd',
            });

            assert.equal(res.body.name, 'APIClientError');
            assert.equal(res.body.status, 401);
            assert.equal(res.body.statusText, 'Unauthorized');
            assert.deepEqual(res.body.error, {
              message: 'Passport.js authentication failed.',
            });
            assert.end();
          } catch (err) {
            throw new Error(err);
          }
        },
      );

      t.test('should not login with an invalid password', async assert => {
        try {
          const res = await request.post(`${baseURL}/auth/login`).send({
            email: 'jancharles.adona@gmail.com',
            password: 'invalidpassword',
          });

          assert.equal(res.body.name, 'APIClientError');
          assert.equal(res.body.status, 401);
          assert.equal(res.body.statusText, 'Unauthorized');
          assert.deepEqual(res.body.error, {
            message: 'Passport.js authentication failed.',
          });
          assert.end();
        } catch (err) {
          throw new Error(err);
        }
      });
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should login with a valid email and password', async assert => {
        try {
          const res = await request.post(`${baseURL}/auth/login`).send({
            email: 'jancharles.adona@gmail.com',
            password: 'passw0rd',
          });

          assert.equal(res.body.status, 200);
          assert.equal(res.body.statusText, 'OK');
          assert.ok(res.body.data.token);
          assert.end();
        } catch (err) {
          throw new Error(err);
        }
      });
    });
  });

  t.test('GET /auth/logout', t => {
    t.test('ERROR Scenarios', t => {
      t.test('should not logout when the JWT is invalid', async assert => {
        let token;

        assert.test('setup', async t => {
          const res = await request.post(`${baseURL}/auth/login`).send({
            email: 'jancharles.adona@gmail.com',
            password: 'passw0rd',
          });

          token = res.body.data.token;
          t.end();
        });

        const res = await request
          .get(`$baseURL/auth/logout`)
          .set('Authorization', `Bearer ${token}`);

        assert.ok(res.body);

        assert.test('teardown', async t => {
          await request
            .get(`${baseURL}/auth/logout`)
            .set('Authorization', `Bearer ${token}`);

          token = null;
          t.end();
        });

        assert.end();
      });
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should logout with a valid JWT', async assert => {
        assert.end();
      });
    });
  });
});

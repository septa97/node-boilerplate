import test from 'tape';
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from './../../server';

const request = supertest(app);

test.onFinish(() => process.exit(0));

test('User API', t => {
  t.test('GET /api/users', assert => {
    request.get('/api/users').expect(HTTPStatus.OK).end((err, res) => {
      assert.error(err, 'No errors');
      assert.ok(res, 'Has a response');
      assert.end();
    });
  });

  t.test('GET /api/user/:id', assert => {
    request.get('/api/user/1').expect(HTTPStatus.OK).end((err, res) => {
      assert.error(err, 'No errors');
      assert.ok(res, 'Has a response');
      assert.end();
    });
  });
});

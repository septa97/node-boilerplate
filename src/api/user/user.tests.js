/* global describe, it */
import chai from 'chai';
import supertest from 'supertest';
import app from './../../server';

const should = chai.should();
const request = supertest(app);

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should get all the users', done => {
      request.get('/api/users').expect(200).end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
    });
  });

  describe('GET /api/user/:id', () => {
    it('should get a user by id', done => {
      request.get('/api/user/1').expect(200).end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
    });
  });
});

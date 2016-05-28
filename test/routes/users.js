const request = require('supertest');
const app = require('../../app');
const should = require('should');

describe('request users route', () => {
  it('should return 200', (done) => {
    request(app).get('/users')
      .expect((res) => {
        should(res.status).equal(200);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});

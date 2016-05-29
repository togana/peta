const should = require('should');
const config = require('config');
const User = require('./../../models/user');

const params = {
  name: config.models.user.name,
  age: config.models.user.age,
};

describe('User Model()', () => {
  User.remove({ age: config.models.user.age }, (err) => err);

  it('respond with matching 0 record', (done) => {
    User.find((err, users) => {
      should.not.exist(err);
      should(users.length).equal(0);
      return done();
    });
  });

  it('respond with matching 1 record', (done) => {
    User.create(params);
    User.find((err, users) => {
      should.not.exist(err);
      should(users.length).equal(1);
      return done();
    });
  });
});

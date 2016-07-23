const should = require('should');
const config = require('config');
const User = require('./../../models/user');
const passwordHash = require('./../../lib/passwordHash');

const params = {
  name: config.models.user.name,
  password: passwordHash.generate(config.models.user.password),
  admin: config.models.user.admin,
};

describe('User Model()', () => {
  it('should create a new User', () => {
    const user = new User(params);
    user.save((err, createdUser) => {
      should.not.exist(err);
      should(createdUser.name).equal(config.models.user.name);
      should(passwordHash.verify(config.models.user.password, createdUser.password)).be.true();
      should(createdUser.admin).equal(config.models.user.name);
    });
  });
});

const should = require('should');
const passwordHash = require('./../../lib/passwordHash');

describe('passwordHash', () => {
  describe('.generate(password, [options])', () => {
    it('should throw an error if the password is not a valid string', () => {
      const invalid = [
        null,
        undefined,
        true,
        false,
        123,
        456.78,
        new Date(),
        {},
        [],
        function empty() {},
      ];

      invalid.forEach((value) => {
        let err;
        try {
          passwordHash.generate(value);
        } catch (e) {
          err = e;
        }
        should(err).be.instanceof(Error);
        should(err.message).equal('Invalid password');
      });
    });
  });
});

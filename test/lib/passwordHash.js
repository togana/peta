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

    it('should throw an error if an invalid message digest algorithm is specified', () => {
      let err;
      try {
        passwordHash.generate('password123', { algorithm: 'foo' });
      } catch (e) {
        err = e;
      }
      should(err).be.instanceof(Error);
      should(err.message).equal('Invalid message digest algorithm');
    });

    it('should throw an error if the salt length is invalid', () => {
      const invalid = [
        'abc',
        0,
        -1,
        2.3,
        null,
        true,
        false,
        new Date(),
        [],
        {},
        function empty() {},
      ];
      invalid.forEach((value) => {
        let err;
        try {
          passwordHash.generate('password123', { saltLength: value });
        } catch (e) {
          err = e;
        }
        should(err).be.instanceof(Error);
        should(err.message).equal('Invalid salt length');
      });
    });

    it('should generate unique hashed passwords', () => {
      const password = 'password123';
      const hash1 = passwordHash.generate(password);
      const hash2 = passwordHash.generate(password);
      should(hash1).not.equal(hash2);
      should(passwordHash.verify(password, hash1)).be.true();
      should(passwordHash.verify(password, hash2)).be.true();
    });

    it('should store the algorithm in the hashed password', () => {
      const password = 'password123';
      const invalid = [
        'md5',
        'sha256',
        'sha512',
      ];
      invalid.forEach((value) => {
        const hash = passwordHash.generate(password, { algorithm: value });
        should(passwordHash.verify(password, hash)).be.true();
        const parts = hash.split('$');
        should(parts[0]).equal(value);
      });
    });
  });
});

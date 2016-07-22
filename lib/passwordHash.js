const crypto = require('crypto');

function generateSalt(len = 8) {
  if (typeof len !== 'number' || len <= 0 || len !== parseInt(len, 10)) {
    throw new Error('Invalid salt length');
  }
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
}

function generateHash(algorithm, salt, password) {
  try {
    const hash = crypto.createHmac(algorithm, salt).update(password).digest('hex');
    return `${algorithm}$${salt}$${hash}`;
  } catch (e) {
    throw new Error('Invalid message digest algorithm');
  }
}

module.exports.generate = function generate(password, options = {}) {
  if (typeof password !== 'string') throw new Error('Invalid password');
  const algorithm = options.algorithm || 'sha256';
  const salt = options.salt || generateSalt(options.saltLength);
  return generateHash(algorithm, salt, password);
};

module.exports.verify = function verify(password, hashedPassword) {
  if (!password || !hashedPassword) return false;
  const parts = hashedPassword.split('$');
  if (parts.length !== 3) return false;
  // parts[0] => algorithm
  // parts[1] => salt
  return generateHash(parts[0], parts[1], password) === hashedPassword;
};

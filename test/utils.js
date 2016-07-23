const config = require('config');
const mongoose = require('mongoose');

beforeEach((done) => {
  function clearDB() {
    Object.keys(mongoose.connection.collections).map((collection) =>
      mongoose.connection.collections[collection].remove(() => {})
    );
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.mongo.connection, (err) => {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
  return this;
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});

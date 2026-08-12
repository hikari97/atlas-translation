const assert = require('node:assert/strict');
const test = require('node:test');

const {
  getMongoDbUri,
  MISSING_MONGODB_URI_MESSAGE,
} = require('../src/config/database');

test('uses MONGODB_URI as the canonical connection string', () => {
  const uri = getMongoDbUri({
    MONGODB_URI: 'mongodb://canonical/atlas-studio',
    MONGO_URI: 'mongodb://legacy/atlas-studio',
  });

  assert.equal(uri, 'mongodb://canonical/atlas-studio');
});

test('supports the legacy MONGO_URI variable', () => {
  const uri = getMongoDbUri({
    MONGO_URI: 'mongodb://legacy/atlas-studio',
  });

  assert.equal(uri, 'mongodb://legacy/atlas-studio');
});

test('fails clearly instead of connecting to localhost implicitly', () => {
  assert.throws(
    () => getMongoDbUri({}),
    new Error(MISSING_MONGODB_URI_MESSAGE),
  );
});

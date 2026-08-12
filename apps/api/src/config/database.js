const MISSING_MONGODB_URI_MESSAGE =
  'MONGODB_URI is required. Add it to apps/api/.env before starting the API.';

/**
 * Resolves the MongoDB connection string from the API environment.
 * MONGODB_URI is canonical; MONGO_URI remains supported for compatibility.
 *
 * @param {NodeJS.ProcessEnv} environment
 * @returns {string}
 */
function getMongoDbUri(environment = process.env) {
  const mongoDbUri = environment.MONGODB_URI?.trim();

  if (mongoDbUri) {
    return mongoDbUri;
  }

  const legacyMongoUri = environment.MONGO_URI?.trim();

  if (legacyMongoUri) {
    return legacyMongoUri;
  }

  throw new Error(MISSING_MONGODB_URI_MESSAGE);
}

module.exports = {
  getMongoDbUri,
  MISSING_MONGODB_URI_MESSAGE,
};

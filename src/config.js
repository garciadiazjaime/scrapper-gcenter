const convict = require('convict');

// Define a schema
const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ipaddress: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3030,
  },
  api: {
    url: {
      doc: 'API URL',
      format: String,
      default: 'http://127.0.0.1:3030/stub/ports',
      env: 'API_URL',
    },
  },
  db: {
    url: {
      doc: 'Database hostname',
      format: String,
      default: 'mongodb://localhost:27017/gcenter',
      env: 'DB_URL',
    },
  },
  twitter: {
    key: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_KEY',
    },
    secret: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_SECRET',
    },
    tokenKey: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_TOKEN_KEY',
    },
    tokenSecret: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_TOKEN_SECRET',
    },
    maxRequests: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_MAX_REQUEST',
    },
    maxTime: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_MAX_TIME',
    },
    maxTweets: {
      doc: '',
      format: String,
      default: '',
      env: 'TWITTER_MAX_TWEETS',
    },
  },
  facebook: {
    token: {
      doc: '',
      format: String,
      default: '',
      env: 'FACEBOOK_TOKEN',
    },
  },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;

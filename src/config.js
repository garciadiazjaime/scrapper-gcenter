import convict from 'convict';

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
    default: 3000,
  },
  api: {
    url: {
      doc: 'API URL',
      format: String,
      default: 'http://127.0.0.1:3000/stub/ports',
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
  loggly: {
    token: {
      doc: 'Loggly token',
      format: String,
      default: '',
      env: 'LOGGLY_TOKEN',
    },
    subdomain: {
      doc: 'Loggly subdomain',
      format: String,
      default: '',
      env: 'LOGGLY_SUBDOMIAN',
    },
    username: {
      doc: 'Loggly username',
      format: String,
      default: '',
      env: 'LOGGLY_USERNAME',
    },
    password: {
      doc: 'Loggly password',
      format: String,
      default: '',
      env: 'LOGGLY_PASSWORD',
    },
  },
  alchemy: {
    apiUrl: {
      doc: 'Alchemy API URL',
      format: String,
      default: '',
      env: 'ALCHEMY_API_URL',
    },
    token: {
      doc: 'Alchemy token',
      format: String,
      default: '',
      env: 'ALCHEMY_TOKEN',
    },
  },
  secureToken: {
    doc: 'Our token',
    format: String,
    default: '',
    env: 'MINT_TOKEN',
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
});

// Perform validation
config.validate({ strict: true });

export default config;

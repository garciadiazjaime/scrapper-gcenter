const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const debug = require('debug')('mongoUtil');

mongoose.Promise = global.Promise;

const config = require('../../config');

let dbClient = null;

class MongoUtil {

  async openConnection() {
    dbClient = await MongoClient.connect(config.get('db.url'));
  }

  insertOne(collectionName, data) {
    if (dbClient) {
      const collection = dbClient.collection(collectionName);
      return collection.insertOne(data)
    } else {
      debug(`DB must be open`);
    }
  }

  findOne(collectionName, filter, options) {
    if (dbClient) {
      const collection = dbClient.collection(collectionName);
      return collection.findOne(filter, options);
    } else {
      debug(`Error :: DB must be open`);
    }
  }

  find(collectionName, filter, options, skip, limit) {
    if (dbClient) {
      const collection = dbClient.collection(collectionName);
      return collection.find(filter || {}, options || {})
        .skip(skip || 0)
        .limit(limit || 0)
        .toArray();
    } else {
      debug(`Error :: DB must be open`);
    }
  }

  closeConnection() {
    if (dbClient) {
      dbClient.close();
    }
  }
}

function openDB() {
  return mongoose.connect(config.get('db.url'), { useNewUrlParser: true, useUnifiedTopology: true });
}

function closeDB() {
  return mongoose.connection.close()
}

module.exports = MongoUtil;
module.exports.openDB = openDB
module.exports.closeDB = closeDB

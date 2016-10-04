import { MongoClient } from 'mongodb';
import logUtil from '../logUtil';
import config from '../../config';
let dbClient;

export default class MongoUtil {

  openConnection() {
    return new Promise((resolve, reject) => {
      if (!dbClient) {
        MongoClient.connect(config.get('db.url'), (err, db) => {
          if (err) {
            reject(err);
          } else {
            dbClient = db;
            resolve();
          }
        });
      } else {
        resolve()
      }
    });
  }

  insertOne(collectionName, data) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
          const collection = dbClient.collection(collectionName);
          collection.insertOne(data, (err, result) => {
            if (err) {
              logUtil.log(`Error insertOne ${err}`);
              reject({ status: false });
            } else {
              resolve(result.result);
            }
          });
      } else {
        logUtil.log(`Error :: DB must be open`);
        reject({ status: false });
      }
    });
  }

  findOne(collectionName, filter, options) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
        const collection = dbClient.collection(collectionName);
        collection.findOne(filter, options, (err, document) => {
          if (err) {
            reject(err);
          } else {
            resolve(document);
          }
        });
      } else {
        logUtil.log(`Error :: DB must be open`);
        reject({ status: false });
      }
    });
  }

  find(collectionName, filter, options, skip, limit) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
        const collection = dbClient.collection(collectionName);
        collection.find(filter || {}, options || {})
          .skip(skip || 0)
          .limit(limit || 0)
          .toArray((err, documents) => {
            if (err) {
              reject(err);
            } else {
              resolve(documents);
            }
          });
      } else {
        logUtil.log(`Error :: DB must be open`);
        reject({ status: false });
      }
    });
  }

  static saveReport(data) {
    return new Promise((resolve, reject) => {
      this.openConnection()
        .then((db) => {
          const collection = db.collection('report');
          collection.insert(data, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
            this.closeConnection(db);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getReport(data) {
    return new Promise((resolve, reject) => {
      this.openConnection()
        .then((db) => {
          const collection = db.collection('report');
          var options = {
              sort: [['created', 'desc']]
          }
          collection.findOne({garita: data.name}, options, (error, document) => {
            if (error) {
              reject(error);
            } else {
              resolve(document);
            }
            this.closeConnection(db);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static saveData(collectionName, data) {
    data.created = new Date();
    return new Promise((resolve, reject) => {
      this.openConnection()
        .then((db) => {
          const collection = db.collection(collectionName);
          collection.insert(data, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
            this.closeConnection(db);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static find(collectionName, filter, options, skip, limit) {
    return new Promise((resolve, reject) => {
      this.openConnection()
        .then((db) => {
          const collection = db.collection(collectionName);
          collection.find(filter || {}, options || {})
            .skip(skip || 0)
            .limit(limit || 0)
            .toArray((err, documents) => {
              if (err) {
                reject(err);
              } else {
                resolve(documents);
              }
          });
        });
    });
  }

  closeConnection(db) {
    dbClient.close();
  }
}

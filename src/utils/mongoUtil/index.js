import { MongoClient } from 'mongodb';
import config from '../../config';

export default class MongoUtil {

  static openConnection() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.get('db.url'), (error, db) => {
        if (error) {
          reject(error);
        } else {
          resolve(db);
        }
      });
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

  static closeConnection(db) {
    db.close();
  }
}

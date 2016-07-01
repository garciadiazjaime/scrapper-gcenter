import { MongoClient } from 'mongodb';
import config from '../../config';

export default class MongoUtil {

  static openConnection() {
    return new Promise((resolve, reject) => {
      const dbHost = config.get('db.url');
      MongoClient.connect(`${dbHost}gcenter`, (error, db) => {
        if (error) {
          reject(error);
        } else {
          resolve(db);
        }
      });
    });
  }

  static save(data) {
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

  static closeConnection(db) {
    db.close();
  }
}

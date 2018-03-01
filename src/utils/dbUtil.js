import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export function openDatabase(dbUrl) {
  mongoose.connect(dbUrl)
}

export function closeDatabase(dbUrl) {
  mongoose.closeDatabase()
}

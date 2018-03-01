import mongoose from 'mongoose';

const UserLocationSchema = new mongoose.Schema({
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  uuid: String,
  created: { type: Date, default: Date.now },
});

const UserLocationModel = mongoose.model('userLocation', UserLocationSchema);

export default UserLocationModel;

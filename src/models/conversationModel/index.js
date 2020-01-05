const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  messages: [{ message: String, id: String, created_time: Date }],
  id: String,
}, { timestamps: { createdAt: 'created_at' }});

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

module.exports = ConversationModel;

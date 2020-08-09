const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  message: String,
  imageId: {type: String, required: true}
}, {collection: 'photos'});

module.exports = mongoose.model('Photo', photoSchema);

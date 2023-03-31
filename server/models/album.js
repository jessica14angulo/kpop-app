//import mongoose
const mongoose = require('mongoose');
//create schema object
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  url: {
    type: String
  },
  imagePath: {
    type: String
  }
})

//export module with model
module.exports = mongoose.model('Album', albumSchema);
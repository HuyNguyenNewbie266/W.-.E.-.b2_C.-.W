const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  key: { 
    type: String, 
    unique: true },

  title: {
    type: String,
    require: true
  },

  value: { 
    type: String, 
    required: true },

  category: { 
    type: String, 
    required: true },

},
{ collection: 'response', timestamps: true }
);

module.exports = mongoose.model('Response', ResponseSchema);
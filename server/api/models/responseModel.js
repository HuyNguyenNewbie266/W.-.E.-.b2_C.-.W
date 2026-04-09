const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  key: { 
    type: String, 
    unique: true },

  title: {
    type: String,
    required: true
  },

  value: { 
    type: String, 
    required: true },

  category: { 
    type: String, 
    enum: ['Account Management', 'Billing', 'Technical Support', 'Network'],
    required: true },

},
{ collection: 'response', timestamps: true }
);

module.exports = mongoose.model('Response', ResponseSchema);
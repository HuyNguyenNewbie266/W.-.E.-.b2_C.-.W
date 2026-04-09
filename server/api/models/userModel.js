const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { 
    type: String,
    required: true,
    unique: true },
  

  name: { 
    type: String, 
    required: true },
  
  role: { 
    type: String, 
    enum: ['staff', 'admin'], 
    default: 'staff' },
},
{ collection: 'user', timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
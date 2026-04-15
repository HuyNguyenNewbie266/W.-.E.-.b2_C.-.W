const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId, 
    ref: 'Ticket',
    required: true
  },
  
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
},
{ collection: 'message'}
);

module.exports = mongoose.model('Message', MessageSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  ticketNumber: { 
    type: String, 
    unique: true },

  submittedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },

  email: { 
    type: String,
    required: true },

  subject: { 
    type: String, 
    required: true },

  category: { 
    type: String, 
    required: true },

  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true },

  description: { 
    type: String, 
    required: true },

  status: { type: String, 
    enum: ['Open', 'In Progress', 'Resolved'], 
    default: 'Open' },

  relatedResponses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Response' 
  }],
},
{ collection: 'ticket', timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
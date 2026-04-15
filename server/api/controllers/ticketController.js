const mongoose = require('mongoose');
const Ticket = mongoose.model('Ticket');
const { generateCustomCode } = require('../helpers/generateCodeHelper');

exports.get_all = async (req, res) => {
  try{
    const tickets = await Ticket.find({});
    res.json(tickets);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_by_id = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { 
      ticketNumber, 
      submittedBy, 
      email, 
      subject, 
      category, 
      priority, 
      description } = req.body;

    const newTicket = new Ticket({ 
      ticketNumber, 
      submittedBy, 
      email, 
      subject, 
      category, 
      priority, 
      description });

    if (!newTicket.ticketNumber) {
      newTicket.ticketNumber = generateCustomCode('TCK', newTicket._id);
    }

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { 
      ticketNumber, 
      submittedBy, 
      email, 
      subject, 
      category, 
      priority, 
      description,
      status,
      relatedResponses
     } = req.body;
    
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { 
        ticketNumber, 
        submittedBy, 
        email, 
        subject, 
        category, 
        priority, 
        description,
        status,
        relatedResponses },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_tickets_by_user = async (req, res) => {
  try {
    const userId = req.params.id; 
    const { cursor, limit = 5, status } = req.query; 

    let query = { submittedBy: userId };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (cursor) {
      query._id = { $lt: cursor };
    }

    const tickets = await Ticket.find(query)
      .sort({ _id: -1 })
      .limit(parseInt(limit));

    let nextCursor = null;
    if (tickets.length === parseInt(limit)) {
      nextCursor = tickets[tickets.length - 1]._id;
    }

    const total = await Ticket.countDocuments({ submittedBy: userId });
    const pending = await Ticket.countDocuments({ submittedBy: userId, status: { $ne: 'Resolved' } });

    res.json({
      data: tickets,
      nextCursor,
      total,
      pending
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
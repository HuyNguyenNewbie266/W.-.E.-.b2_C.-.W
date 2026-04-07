const mongoose = require('mongoose');
const Message = mongoose.model('Message');

exports.get_all = async (req, res) => {
  try{
    const messages = await Message.find({});
    res.json(messages);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_by_id = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { 
      ticket, 
      sender, 
      message } = req.body;

    const newMessage = new Message({ 
      ticket,
      sender,
      message
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { 
      ticket, 
      sender, 
      message } = req.body;
    
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { 
      ticket, 
      sender, 
      message },
      { new: true , runValidators: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


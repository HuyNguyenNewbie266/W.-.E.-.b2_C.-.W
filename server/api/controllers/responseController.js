const mongoose = require('mongoose');
const Response = mongoose.model('Response');
const { generateCustomCode } = require('../helpers/generateCodeHelper');

exports.get_all = async (req, res) => {
  try{
    const responses = await Response.find({});
    res.json(responses);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_by_id = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(response);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { 
      key, 
      title, 
      value, 
      category } = req.body;

    const newResponse = new Response({ 
      key, 
      title, 
      value, 
      category
    });

    if (!newResponse.key) {
      newResponse.key = generateCustomCode('RES', newResponse._id);
    }


    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { 
      key, 
      title, 
      value, 
      category
     } = req.body;
    
    const updatedResponse = await Response.findByIdAndUpdate(
      req.params.id,
      { 
      key, 
      title, 
      value, 
      category
     },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(updatedResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    if (!deletedResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json({ message: 'Response deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


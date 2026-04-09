const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


const GOOGLE_CLIENT_ID = '916528742807-9a1dtd7t0gsu6ge1f96c63n6tf37dil9.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.get_all = async (req, res) => {
  try{
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_by_id = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = new User({ email, password, name});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, password, name, role },
      { new: true , runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  exports.googleLogin = async (req, res) => {
    try{
      const { credential } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });

      const { email, name, picture } = ticket.getPayload();

      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          email,
          name
        });
        await user.save();
      } 

      const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.SECRET_KEY, 
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: picture
      }
    });

    } catch (err) {
      console.error('Google login error:', err);
      res.status(401).json({ 
        message: 'Failed to authenticate with Google',
      });
    }

};


mongoose = require('mongoose');
const Response = mongoose.model('Response');
const Ticket = mongoose.model('Ticket');
const User = mongoose.model('User');
// Thêm vào cuối file responseController.js
exports.universal_search = async (req, res) => {
  try {
    const q = req.query.q || '';
    if (!q) return res.json([]); 

    
    const safeQuery = q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(safeQuery, 'i');

   
    const responses = await Response.find({
      $or: [{ title: regex }, { value: regex }, { category: regex }, { key: regex }]
    }).lean();

    
    const tickets = await Ticket.find({
      $or: [{ subject: regex }, { description: regex }, { category: regex }, { ticketNumber: regex }]
    }).lean();

   
    const users = await User.find({
      $or: [{ email: regex }, { name: regex }, { role: regex }]
    }).lean();

    const results = [
      ...responses.map(r => ({ _id: r._id, type: 'Response', code: r.key, title: r.title, desc: r.value, badge: r.category })),
      ...tickets.map(t => ({ _id: t._id, type: 'Ticket', code: t.ticketNumber, title: t.subject, desc: t.description, badge: t.status })),
      ...users.map(u => ({ _id: u._id, type: 'User', code: u.email, title: u.name, desc: `Role: ${u.role}`, badge: u.role }))
    ];

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
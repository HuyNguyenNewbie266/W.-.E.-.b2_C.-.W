const messageController = require('../controllers/messageController');

module.exports = (app) => {
  app.route('/messages')
    .get(messageController.get_all)
    .post(messageController.create);

  app.route('/messages/:id')
    .get(messageController.get_by_id)
    .put(messageController.update)
    .delete(messageController.delete);
};
const ticketController = require('../controllers/ticketController');

module.exports = (app) => {
  app.route('/tickets')
    .get(ticketController.get_all)
    .post(ticketController.create);

  app.route('/tickets/:id')
    .get(ticketController.get_by_id)
    .put(ticketController.update)
    .delete(ticketController.delete);
};
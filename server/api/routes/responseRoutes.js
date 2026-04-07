const responseController = require('../controllers/responseController');

module.exports = (app) => {
  app.route('/responses')
    .get(responseController.get_all)
    .post(responseController.create);

  app.route('/responses/:id')
    .get(responseController.get_by_id)
    .put(responseController.update)
    .delete(responseController.delete);
};
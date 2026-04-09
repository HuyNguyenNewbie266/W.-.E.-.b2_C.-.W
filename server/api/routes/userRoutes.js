const userController = require('../controllers/userController');

module.exports = (app) => {
  app.route('/users')
    .get(userController.get_all)
    .post(userController.create);

  app.route('/users/:id')
    .get(userController.get_by_id)
    .put(userController.update)
    .delete(userController.delete);

  app.route('/login')
    .post(userController.googleLogin);
};
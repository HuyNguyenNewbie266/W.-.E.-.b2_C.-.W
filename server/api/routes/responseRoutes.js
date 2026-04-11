const responseController = require('../controllers/responseController');
const rateLimit = require('express-rate-limit');

const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 5, // Mỗi IP chỉ được hỏi AI tối đa 5 câu trong 1 phút
  message: { message: "You have exceeded the allowed number of accesses. Please try again in 1 minute!" }
});

module.exports = (app) => {
  app.route('/responses')
    .get(responseController.get_all)
    .post(responseController.create);

  app.route('/responses/stats/counts')
    .get(responseController.get_category_counts);
    
  app.route('/responses/stats/recent')
    .get(responseController.get_recent);
    
  app.route('/responses/search')
    .get(responseController.search);

  app.route('/responses/test/random')
      .get(responseController.get_random_test_data);
    
  app.route('/responses/ask-ai')
    .post(aiLimiter, responseController.ask_ai);

  app.route('/responses/:id')
      .get(responseController.get_by_id)
      .put(responseController.update)
      .delete(responseController.delete);
};
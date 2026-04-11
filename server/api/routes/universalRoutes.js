const universalController = require('../controllers/universalController');
module.exports = (app) => {
app.route('/universal-search')
    .get(universalController.universal_search);
};
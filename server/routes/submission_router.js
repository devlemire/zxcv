const Router = require('express').Router();
const cors = require('cors');
const submissionController = require('../controllers/submission_controller');

Router.options('*', cors());

Router.post('/', submissionController.store);
Router.get('/', submissionController.read);

module.exports = Router;
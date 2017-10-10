const Router = require('express').Router();
const cors = require('cors');
const emailController = require('../controllers/email_controller');

Router.options('*', cors());

Router.post('/', emailController.store);
Router.get('/', emailController.read);

module.exports = Router;
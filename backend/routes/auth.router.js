const { uniqueCheck, register, login, addUser, removeUser, getAllUser } = require('../controllers/auth.controller');
const { isAuthorized, isSuperAdmin, validateRequest } = require('../middleware');
const { uniqueCheckValidation, registrationValidation, loginValidation, removeUserValidation, addUserValidation } = require('../validations/auth.validation');

const Router = require('express').Router();

Router.route('/unique-check').get([uniqueCheckValidation, validateRequest], uniqueCheck)
Router.route('/registration').post([registrationValidation, validateRequest], register)
Router.route('/login').post([loginValidation, validateRequest], login)
Router.route('/add-user').post([isAuthorized, isSuperAdmin], [addUserValidation, validateRequest], addUser)
Router.route('/remove-user/:id').delete([isAuthorized, isSuperAdmin], [removeUserValidation, validateRequest], removeUser)
Router.route('/get-all-user').get([isAuthorized, isSuperAdmin], getAllUser)

Router.route('/logout').get(isAuthorized, uniqueCheck)

module.exports = Router;
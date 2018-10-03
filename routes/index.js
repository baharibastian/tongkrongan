const companyController = require('../controllers').company;
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const models = require('../models');

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcomee',
	}));

	//company
	app.post('/api/company', companyController.create);
	app.get('/api/company', companyController.all);

	app.post('/api/auth/register', userController.create);
	app.post('/api/auth', authController.sign_in);

	//users
	app.get('/api/users', userController.all_user);
	app.post('/api/register/user', userController.create);
}
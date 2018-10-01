const companyController = require('../controllers').company;
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const models = require('../models');

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcomee',
	}));

	app.post('/api/company', companyController.create);

	app.get('/api/company', function(req, res) {
		models.Company.findAll({
			include: [models.Employee]
		}).then(function(companies){
			res.send({
				message: 'success',
				status: 200,
				data: companies}
			);
		});
	});

	app.post('/api/auth/register', userController.create);
	app.post('/api/auth', authController.sign_in);
	app.get('/api/users', userController.all_user);
}
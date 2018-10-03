const Company = require('../models').Company;
const Employee = require('../models').Employee;
const jwt = require('jsonwebtoken');

module.exports = {
	create(req, res) {
		const token = req.body.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, 'secret', function(err, decoded) {
				if (err) {
					return res.status(403).send(err);
				} else {
					return Company.create({
						name: req.body.name
					})
					.then(company => res.status(201).send(company))
					.catch(error => res.status(400).send(error));
				}
			})
		} else {
			res.status(403).json({ message:'Token not provided' });
		}
	},
	all(req, res) {
		const token = req.body.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, 'secret', function(err, decoded) {
				if (err) {
					console.log('error', err);
					return res.status(403).send({ message: err.name });
				} else {
					return Company.findAll({
						include: [Employee]
					}).then(user => {
						res.send({
							message: 'success',
							status: 200,
							data: user
						})
					})
				}
			})
		} else {
			res.status(403).json({ message: 'Token Not Provided' });
		}
	}
};
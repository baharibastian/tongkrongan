const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
	create(req, res) {
		User.findOrCreate({
			where: {
				user_name: req.body.username
			},
			defaults: {
				email: req.body.email,
				password: req.body.password
			}
		})
		.spread(function(user, created){
			res.status(200).send(user);
		})
	},
	all_user(req, res){
		User.findAll().then(user => {
			res.status(200).send(user);
		})
	}
};
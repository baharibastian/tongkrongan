const User = require('../models').User;
const jwt = require('jsonwebtoken')

module.exports = {
	sign_in(req,res) {
		User.findOne({where: {user_name: req.body.user_name, password: req.body.password}})
			.then(function(user) {
				if (user) {
					const token = jwt.sign({
						user: user
					},
					'secret',
					{ expiresIn: 24 * 60 * 60});
					res.status(200).send({
						'message': 'Success',
						'data': user,
						'token': token
					})
				} else {
					res.status(404).json({
						'message' : 'Username and Password not found',
						'status' : 400
					});
				}
				
			})
			.catch(function(err) {
				res.send(err.message);
			})
	}
};
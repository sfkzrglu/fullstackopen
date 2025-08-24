const loginRouter = require("express").Router();
const bcrypt = require("bcrypt")
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const config  = require("../utils/config");

loginRouter.post("", async (request, response) => {
	const { username, password } = request.body

	const user =await User.findOne({ username })
	const passwordCorrect
	 = await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userWithToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(
		userWithToken,
		config.SECRET,
		{ expiresIn: 60 * 60 }
	)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
});

module.exports = loginRouter;
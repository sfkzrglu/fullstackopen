const usersRouter = require("express").Router();
const bcrypt = require("bcrypt")
const User = require('../models/user')

usersRouter.post("", async (request, response) => {
	const { username, name, password } = request.body

	if (!username || !password) {
		return response.status(400).json({ error: "username or password is missing!" })
	}

	if ( password.toString().length < 3) {
		return response.status(400).json({ error: "password must be at least 3 characters long!" })
	}
	
	const passwordHash = await bcrypt.hash(password, 10)
	const user = User({
		username,
		name,
		passwordHash
	})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
});

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({}).populate('blogs')
	response.json(users)
})


module.exports = usersRouter;
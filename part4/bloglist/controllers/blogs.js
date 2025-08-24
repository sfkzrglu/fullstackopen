const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

blogsRouter.get("", async (request, response) => {
	const blogs = await Blog.find({}).populate("user");
	return response.json(blogs);
});

blogsRouter.post("", async (request, response) => {
	const body = request.body
	if (!body.title || !body.url) {
		return response.status(400).json({ error: "title or url missing" })
	}

	const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
	if (!decodedToken.id) {
		return response.status(400).json({ error: "token is invalid" })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	});

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	return response.status(201).json(savedBlog)
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	return response.json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body
	if (!body.likes) {
		return response.status(400).json({ error: "likes missing" })
	}

	const foundBlog = await Blog.findById(request.params.id);
	foundBlog.likes = body.likes

	await foundBlog.save()
	return response.status(200).json(foundBlog)
});



module.exports = blogsRouter;

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("", async (request, response) => {
	const blogs = await Blog.find({});
	return response.json(blogs);
});

blogsRouter.post("", async (request, response) => {
	const body = request.body
	if (!body.title || !body.url) {
		return response.status(400).json({ error: "title or url missing" })
	}

	const blog = new Blog(body);

	const savedBlog = await blog.save()
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

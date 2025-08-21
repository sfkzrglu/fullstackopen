const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helpers = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helpers.initialBlogs);
});


test("blogs are returned as JSON", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");

	assert.strictEqual(response.body.length, helpers.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
	const response = await api.get("/api/blogs");
	const hasUnderlineId = response.body.some(blog => blog._id)
	assert.equal(hasUnderlineId, false);
});

test("a blog is created", async () => {
	const newBlog = {
		title: 'test post blog',
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 10,
	}
	await api.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsInDb = await helpers.blogsInDb()
	assert.strictEqual(blogsInDb.length, helpers.initialBlogs.length + 1)

	const titles = blogsInDb.map(t => t.title)

	assert(titles.includes('test post blog'))
});


test('all blogs have like property', async () => {
	const blogsInDb = await helpers.blogsInDb()

	const blogsWithNoLikes = blogsInDb.some(blog => blog.likes === undefined || blog.likes === null)
	assert.strictEqual(blogsWithNoLikes, false)
})

test("the title or url properties are missing from the request data giving error 400", async () => {
	const newBlog = {
		//title: 'test post blog',
		author: "Michael Chan",
		//url: "https://reactpatterns.com/",
		likes: 10,
	}
	await api.post("/api/blogs")
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)

});

test('deletion of a blog', async () => {
	const blogsAtStart = await helpers.blogsInDb()
	const blogToDelete = blogsAtStart[0]
	
	const r=await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

	const blogsAtEnd = await helpers.blogsInDb()
	const titles = blogsAtEnd.map(b => b.title)
	assert(!titles.includes(blogToDelete.title))
	
	assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length - 1)
})


after(async () => {
	await mongoose.connection.close()
})
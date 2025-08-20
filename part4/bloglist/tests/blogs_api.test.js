const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});


test("blogs are returned as JSON", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");

	assert.strictEqual(response.body.length, helper.initialBlogs.length);
});


test.only("unique identifier property of the blog posts is named id", async () => {
	const response = await api.get("/api/blogs");
	const hasUnderlineId = response.body.some(blog => blog._id)
	assert.equal(hasUnderlineId, false);
});


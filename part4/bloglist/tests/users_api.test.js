const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helpers = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
	await User.insertOne(helpers.initialUser);
});

describe('invalid users are not created', () => {

	test("username length less than 3 gives is not added", async () => {
		const usersInDbStart = await helpers.usersInDb()

		const user = {
			"username": "te",
			"name": "test",
			"password": "tester"
		}
		const response = await api
			.post("/api/users")
			.send(user)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` (`' + user.username + '`, length 2) is shorter than the minimum allowed length (3).')

		const usersInDbEnd = await helpers.usersInDb()

		assert.strictEqual(usersInDbStart.length, usersInDbEnd.length)
	});

	test("password length less than 3 gives error", async () => {
		const usersInDbStart = await helpers.usersInDb()

		const user = {
			"username": "test",
			"name": "test",
			"password": "te"
		}
		const response = await api
			.post("/api/users")
			.send(user)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.error, "password must be at least 3 characters long!")
		const usersInDbEnd = await helpers.usersInDb()

		assert.strictEqual(usersInDbStart.length, usersInDbEnd.length)
	});

	test("username is already exist", async () => {
		const usersInDbStart = await helpers.usersInDb()


		const response = await api
			.post("/api/users")
			.send(helpers.initialUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.error, "expected `username` to be unique")
		const usersInDbEnd = await helpers.usersInDb()

		assert.strictEqual(usersInDbStart.length, usersInDbEnd.length)
	});

	test("username or password missing!", async () => {
		const usersInDbStart = await helpers.usersInDb()

		const user = {
			"name": "test"
		}
		const response = await api
			.post("/api/users")
			.send(user)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.error, "username or password is missing!")
		const usersInDbEnd = await helpers.usersInDb()

		assert.strictEqual(usersInDbStart.length, usersInDbEnd.length)
	});

})
after(async () => {
	await mongoose.connection.close()
})
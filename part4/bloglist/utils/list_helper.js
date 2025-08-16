const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogPosts) => {
	let total = 0;
	blogPosts.forEach(post => {
		total += post.likes
	});
	return total;
}

const favoriteBlog = (blogs) => {
	let max = 0;
	let blog = null;
	blogs.forEach(_blog => {
		if (_blog.likes > max) {
			max = _blog.likes
			blog = _blog
		}
	})
	return blog
}


const mostBlogs = (blogs) => {
	//count authors blogs
	const count = _.countBy(blogs, 'author')
	//find the author with max blog count
	const maxAuthor = _.maxBy(_.toPairs(count, p => p[1]))
	return {
		'author': maxAuthor[0],
		'blogs': maxAuthor[1]
	}
}


const mostLikes = (blogs) => {
	//group authors
	const group = _.groupBy(blogs, "author")
	const totalLikes = []
	_.map(group, (item) => {
		let likes = 0
		item.forEach(k => likes += k.likes)
		totalLikes.push({
			"author": item[0].author,
			"likes": likes
		})
	})
	return _.maxBy(totalLikes,"likes")
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
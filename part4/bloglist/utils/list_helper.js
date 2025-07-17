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
	let max=0;
	let blog=null;
	blogs.forEach(_blog=>{
		if (_blog.likes>max) {
			max=_blog.likes
			blog=_blog
		}
	})
	return blog
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
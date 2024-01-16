const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

module.exports = {
  dummy,
};

const totalLikes = (blogPosts) => {
  return blogPosts.length === 0
    ? 0
    : blogPosts.reduce((total, post) => total + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const mostLiked = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCount = lodash.countBy(blogs, "author");

  const topAuthor = Object.keys(authorCount).reduce((a, b) => {
    return authorCount[a] > authorCount[b] ? a : b;
  });

  return {
    author: topAuthor,
    blogs: authorCount[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = blog.likes;
    } else {
      acc[blog.author] += blog.likes;
    }
    return acc;
  }, {});

  console.log(authorLikes)

  const topAuthor = Object.keys(authorLikes).reduce((a, b) => {
    return authorLikes[a] > authorLikes[b] ? a : b;
  });

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

const listHelper = require("../utils/list_helper");
const {
  listWithZeroBlog,
  listWithmanyBlogs,
  listWithOneBlog,
} = require("./blogposts");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has no blogs, equals 0", () => {
    const result = listHelper.totalLikes(listWithZeroBlog);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(2);
  });

  test("when list has many blogs, equals the sum of them all", () => {
    const result = listHelper.totalLikes(listWithmanyBlogs);
    expect(result).toBe(34);
  });
});

describe("favorite blog", () => {
  test("when list has no blogs, equals to null", () => {
    const result = listHelper.favoriteBlog(listWithZeroBlog);
    expect(result).toBe(null);
  });

  test("when list has one blog, equals to that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
    });
  });

  test("when list has many blogs, equals to the most liked blog", () => {
    const result = listHelper.favoriteBlog(listWithmanyBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("when list has no blogs, equals to null", () => {
    const result = listHelper.mostBlogs(listWithZeroBlog);
    expect(result).toBe(null);
  });

  test("when list has one blog, equals to that blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 1,
    });
  });

  test("when list has many blogs, equals to Robert C. Martin", () => {
    const result = listHelper.mostBlogs(listWithmanyBlogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 2 });
  });
});

describe("most likes", () => {
  test("when list has no blogs, equals to null", () => {
    const result = listHelper.mostLikes(listWithZeroBlog);
    expect(result).toBe(null);
  });

  test("when list has obe blog, equals to that blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Robert C. Martin",
      likes: 2,
    });
  });

  test("when list has many blogs, equals to Edsger W. Dijkstra", () => {
    const result = listHelper.mostLikes(listWithmanyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

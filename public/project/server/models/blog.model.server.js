/**
 * Created by SujithNarayan on 3/23/2016.
 */
var mock = require("./blog.mock.json");
module.exports = function() {
    var api = {
        getAllBlogs: getAllBlogs,
        getBlogsForUser: getBlogsForUser,
        createBlogForUser: createBlogForUser,
        updateBlogForUser: updateBlogForUser,
        deleteBlog: deleteBlog,
        isBlogByCurrentUser: isBlogByCurrentUser,
        editBlog: editBlog
    };
    return api;

    function getAllBlogs() {
        return mock;
    }

    function getBlogsForUser(username) {
        var blogsByUser = [];
        var blogIndex;

        for (blogIndex in mock) {
            var currentBlog = mock[blogIndex];
            if (currentBlog.blogUsername === username) {
                if (blogsByUser.length === 0) {
                    blogsByUser = [currentBlog];
                } else {
                    blogsByUser.push(currentBlog);
                }
            }
        }

        return blogsByUser;
    }

    function createBlogForUser(username, blog) {
        var blogObj = {
            "blogId": (new Date).getTime(),
            "blogName": blog.title,
            "blogContent": blog.content,
            "blogUsername": username
        };
        mock.push(blogObj);
        return mock;
    }

    function updateBlogForUser(blog) {
        var blogIndex;
        for (blogIndex in mock) {
            if (blog.blogId === mock[blogIndex].blogId) {
                mock[blogIndex].blogName = blog.title;
                mock[blogIndex].blogContent = blog.content;
                break;
            }
        }
        return mock;
    }

    function deleteBlog(index) {
        mock.splice(index,1);
        return mock;
    }

    function isBlogByCurrentUser(blogIndex, username) {
        if (mock[blogIndex].blogUsername == username) {
            return true;
        } else {
            return false;
        }
    }

    function editBlog(blogIndex) {
        return mock[blogIndex];
    }

};
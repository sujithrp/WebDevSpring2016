/**
 * Created by SujithNarayan on 3/23/2016.
 */
module.exports = function(app, model) {
    app.get("/api/project/blog", getAllBlogs);
    app.get("/api/project/getBlog/:username", getBlogsForUser);
    app.post("/api/project/createBlog/:username", createBlogForUser);
    app.put("/api/project/updateBlog", updateBlogForUser);
    app.delete("/api/project/deleteBlog/:blogIndex", deleteBlog);
    app.get("/api/project/verifyBlog/blog/:blogIndex/user/:username", isBlogByCurrentUser);
    app.get("/api/project/editBlog/:blogIndex", editBlog);

    function getAllBlogs(req, res) {
        console.log("getting all blogs (service server function)");
        var blogs = model.getAllBlogs();
        res.json(blogs);
    }

    function getBlogsForUser(req, res) {
        var username = req.params.username;
        var blogs = model.getBlogsForUser(username);
        res.json(blogs);
    }

    function createBlogForUser(req, res) {
        var username = req.params.username;
        var blog = req.body;
        var addedBlog = model.createBlogForUser(username, blog);
        res.json(addedBlog);
    }

    function updateBlogForUser(req, res) {
        var blog = req.body;
        var blogsArr = model.updateBlogForUser(blog);
        res.json(blogsArr);
    }

    function deleteBlog(req, res) {
        var blogIndex = req.params.blogIndex;
        var blogsArr = model.deleteBlog(blogIndex);
        res.json(blogsArr);
    }

    function isBlogByCurrentUser(req, res) {
        var blogIndex = req.params.blogIndex;
        var username = req.params.username;
        var bool = model.isBlogByCurrentUser(blogIndex, username);
        res.json(bool);
    }

    function editBlog(req, res) {
        var blogIndex = req.params.blogIndex;
        var selectedBlog = model.editBlog(blogIndex);
        res.json(selectedBlog);
    }


};
/**
 * Created by SujithNarayan on 3/23/2016.
 */
module.exports = function(app, model) {
    app.get("/api/project/blog", getAllBlogs);
    app.get("/api/project/getBlog/:username", getBlogsForUser);
    app.post("/api/project/createBlog/:username", createBlogForUser);
    app.put("/api/project/updateBlog", updateBlogForUser);
    app.delete("/api/project/deleteBlog/:id", deleteBlog);
    //app.get("/api/project/verifyBlog/blog/:blogIndex/user/:username", isBlogByCurrentUser);
    //app.get("/api/project/editBlog/:blogIndex", editBlog);

    function getAllBlogs(req, res) {
        var blogs = model.getAllBlogs().then(
            function(blogs) {
                res.json(blogs);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function getBlogsForUser(req, res) {
        var username = req.params.username;
        var blogs = model.getBlogsForUser(username).then(
            function(blogs) {
                res.json(blogs);
            },
            function(err) {
                res.status(400).send(err);
            }
        )

    }

    function createBlogForUser(req, res) {
        var username = req.params.username;
        var blog = req.body;
        var addedBlog = model.createBlogForUser(username, blog).then(
            function(addedBlog) {
                res.json(addedBlog);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function updateBlogForUser(req, res) {
        var blog = req.body;
        var blog = model.updateBlogForUser(blog).then(
            function(blog) {
                res.json(blog);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function deleteBlog(req, res) {
        var id = req.params.id;
        var blogsArr = model.deleteBlog(id).then(
            function(blogsArr) {
                res.json(blogsArr);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

};
/**
 * Created by SujithNarayan on 3/23/2016.
 */
var q = require("q");
module.exports = function(db,mongoose) {
    var BlogSchema = require("./blog.schema.server.js")(mongoose);
    var BlogModel = mongoose.model('ProjectBlog',BlogSchema);

    var api = {
        getAllBlogs: getAllBlogs,
        getBlogsForUser: getBlogsForUser,
        createBlogForUser: createBlogForUser,
        updateBlogForUser: updateBlogForUser,
        deleteBlog: deleteBlog
    };
    return api;

    function getAllBlogs() {
        var deferred = q.defer();

        BlogModel.find(
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function getBlogsForUser(username) {

        var deferred = q.defer();

        BlogModel.find(

            { username: username },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function createBlogForUser(username, blog) {
        var blogObj = {
            "username": username,
            "title": blog.title,
            "content": blog.content
        };
        var deferred = q.defer();

        BlogModel.create(blogObj,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function updateBlogForUser(blog) {

        var deferred = q.defer();

        BlogModel.findById(
            {"_id": blog._id},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.title = blog.title;
                    doc.content = blog.content;
                    doc.updated = new Date();
                    doc.save(function(err, savedDoc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(savedDoc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function deleteBlog(id) {
        var deferred = q.defer();

        BlogModel.remove(
            {_id: id},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }
};
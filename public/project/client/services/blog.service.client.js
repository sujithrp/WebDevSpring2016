/**
 * Created by SujithNarayan on 3/23/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .factory("BlogService", BlogService);

    function BlogService($http) {

        BlogService.getAllBlogs = function() {
            return $http.get("/api/project/blog");
        };

        BlogService.getBlogsForUser = function(username) {
            var query = "/api/project/getBlog/"+username;
            return $http.get(query);
        };

        BlogService.createBlogForUser = function(blog, username) {
            var query = "/api/project/createBlog/"+username;
            return $http.post(query, blog);
        };

        BlogService.updateBlogForUser = function(blog) {
            var query = "/api/project/updateBlog/";
            return $http.put(query, blog);
        };

        BlogService.deleteBlog = function(id) {
            var query = "/api/project/deleteBlog/"+id;
            return $http.delete(query);
        };

        BlogService.isBlogByCurrentUser = function(blogIndex, username) {
            var query = "/api/project/verifyBlog/blog/"+blogIndex+"/user/"+username;
            return $http.get(query);
        };

        BlogService.editBlog = function(blogIndex) {
            var query = "/api/project/editBlog/"+blogIndex;
            return $http.get(query);
        };

        return {
            getAllBlogs: BlogService.getAllBlogs,
            getBlogsForUser: BlogService.getBlogsForUser,
            createBlogForUser: BlogService.createBlogForUser,
            updateBlogForUser: BlogService.updateBlogForUser,
            deleteBlog: BlogService.deleteBlog,
            editBlog: BlogService.editBlog
        };
    }
})();

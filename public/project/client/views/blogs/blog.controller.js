/**
 * Created by SujithNarayan on 3/4/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("BlogController", BlogController);

    function BlogController($scope, $rootScope, BlogService) {

        $scope.message = false;
        var currentUser = $rootScope.currentUser;
        $scope.deleteButtonToBeDisplayed = false;

        if (!currentUser) {
            $scope.blogWrite = false;
            $scope.message = "You can view your blogs or write a blog by just logging in";
        }

        $scope.cancelBlog = function() {
            $scope.blog = '';
            $scope.blogWrite = false;
        };

        $scope.submitBlog = function(passedBlog) {
            if (!passedBlog._id) {
                var blog = {
                    "title": passedBlog.blogName,
                    "content": passedBlog.blogContent
                };
                BlogService.createBlogForUser(blog,currentUser.username).then(function(response) {
                    $scope.blogsArr.push(response.data);
                })
            } else {
                var blog = passedBlog;
                blog.title = passedBlog.blogName;
                blog.content = passedBlog.blogContent;
                BlogService.updateBlogForUser(blog).then(function(response) {
                    BlogService.getBlogsForUser(currentUser.username).then(function(response) {
                        $scope.blogsArr = response.data;
                    })
                })
            }
            $scope.blog = '';
            $scope.blogWrite = false;
        };

        $scope.fetchBlogsForUser = function() {
            BlogService.getBlogsForUser(currentUser.username).then(function(response) {
                if (response.data.length == 0) {
                    $scope.message = "You currently have no blogs. Showing all blogs!";
                }
                else {
                    $scope.blogsArr = response.data;
                }
            })
        };

        $scope.viewAllBlogs = function() {
            BlogService.getAllBlogs().then(function(response) {
                $scope.blogsArr = response.data;
            })
        };

        $scope.editBlog = function(blogObj) {
            if (!currentUser) {
                $("#editBlog").attr("title", "Not your blog");
                return false;
            }
            if (blogObj.username != currentUser.username) {
                $("#editBlog").attr("title", "Not your blog");
                return false;
            }
            else {
                $scope.blogWrite = true;
                $scope.blog = blogObj;
                $scope.blog.blogName = blogObj.title;
                $scope.blog.blogContent = blogObj.content;
            }
        };

        $scope.deleteBlog = function(blogObj, index) {
            if (!currentUser) {
                $("#deleteBlog").attr("title", "Not your blog");
                return false;
            }
            if (blogObj.username != currentUser.username) {
                $("#deleteBlog").attr("title", "Not your blog");
                return false;
            }
            if (blogObj.username != currentUser.username) {
                return false;
            }
            else {
                BlogService.deleteBlog(blogObj._id).then(function(response) {
                    $scope.blogsArr.splice(index,1);
                })
            }
        };
    }
})();

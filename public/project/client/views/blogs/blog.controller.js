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

        $scope.submitBlog = function(blog) {
            if (!blog.blogId) {
                BlogService.createBlogForUser(blog,currentUser.username).then(function(response) {
                    $scope.blogsArr = response.data;
                })
            } else {
                BlogService.updateBlogForUser(blog).then(function(response) {
                    $scope.blogsArr = response.data;
                })
            }
            $scope.blog = '';
            $scope.blogWrite = false;
        };

        $scope.fetchBlogsForUser = function() {
            BlogService.getBlogsForUser(currentUser.username).then(function(response) {
                if (response.data.length == 0) {
                    $scope.message = "You currently have no blogs";
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

        $scope.editBlog = function(blogIndex) {
            BlogService.isBlogByCurrentUser(blogIndex, currentUser.username).then(function(response) {
                var bool = response.data;
                if (!bool) {
                    return false;
                }
                else {
                    $scope.blogWrite = true;
                    BlogService.editBlog(blogIndex).then(function(response) {
                        $scope.blog = response.data;
                        $scope.blog.title = response.data.blogName;
                        $scope.blog.content = response.data.blogContent;
                    })
                }
            });
        };

        $scope.deleteBlog = function(blogIndex) {
            BlogService.isBlogByCurrentUser(blogIndex, currentUser.username).then(function(response) {
                var bool = response.data;
                if (!bool) {
                    return false;
                }
                else {
                    BlogService.deleteBlog(blogIndex).then(function(response) {
                        $scope.blogsArr.splice(blogIndex,1);
                    });
                }
            });
        };
    }
})();
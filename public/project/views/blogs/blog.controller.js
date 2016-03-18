/**
 * Created by SujithNarayan on 3/4/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("BlogController", BlogController);

    function BlogController($scope, $rootScope, CacheService) {

        $scope.message = false;
        var currentUser = $rootScope.currentUser;
        $scope.deleteButtonToBeDisplayed = false;

        if (!currentUser) {
            $scope.blogWrite = false;
            $scope.message = "You can view your blogs or write a blog by just logging in";
        }


        var getAllBlogsCallback = function(returnedBlogsArr) {
            $scope.blogsArr = returnedBlogsArr;
        };

        CacheService.getAllBlogs(getAllBlogsCallback);


        $scope.cancelBlog = function() {
            $scope.blog = '';
            $scope.blogWrite = false;
        };


        var submitBlogCallback = function(newBlogsArr) {
            $scope.blogsArr = newBlogsArr;
            $scope.blog = '';
            $scope.blogWrite = false;
        };

        $scope.submitBlog = function(blog) {
            if (!blog.blogId) {
                CacheService.createBlogForUser(blog,currentUser.username,submitBlogCallback);
            } else {
                CacheService.updateBlogForUser(blog,submitBlogCallback);
            }
        };

        var fetchBlogsForUserCallback = function(returnedBlogsArr) {
            if (returnedBlogsArr.length === 0) {
                $scope.message = "You currently have no blogs. Click on Write a Blog to get started!";
                return;
            }
            $scope.blogsArr = returnedBlogsArr;
        };

        $scope.fetchBlogsForUser = function() {
            CacheService.fetchBlogsForUser(currentUser.username,fetchBlogsForUserCallback);
        };

        $scope.viewAllBlogs = function() {
            CacheService.getAllBlogs(getAllBlogsCallback);
        };

        $scope.isBlogByCurrentUser = function(blogIndex) {
            if (!currentUser) return false;
            return CacheService.isBlogByCurrentUser(blogIndex, currentUser.username);
        };

        var editBlogCallback = function(blogObj) {
            $scope.blog = blogObj;
            $scope.blog.title = blogObj.blogName;
            $scope.blog.content = blogObj.blogContent;
        };

        $scope.editBlog = function(blogIndex) {
            $scope.blogWrite = true;
            CacheService.editBlog(blogIndex,editBlogCallback);
        };

        var deleteBlogCallback = function(newBlogsArr) {
            $scope.blogsArr = newBlogsArr;
        };

        $scope.deleteBlog = function(blogIndex) {
            CacheService.deleteBlog(blogIndex,deleteBlogCallback);
        };
    }
})();
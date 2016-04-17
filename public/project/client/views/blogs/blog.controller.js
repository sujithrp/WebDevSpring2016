/**
 * Created by SujithNarayan on 3/4/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("BlogController", BlogController);

    function BlogController($scope, $rootScope, $location, BlogService, UserService) {

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

        $scope.otherProfileRender = function(username) {
            if (currentUser) {
                if (username == currentUser.username) {
                    $location.path("/profile");
                }
            }
            UserService.findUserByUsername(username).then(function(response) {
                $rootScope.other_user = response.data;
                $location.path("/other_user");
            })
        };

        $scope.fetchBlogsForUser = function() {
            BlogService.getBlogsForUser(currentUser.username).then(function(response) {
                if (response.data.length == 0) {
                    $scope.message = "You currently have no blogs. Showing all blogs!";
                    BlogService.getAllBlogs().then(function(response) {
                        $scope.blogsArr = response.data;
                    })
                }
                else {
                    $scope.blogsArr = response.data;
                }
            })
        };

        $scope.fetchBlogsForOtherUser = function() {
            BlogService.getBlogsForUser($rootScope.other_user.username).then(function(response) {
                if (response.data.length == 0) {
                    $rootScope.other_user_message = "This user does not have any blogs";
                }
                else {
                    $scope.blogsArr = response.data;
                }
            })
        };

        $scope.fetchSubscibedBlogs = function() {
            UserService.findUserByUsername(currentUser.username).then(function(response) {
                var usernamesArr = response.data.subscribesTo;
                var index;
                for (index in usernamesArr) {
                    BlogService.getBlogsForUser(usernamesArr[index]).then(function(response) {
                        var blogIndex;
                        for (blogIndex in response.data) {
                            if (!$scope.blogsArr) {
                                $scope.blogsArr = [response.data[blogIndex]];
                            } else {
                                $scope.blogsArr.push(response.data[blogIndex]);
                            }
                        }

                    })
                }

            });

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

        $scope.subscribe = function() {
            if (!currentUser) {
                $rootScope.other_user_message = "You should be logged in to subscribe to blogs";
            }
            var userCopy = currentUser;
            userCopy.subscribesTo.push($rootScope.other_user.username);
            UserService.updateUser(currentUser._id,userCopy).then(function(response) {
                if (response != null) {
                    $rootScope.other_user_message = "Subscribed to "+$rootScope.other_user.username+"'s blogs";
                }
            })
        }
    }
})();

/**
 * Created by SujithNarayan on 3/4/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("BlogController", BlogController);

    function BlogController($scope, $rootScope, $location, BlogService, UserService) {

        //UserService
        //    .getCurrentUser()
        //    .then(function (res) {
        //        $rootScope.currentUser = res.data;
        //        $scope.message = null;
        //
        //        $scope.user = $rootScope.currentUser;
        //        $scope.message = false;
        //        $scope.deleteButtonToBeDisplayed = false;
        //        //var currentUser = $rootScope.currentUser;
        //    });

        function init() {
            $scope.user = $rootScope.currentUser;
            $scope.message = false;
            $scope.deleteButtonToBeDisplayed = false;
        }

        init();

        BlogService.getAllBlogs().then(function(response) {
            $scope.blogsArr = response.data;
        });

        if (!$scope.user) {
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
                    "content": passedBlog.blogContent.replace(/<(?:.|\n)*?>/gm, '')
                };
                BlogService.createBlogForUser(blog,$scope.user.username).then(function(response) {
                    if (!$scope.blogsArr) {
                        $scope.blogsArr = [response.data];
                    }
                    $scope.blogsArr.push(response.data);
                });
                BlogService.getAllBlogs().then(function(response) {
                    $scope.blogsArr = response.data;
                })

            } else {
                var blog = passedBlog;
                blog.title = passedBlog.blogName;
                blog.content = passedBlog.blogContent.replace(/<(?:.|\n)*?>/gm, '');
                BlogService.updateBlogForUser(blog).then(function(response) {
                    BlogService.getBlogsForUser($scope.user.username).then(function(response) {
                        $scope.blogsArr = response.data;
                    })
                });
                BlogService.getAllBlogs().then(function(response) {
                    $scope.blogsArr = response.data;
                })
            }
            $scope.blog = '';
            $scope.blogWrite = false;
        };

        $scope.otherProfileRender = function(username) {
            if ($scope.user) {
                if (username == $scope.user.username) {
                    $location.path("/profile");
                }
            }
            UserService.findUserByUsername(username).then(function(response) {
                $rootScope.other_user = response.data;
                $location.path("/other_user");
            })
        };

        $scope.fetchBlogsForUser = function() {
            $scope.message = '';
            BlogService.getBlogsForUser($scope.user.username).then(function(response) {
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
            $scope.blogsArr = null;
            UserService.findUserByUsername($scope.user.username).then(function(response) {
                var usernamesArr = response.data.subscribesTo;
                if (usernamesArr.length == 0) {
                    $scope.message = "You haven't subscribed to anyone. Showing all blogs!";
                    BlogService.getAllBlogs().then(function(response) {
                        $scope.blogsArr = response.data;
                    })
                }
                var index;
                for (index in usernamesArr) {
                    BlogService.getBlogsForUser(usernamesArr[index]).then(function(response) {
                        var blogIndex;
                        var flag = 0;
                        for (blogIndex in response.data) {
                            flag = 1;
                            if (!$scope.blogsArr) {
                                $scope.blogsArr = [response.data[blogIndex]];
                            } else {
                                $scope.blogsArr.push(response.data[blogIndex]);
                            }
                        }
                        console.log("flag value");
                        if (flag == 0) {
                            $scope.message = "No subscribed blogs! Showing all blogs";
                            BlogService.getAllBlogs().then(function(response) {
                                $scope.blogsArr = response.data;
                            })
                        }
                    })
                }


            });

        };

        $scope.viewAllBlogs = function() {
            BlogService.getAllBlogs().then(function(response) {
                $scope.message = null;
                $scope.blogsArr = response.data;
            })
        };

        $scope.editBlog = function(blogObj) {
            if (!$scope.user) {
                $("#editBlog").attr("title", "Not your blog");
                return false;
            }
            if (blogObj.username != $scope.user.username) {
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
            if (!$scope.user) {
                $("#deleteBlog").attr("title", "Not your blog");
                return false;
            }
            if (blogObj.username != $scope.user.username) {
                $("#deleteBlog").attr("title", "Not your blog");
                return false;
            }
            if (blogObj.username != $scope.user.username) {
                return false;
            }
            else {
                BlogService.deleteBlog(blogObj._id).then(function(response) {
                    $scope.blogsArr.splice(index,1);
                })
            }
        };

        $scope.subscribe = function() {
            if (!$scope.user) {
                $rootScope.other_user_message = "You should be logged in to subscribe to blogs";
            }
            var userCopy = $scope.user;
            userCopy.subscribesTo.push($rootScope.other_user.username);
            UserService.updateUser($scope.user._id,userCopy).then(function(response) {
                if (response != null) {
                    $rootScope.other_user_message = "Subscribed to "+$rootScope.other_user.username+"'s blogs";
                }
            })
        }
    }
})();

/**
 * Created by SujithNarayan on 4/16/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, BlogService, UserService) {
        UserService.getAllUsers().then(
            function(response) {
                console.log(response);
                var userIndex;
                for (userIndex in response.data) {
                    if (!$scope.usersArrAdmin) {
                        $scope.usersArrAdmin = [response.data[userIndex]];
                    } else {
                        console.log($scope.usersArrAdmin);
                        console.log(response.data[userIndex]);
                        if ($scope.usersArrAdmin.indexOf(response.data[userIndex]) >= 0) {
                            continue;
                        } else {
                            $scope.usersArrAdmin.push(response.data[userIndex]);
                        }
                    }
                }
            }
        );

        BlogService.getAllBlogs().then(
            function(response) {
                console.log(response);
                var blogIndex;
                for (blogIndex in response.data) {
                    if (!$scope.blogsArrAdmin) {
                        $scope.blogsArrAdmin = [response.data[blogIndex]];
                    } else {
                        console.log($scope.blogsArrAdmin);
                        console.log(response.data[blogIndex]);
                        $scope.blogsArrAdmin.push(response.data[blogIndex]);
                    }
                }
            }
        );

        $scope.removeUserAdmin = function(userObj, index) {
            UserService.deleteUserById(userObj._id).then(
                function(response) {
                    console.log("users deleted");
                    $scope.usersArrAdmin.splice(index,1);
                }
            )
        };

        $scope.deleteBlogAdmin = function(blogObj, index) {
            BlogService.deleteBlog(blogObj._id).then(
                function(response) {
                    console.log("blogs deleted");
                    $scope.blogsArrAdmin.splice(index,1);
                }
            )
        }
    }
})();

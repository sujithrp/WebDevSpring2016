/**
 * Created by SujithNarayan on 3/4/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("BlogController", BlogController);

    function BlogController($scope, CacheService) {

        var getAllBlogsCallback = function(returnedBlogsArr) {
            $scope.blogsArr = returnedBlogsArr;
        };

        CacheService.getAllBlogs(getAllBlogsCallback);

    }
})();

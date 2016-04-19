/**
 * Created by SujithNarayan on 2/29/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .factory("CacheService", CacheService);

    function CacheService($http) {

        CacheService.nameToId = function(name) {
            var query = "/api/project/nameToId/"+name;
            return $http.get(query);
        };

        CacheService.codeToName = function(code) {
            var query = "/api/project/codeToName/"+code;
            return $http.get(query);
        };

        return {
            nameToId: CacheService.nameToId,
            codeToName: CacheService.codeToName
        };
    }
})();


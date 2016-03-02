/**
 * Created by SujithNarayan on 2/29/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .factory("CacheService", CacheService);

    function CacheService($rootScope) {

        var map = [];
        map = [
            {
                "name":"San Antonio Spurs",
                "id":"583ecd4f-fb46-11e1-82cb-f4ce4684ea4c"
            }
        ];

        CacheService.nameToId = function(name,nameToIdCallback) {
            var arrIndex;

            for (arrIndex in map) {

                var nameInDB = map[arrIndex].name.toLowerCase();
                var givenName = name.toLowerCase();

                if (nameInDB.replace(" ","") === givenName.replace(" ","")) {
                    nameToIdCallback(map[arrIndex].id);
                    return;
                }

                var nameInDBArr = nameInDB.split(" ");
                var givenNameArr = givenName.split(" ");

                for (var i = 0; i < nameInDBArr.length; i++) {
                    for (var j = 0; j < givenNameArr.length; j++) {
                        if (nameInDBArr[i] === givenNameArr[j]) {
                            nameToIdCallback(map[arrIndex].id, map[arrIndex].name);
                            return;
                        }
                    }
                }
            }
        };

        return {
            map: map,
            nameToId: CacheService.nameToId
        };
    }
})();


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
            },
            {
                "name":"Boston Celtics",
                "id":"583eccfa-fb46-11e1-82cb-f4ce4684ea4c"
            },
            {
                "name":"Cleveland Cavaliers",
                "id":"583ec773-fb46-11e1-82cb-f4ce4684ea4c"
            },
            {
                "name":"Miami Heat",
                "id":"583ecea6-fb46-11e1-82cb-f4ce4684ea4c"
            },
            {
                "name":"Utah Jazz",
                "id":"583ece50-fb46-11e1-82cb-f4ce4684ea4c"
            },
            {
                "name": "Rasual Butler",
                "id": "007a5e3c-978e-49e3-af38-7a4d9354cf21"
            },
            {
                "name": "James Jones",
                "id": "09d25155-c3be-4246-a986-55921a1b5e61"
            },
            {
                "name": "Justice Winslow",
                "id": "0e6ddc9f-4a7b-4d48-8033-998103edfb32"
            },
            {
                "name": "Dante Exum",
                "id": "0d187d04-4cd9-44b3-9a29-408fac5b011e"
            },
            {
                "name": "James Young",
                "id": "0bf197ae-6f88-4ce6-ace0-50a20b98f847"
            }

        ];

        CacheService.nameToId = function(name,nameToIdCallback) {
            var arrIndex;

            for (arrIndex in map) {

                var nameInDB = map[arrIndex].name.toLowerCase();
                var givenName = name.toLowerCase();

                if (nameInDB.replace(" ","") === givenName.replace(" ","")) {
                    nameToIdCallback(map[arrIndex].id, map[arrIndex].name);
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


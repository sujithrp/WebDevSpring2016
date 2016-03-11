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
            },
            {
                "name": "New England Patriots",
                "id": "e43310b1-cb82-4df9-8be5-e9b39637031b"
            },
            {
                "name": "Green Bay Packers",
                "id": "5a60dd3a-302c-41c6-ab0f-dd335c1103c2"
            },
            {
                "name": "Dallas Cowboys",
                "id": "1e84213a-ff1f-4c9d-a003-8ee782b25a40"
            },
            {
                "name": "Seattle Seahawks",
                "id": "c6b9e5df-c9e4-434c-b3e6-83928f11cbda"
            },
            {
                "name": "Pittsburgh Steelers",
                "id": "7349a2e6-0ac9-410b-8bd2-ca58c9f7aa34"
            },
            {
                "name": "James Young",
                "id": "0bf197ae-6f88-4ce6-ace0-50a20b98f847"
            },
            {
                "name": "James Young",
                "id": "0bf197ae-6f88-4ce6-ace0-50a20b98f847"
            },
            {
                "name": "James Young",
                "id": "0bf197ae-6f88-4ce6-ace0-50a20b98f847"
            },
            {
                "name": "James Young",
                "id": "0bf197ae-6f88-4ce6-ace0-50a20b98f847"
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

        var blogsArr = [
            {
                "blogName": "Sassuolo-Milan Preview: The Hunt",
                "blogContent": "On Sunday, Milan will have a double task of taking three points to keep their objectives on the table, and also breaking a curse of playing away to Sassuolo. The first objective is hard enough with injuries and fitness issues. But there is always some kind of dark magic about breaking a curse, a psychological feat that is not exactly tangible. Add to that the fact that Sassuolo are only six points behind us on the table and could cut that distance in half with a win, and this is going to be a difficult game. With both teams seeking European spots, and both coming into the match in good form, this match will be like a hunt",
                "blogUsername": "alice"
            },
            {
                "blogName": "NUMBERS NOTES: THUNDER GET STAGNANT WITH THE GAME ON THE LINE",
                "blogContent": "The Jazz are that team that throws 2-3 passes at the beginning of most possessions that do nothing. So ball movement is definitely going to go down when they’re more purposefully looking to get the ball into the hands of Gordon Hayward or Rodney Hood to run a pick-and-roll.",
                "blogUsername": "bob"
            }
        ];


        CacheService.getAllBlogs = function(callback) {
            callback(blogsArr);
        };

        CacheService.createBlogForUser = function(blog, username, callback) {
            var blogObj = {
                "blogName": blog.title,
                "blogContent": blog.content,
                "blogUsername": username
            };
            blogsArr.push(blogObj);
            callback(blogsArr);
        };

        CacheService.fetchBlogsForUser = function(username, callback) {
            var blogsByUser = [];
            var blogIndex;

            for (blogIndex in blogsArr) {
                var currentBlog = blogsArr[blogIndex];
                if (currentBlog.blogUsername === username) {
                    if (blogsByUser.length === 0) {
                        blogsByUser = [currentBlog];
                    } else {
                        blogsByUser.push(currentBlog);
                    }
                }
            }
            callback(blogsByUser);
        };

        return {
            map: map,
            blogsArr: blogsArr,
            nameToId: CacheService.nameToId,
            getAllBlogs: CacheService.getAllBlogs,
            createBlogForUser: CacheService.createBlogForUser,
            fetchBlogsForUser: CacheService.fetchBlogsForUser
        };
    }
})();


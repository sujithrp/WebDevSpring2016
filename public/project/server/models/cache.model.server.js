/**
 * Created by SujithNarayan on 3/25/2016.
 */
var mock = require("./cache.mock.json");
var codeMock = require("./codeCache.mock.json");
module.exports = function() {
    var api = {
        nameToId: nameToId,
        codeToName: codeToName,
        nameToCode: nameToCode
    };
    return api;

    function nameToId(name) {
        var arrIndex;

        for (arrIndex in mock) {

            var nameInDB = mock[arrIndex].name.toLowerCase();
            var givenName = name.toLowerCase();

            if (nameInDB.replace(/ /g,"").trim() === givenName.replace(/ /g,"").trim()) {
                var idAndName = {
                    "id": mock[arrIndex].id,
                    "name": nameInDB
                };
                return idAndName;
            }

            var nameInDBArr = nameInDB.split(" ");
            var givenNameArr = givenName.split(" ");

            for (var i = 0; i < nameInDBArr.length; i++) {
                for (var j = 0; j < givenNameArr.length; j++) {
                    if (nameInDBArr[i] === givenNameArr[j]) {
                        var idAndName = {
                            "id": mock[arrIndex].id,
                            "name": nameInDB
                        };
                        return idAndName;
                    }
                }
            }
        }
    }

    function codeToName(code) {
        var index;

        for (index in codeMock) {
            var codeInDB = codeMock[index].code;
            if (codeInDB.replace(/ /g,"").trim() == code.replace(/ /g,"").trim()) {
                return codeMock[index].name;
            }
        }

    }

    function nameToCode(name) {
        var index;

        for (index in codeMock) {
            var nameInDB = codeMock[index].name;
            if (nameInDB.replace(/ /g,"").trim() == name.replace(/ /g,"").trim()) {
                return codeMock[index].code;
            }
        }
    }

};
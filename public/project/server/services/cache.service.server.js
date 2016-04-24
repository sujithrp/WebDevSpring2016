/**
 * Created by SujithNarayan on 3/25/2016.
 */
module.exports = function(app, model) {
    app.get("/api/project/nameToId/:name", nameToId);
    app.get("/api/project/codeToName/:code", codeToName);
    app.get("/api/project/nameToCode/:name", nameToCode);

    function nameToId(req, res) {
        var name = req.params.name;
        res.json(model.nameToId(name));
    }

    function nameToCode(req, res) {
        var name = req.params.name;
        res.json(model.nameToCode(name));
    }

    function codeToName(req, res) {
        var code = req.params.code;
        res.json(model.codeToName(code));
    }
};
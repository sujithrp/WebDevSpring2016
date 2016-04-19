/**
 * Created by SujithNarayan on 3/25/2016.
 */
module.exports = function(app, model) {
    app.get("/api/project/nameToId/:name", nameToId);
    app.get("/api/project/codeToName/:code", codeToName);

    function nameToId(req, res) {
        var name = req.params.name;
        res.json(model.nameToId(name));
    }

    function codeToName(req, res) {
        var code = req.params.code;
        res.json(model.codeToName(code));
    }
};
/**
 * Created by SujithNarayan on 3/25/2016.
 */
module.exports = function(app, model) {
    app.get("/api/project/nameToId/:name", nameToId);

    function nameToId(req, res) {
        var name = req.params.name;
        res.json(model.nameToId(name));
    }
};
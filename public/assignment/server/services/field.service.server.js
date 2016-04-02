/**
 * Created by SujithNarayan on 3/16/2016.
 */
module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdFormId);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        model.findFieldsByFormId(formId).then(
            function(fields) {
                res.json(fields);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findFieldByFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldByFieldIdFormId(formId, fieldId).then(
            function(field) {
                res.json(field);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFieldByFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldByFieldIdFormId(formId, fieldId).then(
            function(fields) {
                res.json(fields);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        model.createFieldForForm(formId, field).then(
            function(fields) {
                res.json(fields);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function updateFieldByFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model.updateFieldByFieldIdFormId(formId, fieldId, field).then(
            function(fields) {
                res.json(fields);
            },
            function (err) {
                res.status(400).send(err);
            }
        )
    }
};
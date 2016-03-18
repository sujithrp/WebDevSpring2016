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
        var fields = model.findFieldsByFormId(formId);
        res.json(fields);
    }

    function findFieldByFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findFieldByFieldIdFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldByFieldIdFormId(formId, fieldId);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        model.createFieldForForm(formId, field);
    }

    function updateFieldByFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model.updateFieldByFieldIdFormId(formId, fieldId, field);
    }
};
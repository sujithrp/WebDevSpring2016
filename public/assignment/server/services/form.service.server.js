/**
 * Created by SujithNarayan on 3/16/2016.
 */
module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        model.deleteFormById(formId);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        var currentFormsArr = model.createFormForUser(userId, newForm);
        res.json(currentFormsArr);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model.updateFormById(formId, form);
    }
};
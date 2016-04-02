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
        model.findAllFormsForUser(userId).then(
            function(forms) {
                res.json(forms);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        model.findFormById(formId).then(
            function(form) {
                res.json(form);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        model.deleteFormById(formId).then(
            function(forms) {
                res.json(forms);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        model.createFormForUser(userId, newForm).then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model.updateFormById(formId, form).then(
            function(updatedForm) {
                res.json(updatedForm);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }
};
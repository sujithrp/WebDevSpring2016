/**
 * Created by SujithNarayan on 3/15/2016.
 */
var q = require("q");
module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form',FormSchema);
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field',FieldSchema);

    var api = {
        findFormByTitle: findFormByTitle,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        createFieldForForm: createFieldForForm,
        updateFieldByFieldIdFormId: updateFieldByFieldIdFormId,
        deleteFieldByFieldIdFormId: deleteFieldByFieldIdFormId
    };
    return api;

    function findFormByTitle(title) {

        var deferred = q.defer();

        FormModel.findOne(

            { title: title },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function createFormForUser(userId, form) {

        form.userId = userId;
        form.created = new Date();
        var deferred = q.defer();

        FormModel.create(form,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;

    }

    function findAllFormsForUser(userId) {

        var deferred = q.defer();

        FormModel.find(

            { userId: userId },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {

        var deferred = q.defer();

        FormModel.remove(
            {_id: formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function updateFormById(formId, newForm) {

        var deferred = q.defer();

        FormModel.findById(
            {"_id": formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.title = newForm.formname;
                    doc.userId = newForm.userId;
                    doc.fields = newForm.fields;
                    doc.created = newForm.created;
                    doc.updated = new Date();
                    doc.save(function(err, savedDoc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(savedDoc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;

    }

    function findFieldByFieldIdFormId(formId, fieldId) {

        var deferred = q.defer();

        FormModel.findById(
            {"_id": formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FieldModel.findById(
                        {"_id": fieldId},
                        function(err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        }
                    )
                }
            });

        return deferred.promise;

    }

    function deleteFieldByFieldIdFormId(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(
            {"_id": formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FieldModel.remove(
                        {"_id": fieldId},
                        function(err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        }
                    )
                }
            });

        return deferred.promise;
    }

    function createFieldForForm(formId, field) {

        var deferred = q.defer();

        FormModel.findById(
            {"_id": formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    if (doc.fields.length == 0) {
                        deferred.resolve([field]);
                    } else {
                        deferred.resolve(doc.fields.push(field))
                    }
                }
            });

        return deferred.promise;
    }

    function updateFieldByFieldIdFormId(formId, fieldId, field) {
        var deferred = q.defer();

        FormModel.findById(
            {"_id": formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FieldModel.findById(
                        {"_id": fieldId},
                        function(err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                doc.label = field.label;
                                doc.type = field.type;
                                doc.placeholder = field.placeholder;
                                doc.options = field.options;
                            }
                        }
                    )
                }
            });

        return deferred.promise;
    }

};
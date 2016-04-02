/**
 * Created by SujithNarayan on 3/15/2016.
 */
var q = require("q");
module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form',FormSchema);
    var fieldModel = require("./field.model.server.js") (db,mongoose);
    //var FieldSchema = require("./field.schema.server.js")(mongoose);
    //var FieldModel = mongoose.model('Field',FieldSchema);

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


    /*
    * FIELDS *********************************************************
     */


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

    function createFieldForForm(formId, field) {

        var deferred = q.defer();

        FormModel.findById(
            {"_id": formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    fieldModel.createField(field).then(
                        function(createdField) {
                            if (doc.fields.length == 0) {
                                doc.fields = [createdField];
                            } else {
                                doc.fields.push(createdField);
                            }
                            doc.save(function(err, savedDoc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(savedDoc.fields);
                                }
                            });
                        },
                        function(err) {
                            deferred.resolve(err);
                        }
                    )
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
                    fieldModel.findFieldById(fieldId).then(
                        function(field) {
                            deferred.resolve(field);
                        },
                        function(err) {
                            deferred.reject(err);
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
                    fieldModel.deleteField(fieldId).then(
                        function(deletedField) {
                            //doc.fields.id(fieldId).remove();
                            var indexToBeDeleted;
                            for (var index in doc.fields) {
                                if (doc.fields[index]._id == fieldId) {
                                    indexToBeDeleted = index;
                                    break;
                                }
                            }
                            doc.fields.splice(indexToBeDeleted,1);
                            doc.save(function(err, savedDoc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(savedDoc.fields);
                                }
                            });
                        },
                        function(err) {
                            deferred.reject(err);
                        }
                    )
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
                    fieldModel.updateField(fieldId, field).then(
                        function(updatedField) {
                            var index;
                            var indexOfField;
                            for (index in doc.fields) {
                                if (doc.fields[index]._id == fieldId) {
                                    indexOfField = index;
                                    break;
                                }
                            }
                            doc.fields[indexOfField] = updatedField;

                            FormModel.update(
                                {_id: formId},
                                {$set : doc},
                                function(err, updatedForm) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        FormModel.findById(formId,function(err, doc){
                                            if (err) {
                                                deferred.reject(err);
                                            } else {
                                                deferred.resolve(doc.fields);
                                            }
                                        })
                                    }
                                }
                            )
                        },
                        function(err) {

                        }
                    )
                }
            });


        return deferred.promise;

    }

};
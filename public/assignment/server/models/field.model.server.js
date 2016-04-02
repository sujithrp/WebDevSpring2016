/**
 * Created by SujithNarayan on 4/1/2016.
 */
var q = require("q");
module.exports = function(db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field',FieldSchema);

    var api = {
        findFieldById: findFieldById,
        createField: createField,
        deleteField: deleteField,
        updateField: updateField
        //findFieldsByFormId: findFieldsByFormId,
        //findFieldByFieldIdFormId: findFieldByFieldIdFormId,
        //createFieldForForm: createFieldForForm,
        //updateFieldByFieldIdFormId: updateFieldByFieldIdFormId,
        //deleteFieldByFieldIdFormId: deleteFieldByFieldIdFormId
    };
    return api;

    function findFieldById(fieldId) {
        var deferred = q.defer();
        FieldModel.findById(fieldId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createField(field) {
        var deferred = q.defer();

        FieldModel.create(field,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function deleteField(fieldId) {
        var deferred = q.defer();

        FieldModel.remove(
            {_id: fieldId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FieldModel.findById(fieldId, function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            }
        );

        return deferred.promise;
    }

    function updateField(fieldId, newField) {

        var deferred = q.defer();

        FieldModel.update(
            {"_id": fieldId},
            {$set: newField},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FieldModel.findById(fieldId, function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    //function findFieldsByFormId(formId) {
    //    var deferred = q.defer();
    //    FormModel.findById(formId, function(err, doc) {
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //            deferred.resolve(doc.fields);
    //        }
    //    });
    //    return deferred.promise;
    //
    //}
    //
    //function findFieldByFieldIdFormId(formId, fieldId) {
    //
    //    var deferred = q.defer();
    //
    //    FormModel.findById(
    //        {"_id": formId},
    //        function(err, doc) {
    //            if (err) {
    //                deferred.reject(err);
    //            } else {
    //                FieldModel.findById(
    //                    {"_id": fieldId},
    //                    function(err, doc) {
    //                        if (err) {
    //                            deferred.reject(err);
    //                        } else {
    //                            deferred.resolve(doc);
    //                        }
    //                    }
    //                )
    //            }
    //        });
    //
    //    return deferred.promise;
    //
    //}
    //
    //function deleteFieldByFieldIdFormId(formId, fieldId) {
    //    var deferred = q.defer();
    //
    //    FormModel.findById(
    //        {"_id": formId},
    //        function(err, doc) {
    //            if (err) {
    //                deferred.reject(err);
    //            } else {
    //                FieldModel.remove(
    //                    {"_id": fieldId},
    //                    function(err, doc) {
    //                        if (err) {
    //                            deferred.reject(err);
    //                        } else {
    //                            deferred.resolve(doc);
    //                        }
    //                    }
    //                )
    //            }
    //        });
    //
    //    return deferred.promise;
    //}
    //
    //function createFieldForForm(formId, field) {
    //
    //    var deferred = q.defer();
    //
    //    FormModel.findById(
    //        {"_id": formId},
    //        function(err, doc) {
    //            if (err) {
    //                deferred.reject(err);
    //            } else {
    //                if (doc.fields.length == 0) {
    //                    deferred.resolve([field]);
    //                } else {
    //                    deferred.resolve(doc.fields.push(field))
    //                }
    //            }
    //        });
    //
    //    return deferred.promise;
    //}
    //
    //function updateFieldByFieldIdFormId(formId, fieldId, field) {
    //    var deferred = q.defer();
    //
    //    FormModel.findById(
    //        {"_id": formId},
    //        function(err, doc) {
    //            if (err) {
    //                deferred.reject(err);
    //            } else {
    //                FieldModel.findById(
    //                    {"_id": fieldId},
    //                    function(err, doc) {
    //                        if (err) {
    //                            deferred.reject(err);
    //                        } else {
    //                            doc.label = field.label;
    //                            doc.type = field.type;
    //                            doc.placeholder = field.placeholder;
    //                            doc.options = field.options;
    //                        }
    //                    }
    //                )
    //            }
    //        });
    //
    //    return deferred.promise;
    //}
};
/**
 * Created by SujithNarayan on 3/15/2016.
 */
var mock = require("./form.mock.json");
module.exports = function() {
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
        for (var u in mock) {
            var form = mock[u];
            if (title == form.title) {
                return form;
            }
        }
        return null;
    }

    function createFormForUser(userId, form) {
        var newForm = {
            _id: (new Date).getTime(),
            title: form.title,
            userId: userId,
            fields: form.fields
        };
        mock.push(newForm);
        return mock;
    }

    function findAllFormsForUser(userId) {
        var foundFormsArr = [];
        for (var u in mock) {
            var form = mock[u];
            if (userId == form.userId) {
                foundFormsArr.push(form);
            }
        }
        if (foundFormsArr.length != 0) {
            return foundFormsArr;
        }
        else {
            return null;
        }
    }

    function findFormById(formId) {
        for (var u in mock) {
            var form = mock[u];
            if (formId == form._id) {
                return form;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for (var u in mock) {
            var form = mock[u];
            if (formId == form._id) {
                mock.splice(formIndex, 1);
                return mock;
            }
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        for (var u in mock) {
            var formObj = mock[u];
            if (formId == formObj._id) {
                formObj.title = newForm.title;
                formObj.userId = newForm.userId;
                formObj.fields = newForm.fields;
                return mock;
            }
        }
        return null;
    }

    function findFieldsByFormId(formId) {
        for (var u in mock) {
            var formObj = mock[u];
            if (formId == formObj._id) {
                return formObj.fields;
            }
        }
        return null;
    }

    function findFieldByFieldIdFormId(formId, fieldId) {
        var formIndexToBeDeleted;
        var fieldIndexToBeDeleted;
        for (var u in mock) {
            var formObj = mock[u];
            if (formId == formObj.id) {
                for (var fieldIndex in formObj.fields) {
                    var fieldObj = formObj.fields[fieldIndex];
                    if (fieldObj._id == fieldId) {
                        formIndexToBeDeleted = u;
                        fieldIndexToBeDeleted = fieldIndex;
                        break;
                    }
                }
            }
        }
        if (formIndexToBeDeleted && fieldIndexToBeDeleted) {
            mock[formIndexToBeDeleted].fields.splice(fieldIndexToBeDeleted,1);
            return mock;
        } else {
            return null;
        }

    }

    function deleteFieldByFieldIdFormId(formId, fieldId) {
        for (var u in mock) {
            var formObj = mock[u];
            if (formObj._id == formId) {
                var fieldIndexToBeDeleted;
                for (var fieldIndex in formObj.fields) {
                    var fieldObj = formObj.fields[fieldIndex];
                    if (fieldObj._id == fieldId) {
                        fieldIndexToBeDeleted = fieldIndex;
                        break;
                    }
                }
                formObj.fields.splice(fieldIndexToBeDeleted,1);
                return;
            }
        }
    }

    function createFieldForForm(formId, field) {
        for (var u in mock) {
            var formObj = mock[u];
            if (formObj._id == formId) {
                var newField = {
                    "_id": (new Date).getTime(),
                    "label": field.label,
                    "type": field.type,
                    "placeholder": field.placeholder
                };
                if (formObj.fields.length == 0) {
                    formObj.fields = [newField];
                } else {
                    formObj.fields.push(newField);
                }
                return;
            }
        }
    }

    function updateFieldByFieldIdFormId(formId, fieldId, field) {
        for (var u in mock) {
            var formObj = mock[u];
            if (formObj._id == formId) {
                for (var fieldIndex in formObj.fields) {
                    var fieldObj = formObj.fields[fieldIndex];
                    if (fieldObj._id == fieldId) {
                        fieldObj.label = field.label;
                        fieldObj.type = field.type;
                        fieldObj.placeholder = field.placeholder;
                        return;
                    }
                }
            }
        }
    }
};
/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var formsArr = [];
        formsArr = [
            {
                "_id":"000",
                "title":"Contacts",
                "userId":123
            },
            {
                "_id":"010",
                "title":"ToDo",
                "userId":123
            },
            {
                "_id":"020",
                "title":"CDs",
                "userId":234
            }
        ];

        FormService.createFormForUser = function(userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.formname,
                userId: userId
            };
            formsArr.push(newForm);
            callback(newForm);
        };

        FormService.setCurrentFormsArr = function(formsArr) {
            $rootScope.currentFormsArr = formsArr;
        };

        FormService.findAllFormsForUser = function(userId,callback) {
            var formIndex;
            var foundFormsArr = [];
            for (formIndex in formsArr) {
                var form = formsArr[formIndex];
                if (userId === form.userId) {
                    foundFormsArr.push(form);
                }
            }
            if (foundFormsArr.length !== 0) {
                callback(foundFormsArr);
            }
            else {
                callback(null);
            }
        };

        FormService.deleteFormById = function(formId, callback) {
            var formIndex;

            for (formIndex in formsArr) {
                var form = formsArr[formIndex];
                if (formId === form._id) {
                    formsArr.splice(formIndex, 1);
                    callback(formsArray);
                }
            }
            callback(null);
        };

        FormService.updateFormById = function(formId, newForm, callback) {
            var formIndex;

            for (formIndex in formsArr) {
                var formObj = formsArr[formIndex];
                if (formId === formObj._id) {
                    formObj.title = newForm.title;
                    formObj.userId = newForm.userId;
                    callback(formObj);
                }
            }
            callback(null);
        };


        return {
            formsArr: formsArr,
            createFormForUser: FormService.createFormForUser,
            findAllFormsForUser: FormService.findAllFormsForUser,
            deleteFormById: FormService.deleteFormById,
            updateFormById: FormService.updateFormById,
            setCurrentFormsArr: FormService.setCurrentFormsArr
        };
    }
})();

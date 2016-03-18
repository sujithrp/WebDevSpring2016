/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        FormService.createFormForUser = function (userId, form) {
            var query = "/api/assignment/user/"+userId+"/form";
            return $http.post(query,form);
        };

        FormService.findAllFormsForUser = function (userId) {
            return $http.get("/api/assignment/user/"+userId+"/form");
        };

        FormService.deleteFormById = function (formId) {
            return $http.delete("/api/assignment/form/"+formId);
        };

        FormService.updateFormById = function (formId, newForm) {
            var query = "/api/assignment/form/"+formId;
            return $http.put(query,newForm);
        };


        return {
            createFormForUser: FormService.createFormForUser,
            findAllFormsForUser: FormService.findAllFormsForUser,
            deleteFormById: FormService.deleteFormById,
            updateFormById: FormService.updateFormById,
        };
    }
})();

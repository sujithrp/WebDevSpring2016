/**
 * Created by SujithNarayan.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        FieldService.createFieldForForm = function(formId, field) {
            var query = "/api/assignment/form/"+formId+"/field";
            return $http.post(query,field);
        };

        FieldService.getFieldsForForm = function(formId) {
            return $http.get("/api/assignment/form/"+formId+"/field");
        };

        FieldService.getFieldForForm = function(formId, fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        };

        FieldService.deleteFieldFromForm = function(formId, fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        };

        FieldService.updateField = function(formId, fieldId, field) {
            var query = "/api/assignment/form/"+formId+"/field/"+fieldId;
            return $http.put(query,field);
        };

        return {
            createFieldForForm: FieldService.createFieldForForm,
            getFieldsForForm: FieldService.getFieldsForForm,
            getFieldForForm: FieldService.getFieldForForm,
            deleteFieldFromForm: FieldService.deleteFieldFromForm,
            updateField: FieldService.updateField
        };
    }
})();

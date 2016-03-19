/**
 * Created by SujithNarayan on 2/25/2016.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {

        var formId = $routeParams.formId;

        FieldService.getFieldsForForm(formId).then(function(response) {
            $scope.fields = response.data;
        });

        $scope.addField = function(fieldType) {
            if (!fieldType) {
                return;
            }

            var field;
            if (fieldType == "Single Line Text") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType == "Multi Line Text Field") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "Date") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "Dropdown") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            }
            else if (fieldType == "Checkboxes") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            else if (fieldType == "Radio buttons") {
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]}
            }

            FieldService.createFieldForForm(formId, field).then(function(response) {
                $scope.fields = response.data;
            });
        };

        $scope.editField = function(index) {
            var fieldObj = $scope.fields[index];
            $scope.modalField = fieldObj;
            if (typeof(fieldObj.options) !== 'undefined') {
                var modalOptionString = '';
                for (var u in fieldObj.options) {
                    var modalOptionIntermediateString = fieldObj.options[u].label + ":" + fieldObj.options[u].value + "\n";
                    modalOptionString += modalOptionIntermediateString;
                }
                $scope.modalFieldOptions = modalOptionString;
            }
        };

        $scope.removeField = function(index) {
            var fieldObj = $scope.fields[index];
            FieldService.deleteFieldFromForm(formId, fieldObj._id).then(function(response) {
                $scope.fields = response.data;
            });
        };

    }

})();

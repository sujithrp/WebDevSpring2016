/**
 * Created by SujithNarayan on 2/25/2016.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, $rootScope, FieldService) {

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
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType == "Multi Line Text Field") {
                field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "Date") {
                field = {"label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "Dropdown") {
                field = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            }
            else if (fieldType == "Checkboxes") {
                field = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            else if (fieldType == "Radio buttons") {
                field = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
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
            $rootScope.fieldIndexBeingEdited = index;
            $scope.modalField = fieldObj;
            if (typeof(fieldObj.options) !== 'undefined' || fieldObj.options.length != 0) {
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

        $scope.updateField = function(newField) {
            var index = $rootScope.fieldIndexBeingEdited;
            var fieldObj = $scope.fields[index];
            FieldService.updateField(formId, fieldObj._id, newField).then(function(response) {
                $scope.fields = response.data;
                $scope.modalField = response.data;
                //$scope.modalFieldOptions = response.data.options;
                var fields = $scope.fields;
                for (var index in fields) {
                    if (typeof(fields[index].options) !== 'undefined' || fields[index].options.length != 0) {
                        var modalOptionString = '';
                        for (var u in fields[index].options) {
                            var modalOptionIntermediateString = fields[index].options[u].label + ":" + fields[index].options[u].value + "\n";
                            modalOptionString += modalOptionIntermediateString;
                        }
                        $scope.modalFieldOptions = modalOptionString;
                        break;
                    }
                }

            });
        }

    }

})();

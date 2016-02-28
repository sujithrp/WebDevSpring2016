/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, $scope, FormService) {


        // FIND FORM FOR A PARTICULAR USER
        var findFormCallback = function(foundFormsArr) {
            FormService.setCurrentFormsArr(foundFormsArr);
        };

        FormService.findAllFormsForUser($rootScope.currentUser._id,findFormCallback);


        // ADD FORM FOR A PARTICULAR USER
        var addFormCallback = function(newForm) {
            var existingForms = $rootScope.currentFormsArr;
            if (existingForms != null) {
                existingForms.push(newForm);
            }
            else {
                existingForms = [newForm];
            }
            FormService.setCurrentFormsArr(existingForms);
            $scope.form = null;
        };

        $scope.addForm = function(form) {
            FormService.createFormForUser($rootScope.currentUser._id,form,addFormCallback);
        };

        var formIndex;
        // SELECT A PARTICULAR FORM
        $scope.selectForm = function(selectedFormIndex) {
            formIndex = selectedFormIndex;
            $scope.form = $rootScope.currentFormsArr[selectedFormIndex];
            $scope.form.formname = $scope.form.title;
        };

        // UPDATE A PARTICULAR FORM
        $scope.updateForm = function(form) {
            var existingFormsArr = $rootScope.currentFormsArr;
            existingFormsArr[formIndex].title=form.formname;
            FormService.setCurrentFormsArr(existingFormsArr);
            $scope.form = null;
        };

        // DELETE A PARTICULAR FORM
        var deleteFormCallback = function(remainingFormsArr) {
            FormService.setCurrentFormsArr(remainingFormsArr);
        };

        $scope.deleteForm = function(deleteFormIndex) {
            var existingFormsArr = $rootScope.currentFormsArr;
            FormService.deleteFormById(existingFormsArr[deleteFormIndex]._id, existingFormsArr, deleteFormCallback);
        }
    }

})();

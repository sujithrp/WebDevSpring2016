/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, $scope, FormService) {


        //// FIND FORM FOR A PARTICULAR USER
        //var findFormCallback = function(foundFormsArr) {
        //    FormService.setCurrentFormsArr(foundFormsArr);
        //};

        FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(response) {
            $scope.currentFormsArr = response.data;
        });


        // ADD FORM FOR A PARTICULAR USER
        //var addFormCallback = function(newForm) {
        //    var existingForms = $scope.currentFormsArr;
        //    if (existingForms != null) {
        //        existingForms.push(newForm);
        //    }
        //    else {
        //        existingForms = [newForm];
        //    }
        //    FormService.setCurrentFormsArr(existingForms);
        //    $scope.form = null;
        //};

        $scope.addForm = function(form) {
            FormService.createFormForUser($rootScope.currentUser._id,form).then(function(response) {
                $scope.currentFormsArr.push(response.data);
            });
            $scope.form = null;
        };

        var formIndex;
        // SELECT A PARTICULAR FORM
        $scope.selectForm = function(selectedFormIndex) {
            formIndex = selectedFormIndex;
            $scope.form = $scope.currentFormsArr[selectedFormIndex];
            $scope.form.formname = $scope.form.title;
        };

        // UPDATE A PARTICULAR FORM
        $scope.updateForm = function(form) {
            var existingFormsArr = $scope.currentFormsArr;
            var indexToBeUpdated = formIndex;
            FormService.updateFormById(existingFormsArr[indexToBeUpdated]._id,form).then(function(response) {
                console.log("response");
                console.log(response.data);
                $scope.currentFormsArr[indexToBeUpdated] = response.data;
            });
            $scope.form = null;
            formIndex = null;
        };

        //// DELETE A PARTICULAR FORM
        //var deleteFormCallback = function(remainingFormsArr) {
        //    FormService.setCurrentFormsArr(remainingFormsArr);
        //};

        $scope.deleteForm = function(deleteFormIndex) {
            FormService.deleteFormById($scope.currentFormsArr[deleteFormIndex]._id).then(function(response) {
                $scope.currentFormsArr.splice(deleteFormIndex,1);
            })
        }
    }

})();

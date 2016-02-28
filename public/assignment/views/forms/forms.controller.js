/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
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
            existingForms.push(newForm);
            FormService.setCurrentFormsArr(existingForms);
            $scope.form = null;
        };

        $scope.addForm = function(form) {
            FormService.createFormForUser($rootScope.currentUser._id,form,addFormCallback);
        };

        // SELECT A PARTICULAR FORM
        $scope.selectForm = function(selectedFormIndex) {
            $scope.form = $rootScope.currentFormsArr[selectedFormIndex];
            $scope.form.formname = $scope.form.title;
        };


    }

})();

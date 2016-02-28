/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, FormService) {
        var user = $rootScope.currentUser;

        var findFormCallback = function(formsArr) {
            $scope.formsArr = formsArr;
            console.log($scope.formsArr);
        };

        FormService.findAllFormsForUser(user._id,findFormCallback);

        var addFormCallback = function(newForm) {};

        $scope.addForm = function(form) {
            FormService.createFormForUser(user._id,form,addFormCallback);
        };

        $scope.updateForm = function(form) {
        };

        $scope.selectForm = function(index) {
            var selectedForm = FormService.formsArr[index];
            $scope.form.name = selectedForm.title;
        };

        var deleteFormCallback = function(arrayOfForms) {};

        $scope.deleteForm = function(index) {
            var formToBeDeleted = FormService.formsArr[index];
            FormService.deleteFormById(formToBeDeleted._id,deleteFormCallback);
        };

    }

})();

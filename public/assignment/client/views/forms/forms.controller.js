/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, $scope, FormService, UserService) {

        function init() {
            UserService
                .getCurrentUser()
                .then(function (res) {
                    console.log(res.data);
                    $rootScope.currentUser = res.data;
                    console.log("this is the user");
                    console.log($rootScope.currentUser);
                    $scope.message = null;

                    $scope.user = $rootScope.currentUser;

                    FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(response) {
                        $scope.currentFormsArr = response.data;
                    });
                });
        }

        init();


        $scope.addForm = function(passedForm) {
            var form = {};
            if (passedForm) {
                form.title = passedForm.formname;
            } else {
                form.title = "New Form";
            }

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
                $scope.currentFormsArr[indexToBeUpdated] = response.data;
            });
            $scope.form = null;
            formIndex = null;
        };

        $scope.deleteForm = function(deleteFormIndex) {
            FormService.deleteFormById($scope.currentFormsArr[deleteFormIndex]._id).then(function(response) {
                $scope.currentFormsArr.splice(deleteFormIndex,1);
            })
        }
    }

})();

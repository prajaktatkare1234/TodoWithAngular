App.controller('resetpasswordController', function($scope, $state, todo_service, $rootScope, $window) {
    $scope.regex_password = /[a-z]{5,8}$/;

    //fuction to check whether the enterd email is already registered or not
    $scope.resetPassword = function() {

        var verifyEmail = $scope.verifyEmail;
        var object = {
            email: verifyEmail
        }
        console.log(object);
        var url = "/verifyEmail";
        var action = "PUT";
        var obj = todo_service.App(url, action, object);

        obj.then(function(data) {

            if (data.data.status == true)

            {

                $window.alert("link for changing the password is send to the registered email");

            } else {
                $window.alert("Email address is not registered");

                $state.go('verifyEmail');

            }

          }).catch(function(error) {
            console.log(error);
          })
        };




// function called for changing the password
    $scope.submit = function() {

        var a = $state.href('changePassword', $state.params, {});
        var hash = a.split("Password/");
        var token = hash[1];

        var newPassword = $scope.newPass;
        var url = "/signUp";
        var object = {
            password: $scope.newPass,
            updation: "change",
            token: token
        }
        var action = "POST";
        var obj = todo_service.App(url, action, object);
        obj.then(function(data) {

            if (data.data.status == true) {
                $window.alert("Password is changed successfully");

                $state.go('signin');
            } else {

                $state.go('changePassword');

            }

        }).catch(function(error) {

        })
    };



});

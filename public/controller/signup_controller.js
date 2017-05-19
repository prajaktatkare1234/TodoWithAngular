App.controller('signup_controller', function($scope, signup_service) {
    $scope.regex_email = /[a-z0-9._-]+@[a-z]+\.+[a-z]{2,3}$/;
    $scope.regex_password = /[a-z]{5,8}$/;



    $scope.sign_up = function() {
        var name = $scope.name;
        var email = $scope.email;
        var password = $scope.pass;
        var repass = $scope.repass;
        console.log(email);
        // App.directive('confirm_pass', function(password, repass) {
        //     if (password == repass)
        //         console.log("same");
        //     return {
        //         template: "<h1>Made by a directive!</h1>"
        //  };
        // });

        var object = {
            name: name,
            email: email,
            password: password
        }
        var obj = signup_service.App(object);
        obj.then(function(data) {

        }).catch(function(error) {

        })
    }

});
App.service('signup_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "http://localhost:8081/sign_up",
            method: "POST",
            data: object
        });
    }
});

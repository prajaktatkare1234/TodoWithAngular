App.controller('signupController', function($scope,$state,todo_service) {
    $scope.regex_email = /[a-z0-9._-]+@[a-z]+\.+[a-z]{2,3}$/;
    $scope.regex_password = /[a-z]{5,8}$/;


// function create new account
    $scope.sign_up = function() {

      var object = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.pass
      }
      var url= "/signUp";
      var action="POST";
      var obj = todo_service.App(url,action,object);
      obj.then(function(data) {

        if(data.data.status==true)

        {

          $state.go('signin');
        }
        else{
          $state.go('signup');
        }

      }).catch(function(error) {

      })
    }


});

App.controller('signupController', function($scope,$state,todo_service) {
    $scope.regex_email = /[a-z0-9._-]+@[a-z]+\.+[a-z]{2,3}$/;
    $scope.regex_password = /[a-z]{5,8}$/;



    $scope.sign_up = function() {
        var name = $scope.name;
        var email = $scope.email;
        var password = $scope.pass;
        var repass = $scope.repass;



        var object = {
            name: name,
            email: email,
            password: password
        }
          var url= "/signUp";
            var action="POST";
        var obj = todo_service.App(url,action,object);
        obj.then(function(data) {
          console.log(data);
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

App.controller('signup_controller', function($scope,$state,todo_service) {
    $scope.regex_email = /[a-z0-9._-]+@[a-z]+\.+[a-z]{2,3}$/;
    $scope.regex_password = /[a-z]{5,8}$/;



    $scope.sign_up = function() {
        var name = $scope.name;
        var email = $scope.email;
        var password = $scope.pass;
        var repass = $scope.repass;
        // console.log(email);


        var object = {
            name: name,
            email: email,
            password: password
        }
          var url= "/sign_up";
        var obj = todo_service.App(url,object);
        obj.then(function(data) {
          console.log(data);
          if(data.data.status==true)

          {
            console.log("sdfjkadkjfdksf");
            $state.go('signin');
          }
          else{
            $state.go('signup');
          }

        }).catch(function(error) {

        })
    }

});

App.controller('signin_controller', function($scope,$state,signin_service,check_service) {
    console.log("gfghjfghfjgh");

    $scope.check=function(){
      console.log("inside check");
      var obj = check_service.App();
      obj.then(function(data) {
        if(data.data.status==true)
        {
          $state.go('welcome');
        }
        else{
            $state.go('signin');
        }
      }).catch(function(error) {

      })

    }
    $scope.check();




    $scope.sign_in = function() {
        var email_id = $scope.uname;
        var password = $scope.pass;
        console.log(email_id);
        console.log(password);
        var object = {
            email: email_id,
            password: password

        }

        var obj = signin_service.App(object);
        obj.then(function(data) {
          console.log(data.data.status,"sign_in");
          if(data.data.status==true)
          {
            // $location.path('/welcome');
            $state.go('welcome');
        }
          else{
            console.log("ghfhjhj");
              $state.go('signin');
          }

        }).catch(function(error) {

        })
    }
  });

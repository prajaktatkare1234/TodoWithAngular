App.controller('signin_controller', function($scope,$state,todo_service) {
    console.log("gfghjfghfjgh");

    $scope.check=function(){
      console.log("inside check");
         var url= "/user_info/";
      var obj = todo_service.App(url);
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
          var url= "/sign_in";

        var obj = todo_service.App(url,object);
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

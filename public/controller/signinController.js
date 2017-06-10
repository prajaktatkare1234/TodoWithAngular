App.controller('signinController', function($scope,$state,todo_service,$rootScope) {
    console.log("gfghjfghfjgh");

    $rootScope.check=function(){
        console.log("inside check");
           var url= "/userInfo/";
        var obj = todo_service.App(url);
        obj.then(function(data) {
          if(data.data.status==true)
          { $rootScope.user_data=data.data.user_data;
            // console.log($rootScope.user_data,"dggadsfgfd");
            $rootScope.myImage=data.data.user_data.original_pic;
            console.log("hgsajfsdaf",data.data.user_data);
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
          var url= "/signIn";

        var obj = todo_service.App(url,object);
        obj.then(function(data) {
          console.log(data.data.status,"sign_in");
          if(data.data.status==true)
          {
            // console.log(data.data);
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

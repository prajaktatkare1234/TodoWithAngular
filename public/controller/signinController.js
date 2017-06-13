App.controller('signinController', function($scope,$state,todo_service,$rootScope,$auth) {


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

      // $scope.authenticate = function(provider) {
      //     $auth.authenticate(provider);
      //   };
      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
       .then(function() {
        //  toastr.success('You have successfully signed in with ' + provider + '!');
         $state.go('/');
        console.log("logged in");
       })
       .catch(function(error) {
         if (error.message) {
           // Satellizer promise reject error.
          //  toastr.error(error.message);
         } else if (error.data) {
           // HTTP response error from server
          //  toastr.error(error.data.message, error.status);
         } else {
          //  toastr.error(error);
         }
       });
   };



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

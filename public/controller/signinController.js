App.controller('signinController', function($scope, $state, todo_service, $rootScope, $auth) {

// function to check whether the user is already logged in or not
    $scope.check = function() {

        var url = "/userInfo/";
        var action="POST";
        var obj = todo_service.App(url,action);
        obj.then(function(data) {
            if (data.data.status == true) {
                // $rootScope.user_data = data.data.user_data;
                // $rootScope.myImage = data.data.user_data.original_pic;

                $state.go('welcome');

            } else {
                $state.go('signin');
            }
        }).catch(function(error) {

        })

    }
    $scope.check();


    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function() {
                //  toastr.success('You have successfully signed in with ' + provider + '!');

                $state.go('welcome');

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

      var object = {
        email: $scope.uname,
        password: $scope.pass

      }
      var url = "/signIn";
      var action="POST";
      var obj = todo_service.App(url, action,object);
      obj.then(function(data) {

        if (data.data.status == true) {

          $state.go('welcome');
        } else {

          $state.go('signin');
        }

      }).catch(function(error) {

      })
    }

});

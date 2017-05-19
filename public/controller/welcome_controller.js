App.controller('welcome_controller', function($scope, $location,data_service, get_service,delete_service,logout_service) {
    $scope.custom = true;
    $scope.view = true;
    $scope.sidebar = true;

    $scope.logout = function() {

      console.log("logout");
        var obj = logout_service.App();
        obj.then(function(data) {
          if(data.data.status==false)
          {
            $location.path('/signin');
          }


        }).catch(function(error) {

        })
        // $scope.get_data();
    }




    $scope.save = function() {

        var object = $scope.task
        console.log(object);
        var obj = data_service.App(object);
        obj.then(function(data) {



        }).catch(function(error) {

        })
        $scope.get_data();
    }



    $scope.get_data = function() {


        var obj = get_service.App();
        obj.then(function(data) {
            console.log("data", data.data.data_info);
            if (data.data.status == true) {
                var cards = [];
                for (var i = data.data.data_info.length - 1; i >= 0; i--) {
                    cards[cards.length] = data.data.data_info[i];
                }

                $scope.data_info = cards;
            }
        }).catch(function(error) {

        })
    }


    $scope.menu = function() {
        console.log($scope.sidebar);
        if (!$scope.sidebar) {
            $scope.content = {
                'margin-left': "100px",
                "transition": "all 0.5s ease"
            }
            // $scope.side={
            //
            //       'margin-left':"140px",
            //        "display":"none"
            // }
        }
        if ($scope.sidebar) {
            $scope.content = {
                'margin-left': "0px",
                "transition": "all 0.5s ease"
            }
            // $scope.side={
            //   'margin-left':"-140px",
            //
            //
            // }
        }


    }
    $scope.delete = function() {
        console.log("dfadsf");
        var obj = delete_service.App();
        obj.then(function(data) {


        }).catch(function(error) {
            console.log("err");

        })
    }

    $scope.get_data();

});
App.service('data_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "http://localhost:8081/data_card",
            method: "POST",
            data: object
        });
    }
});
App.service('get_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "http://localhost:8081/get_data_card",
            method: "POST",

        });
    }
});
App.service('delete_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "http://localhost:8081/delete_data_card",
            method: "POST",

        });
    }
});
App.service('logout_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "http://localhost:8081/logout",
            method: "POST",
            // data: object
        });
    }
});

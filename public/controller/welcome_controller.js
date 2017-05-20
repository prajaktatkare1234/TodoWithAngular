App.controller('welcome_controller', function($scope,$uibModal,$state,$localStorage,data_service,get_service,delete_service,logout_service) {
    $scope.custom = true;
    $scope.sidebar = true;
    $scope.pop = true;


    $scope.open=function(title,note,id) {
// $scope.open=function(id) {
  // console.log(id);
  console.log($scope.data_info);
      var Data_object={
        title:title,
        note:note,
        id:id

      }
      console.log('opening pop up',$scope.data_info);
      var modalInstance = $uibModal.open({
      templateUrl: '../html/popup.html',
      controller: 'popup_controller',
      resolve: {
      object: function () {
      return Data_object;
    }
  }
  });
  }







    $scope.logout = function() {

      console.log("logout");
        var obj = logout_service.App();
        obj.then(function(data) {
          if(data.data.status==false)
          {
            $state.go('signin');
          }
        }).catch(function(error) {

        })

    }






    $scope.save = function() {
      var title=$scope.title;
      var take_note=$scope.take_note;
      console.log($scope.title);
      var object={
         title:title,
        take_note:take_note

      }
      // console.log( $scope.task);

        // var object = $scope.task;
        console.log("inside",object);
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
                  // console.log(cards[i].);

                }


                $scope.data_info = cards;
                console.log("crads",  $scope.data_info);
                if($localStorage.view=="grid"){

                    $scope.grid_view();
                }
                else{
                    $scope.list_view();
                }

            }
        }).catch(function(error) {

        })
    }


    $scope.menu = function() {
        console.log($scope.sidebar);
        if(window.innerwidth>"600px"){
        if (!$scope.sidebar) {
            $scope.content = {
                'margin-left': "100px",
                "transition": "all 0.5s ease"
            }

        }
        if ($scope.sidebar) {
            $scope.content = {
                'margin-left': "0px",
                "transition": "all 0.5s ease"
            }

        }
      }


    }

    $scope.list_view = function() {
      $localStorage.view = "list";
        $scope.list_v=true;
        $scope.grid_v=false;
      $scope.list={
        'display':'none'
      }
      $scope.grid={
        'display':'block'
      }

    }
    $scope.grid_view = function() {
    $localStorage.view = "grid";
      $scope.grid_v=true;
      $scope.list_v=false;

      console.log("hghj");
      $scope.grid={
        'display':'none'

      }
      $scope.list={
        'display':'block'
      }


    }
    $scope.delete = function(id) {
        console.log("xdfdgdrnggfhhgf");
        var obj = delete_service.App(id);
        obj.then(function(data) {


        }).catch(function(error) {
            console.log("err");

        })
          $scope.get_data();
    }

    $scope.get_data();

});
// App.service('data_service', function($http) {
//     this.App = function(object) {
//         return $http({
//             url: "/data_card",
//             method: "POST",
//             data: object
//         });
//     }
// });
// App.service('get_service', function($http) {
//     this.App = function(object) {
//         return $http({
//             url: "/get_data_card",
//             method: "POST",
//
//         });
//     }
// });
// App.service('delete_service', function($http) {
//   // console.log(id);
//     this.App = function(id) {
//         return $http({
//             url: "/delete_data_card/" + id + "",
//             method: "POST",
//
//         });
//     }
// });
// App.service('logout_service', function($http) {
//     this.App = function(object) {
//         return $http({
//             url: "http://localhost:8081/logout",
//             method: "POST",
//             // data: object
//         });
//     }
// });

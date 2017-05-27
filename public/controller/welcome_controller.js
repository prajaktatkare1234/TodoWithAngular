App.controller('welcome_controller', function($scope,$uibModal,$state,$localStorage,$rootScope,data_service,get_service,delete_service,logout_service,reminder_service,delete_reminder_service,color_service) {
    // $scope.myDate = new Date();
    $scope.custom = true;
    $scope.sidebar = true;
    $scope.pop = true;
    // $scope.current_date=new Date();
    $scope.today="today";
    $scope.tomorrow="tomorrow";
    $scope.next="next";

    $scope.bgcolor=[{
        "color":"#ffffff",
        "path":"../image/Ok-24.png"
      },
      {
        "color":"#80f8ff",
        "path":"../image/blue.png"
      },
      {
        "color":"#ccff90",
        "path":"../image/green.png"
      },
      {
        "color":"#a7ffeb",
        "path":"../image/light_blue.png"
      },
      {
        "color":"#cfd8dc",
        "path":"../image/grey.png"
      },
      {
        "color":"#ffb366",
        "path":"../image/yellow.png"
      },
      {
        "color":"#ffff99",
        "path":"../image/light_yellow.png"
      }
    ]
    // console.log(bgcolor);

    $scope.date_check=function(){
    console.log($scope.datepicker);
  };

    $scope.select_color=function(id,color){

    console.log(color,id);
    // $scope.bgcolor="#"+color;
    // console.log($scope.bgcolor);

    var obj = color_service.App(id,color);
    obj.then(function(data) {

    }).catch(function(error) {

    })
      $scope.get_data();

  };



    $scope.remind = function(id,time) {
      console.log(id);
      // $scope.id=x._id
      var date=new Date();
      console.log("remind");
      $scope.time=time;
      if($scope.time=="today")
      { var today_r= new Date(date);
        today_r.setHours(20,00,00)
          $scope.remind_at=new Date(today_r)
        console.log($scope.remind_at,"today");
      }
      if($scope.time=="tomorrow")
      {
        var tomorrow_r= new Date(date);
        tomorrow_r.setDate(tomorrow_r.getDate()+1);
        tomorrow_r.setHours(20,00,00)
        $scope.remind_at=new Date(tomorrow_r)
        console.log( $scope.remind_at,"tomorrow");
      }
      if($scope.time=="next")
      {
        var next_r= new Date(date);
        next_r.setDate(date.getDate()+7);
        next_r.setHours(20,00,00)
        $scope.remind_at=new Date(next_r)
        console.log( $scope.remind_at,"next");
      }

        var obj = reminder_service.App(id,$scope.remind_at);
        obj.then(function(data) {

        }).catch(function(error) {

        })
                $scope.get_data();

    }








    $scope.open=function(x) {
      console.log("x",x);
      var Data_object={
        title:x.title,
        note:x.take_note,
        id:x._id,
        updated:x.updated

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
  modalInstance.result.catch(function(error){
    console.log(error);
  })
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
    $scope.copy= function(x){
      var obj = data_service.App(x);
      obj.then(function(data) {

      }).catch(function(error) {

      });
        $scope.get_data();
    }

    $scope.delete_reminder= function(x){
      console.log(x,"hgjhghghjg");
      var obj = delete_reminder_service.App(x);
      obj.then(function(data) {

      }).catch(function(error) {

      });
        $scope.get_data();
    }





    $scope.save = function() {
      if($scope.title=="" && $scope.take_note=="")
      {
        return;
      }
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
        $scope.title=null;
        $scope.take_note=null;
        var obj = data_service.App(object);
        obj.then(function(data) {




        }).catch(function(error) {

        })
        $scope.get_data();
    }



    $rootScope.get_data = function() {


        var obj = get_service.App();
        obj.then(function(data) {
            console.log("data", data.data.data_info);
            if (data.data.status == true) {
                var cards = [];
                for (var i = data.data.data_info.length - 1; i >= 0; i--) {
                    cards[cards.length] = data.data.data_info[i];


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
        if(window.innerWidth > 600){
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

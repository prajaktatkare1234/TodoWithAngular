  App.controller('welcome_controller', function($scope,$uibModal,$state,$localStorage,$rootScope,todo_service) {

    $scope.custom = true;
    $scope.sidebar = true;
    $scope.pop = true;
    $scope.input_div=true;
    $scope.today="today";
    $scope.tomorrow="tomorrow";
    $scope.next="next";
console.log( $scope.input_div);

      $rootScope.check=function(){
          console.log("inside check");
             var url= "/user_info/";
          var obj = todo_service.App(url);
          obj.then(function(data) {
            if(data.data.status==true)
            { $rootScope.user_data=data.data.user_data;
              $rootScope.myImage=data.data.user_data.original_pic;
              var str=window.location.hash;
                console.log(hash);
                var hash=hash.split("/");
                  // console.log(hash);
                  if(hash[1]=="welcome")
                  {
                   $state.go('welcome');
                  }
                  if(hash[1]=="archive")
                  {
                   $state.go('archive');
                  }

            }
            else{
                $state.go('signin');
            }
          }).catch(function(error) {

          })

        }
        $scope.check();




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

  //   $scope.date_check=function(){
  //   console.log($scope.datepicker);
  // };
  //

  $scope.reload=function(){
    $state.reload();
  };

    $scope.select_color=function(id,color){

    console.log(color,id);


    var bg_color_object={
      bgcolor:color
    }
    var url= "/bgcolor/" + id + "";

    var obj = todo_service.App(url,bg_color_object,id);
    obj.then(function(data) {

    }).catch(function(error) {

    })
      $scope.get_data();

  };



    $scope.remind = function(id,time) {
      console.log(id,time,"hhgfgh");
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
      else if($scope.time=="tomorrow")
      {
        var tomorrow_r= new Date(date);
        tomorrow_r.setDate(tomorrow_r.getDate()+1);
        tomorrow_r.setHours(20,00,00)
        $scope.remind_at=new Date(tomorrow_r)
        console.log( $scope.remind_at,"tomorrow");
      }
    else  if($scope.time=="next")
      {
        var next_r= new Date(date);
        next_r.setDate(date.getDate()+7);
        next_r.setHours(20,00,00)
        $scope.remind_at=new Date(next_r)
        console.log( $scope.remind_at,"next");
      }
      else{

        $scope.remind_at=new Date(time);
      }
      var remind_at_Object={
        remind_at:$scope.remind_at
      }
        var url="/reminder/" + id + "";

        var obj = todo_service.App(url,remind_at_Object,id);
        obj.then(function(data) {

        }).catch(function(error) {

        })
        $scope.get_data();

    };

    $scope.profile_pic=function() {
      console.log("sadKDSFG");

      var modalInstance = $uibModal.open({

      templateUrl: '../html/profile_pic.html',
      controller: 'profile_pic_controller',

      resolve: {

      object: function () {
      // return Data_object;
    }
  }
  });
  modalInstance.result.catch(function(error){
    console.log(error);
  })
};









    $scope.open=function(x) {
      console.log("x",x);
      var Data_object={
        title:x.title,
        note:x.take_note,
        id:x._id,
        updated:x.updated,
        bgcolor:x.bgcolor

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
};

$scope.archive=function(id,archive,pin)
{
  var archive_obj={

    archive:archive,
    pinned:pin
  }
  var url="/archive/" + id + "";
  var obj = todo_service.App(url,archive_obj);
  obj.then(function(data) {
    // $scope.get_data();
    $state.reload();

  }).catch(function(error) {

  })
};



$scope.pinup=function(id,pin,archive)
{
  // console.log(data,"gjkfgj");
  // var value="true";
  var url="/pinup/" + id + "";
  var obj={
    pin:pin,
    archive:archive
  }

  var obj = todo_service.App(url,obj);
  obj.then(function(data) {
    $scope.get_data();
    // $state.reload();

  }).catch(function(error) {

  })

};









    $scope.logout = function() {

      console.log("logout");
        var url="/logout";
        var obj = todo_service.App(url);
        obj.then(function(data) {
          if(data.data.status==false)
          {
            $state.go('signin');
          }
        }).catch(function(error) {

        })

    };


    $scope.copy= function(x){
      var url=  "/data_card";
      var obj = todo_service.App(url,x);
      obj.then(function(data) {

      }).catch(function(error) {

      });
        $scope.get_data();
    };

    $scope.delete_reminder= function(id){

        var url= "/delete_reminder/" + id + "";
      var obj = todo_service.App(url);
      obj.then(function(data) {

      }).catch(function(error) {

      });
        $scope.get_data();
    };





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
    var url=  "/data_card";
        console.log("inside",object);
        $scope.title=null;
        $scope.take_note=null;
        var obj = todo_service.App(url,object);
        obj.then(function(data) {




        }).catch(function(error) {

        })
        $scope.get_data();
    };



    $rootScope.get_data = function() {
      console.log("hghjhgj");
      var url="/get_data_card";
        var obj = todo_service.App(url);
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
    };


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


    };

    $scope.list_view = function() {
      $localStorage.view = "list";
        // $scope.list_v=true;
        // $scope.grid_v=false;
        $scope.grid_show="grid_card";
        $scope.innerbox="innerbox1";
        $scope.view_change="col-sm-10 col-lg-9 col-xs-12 col-md-12 a";
        $scope.pin_view="col-sm-10 col-lg-9 col-xs-12 col-md-12 a"

      $scope.list={
        'display':'none'
      }
      $scope.grid={
        'display':'block'
      }


    };
    $scope.grid_view = function() {
    $localStorage.view = "grid";
      // $scope.grid_v=true;
      // $scope.list_v=false;
      $scope.grid_show="grid_card";
      $scope.innerbox="innerbox ";
      $scope.view_change="col-sm-8 col-lg-4 col-xs-12 col-md-4 a";
      $scope.pin_view="col-sm-8 col-lg-4 col-xs-12 col-md-4 a"




      console.log("hghj");
      $scope.grid={
        'display':'none'

      }
      $scope.list={
        'display':'block'
      }


    };
    $scope.delete = function(id) {
        console.log("xdfdgdrnggfhhgf");
        var url="/delete_data_card/" + id + "";
        console.log(url);
        var obj = todo_service.App(url);
        obj.then(function(data) {


        }).catch(function(error) {
            console.log("err");

        })
          $scope.get_data();
    };

    $scope.get_data();

});

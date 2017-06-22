  App.controller('welcomeController', function($scope, $uibModal, $interval, $state, $localStorage, $rootScope, todo_service, ngNotify, $auth) {
      console.log("in welcomeController");
      $scope.custom = true;
      $scope.sidebar = true;
      $scope.pop = true;
      $scope.input_div = true;
      $scope.reminder_div = true;
      $scope.bin_view = true;
      $scope.today = "today";
      $scope.tomorrow = "tomorrow";
      $scope.next = "next";
      $scope.keep = "keep";


      $rootScope.check = function() {
          console.log("inside check");
          var url = "/userInfo/";
          var action="POST";

          var obj = todo_service.App(url,action);
          obj.then(function(data) {
              console.log(data, "data");
              if (data.data.status == true) {
                  $rootScope.user_data = data.data.user_data;
                  if (!('local' in data.data.user_data)) {
                      $rootScope.myImage = data.data.user_data.social.picture;
                  } else {
                      $rootScope.myImage = data.data.user_data.local.original_pic;
                  }

                  var str = window.location.hash;
                  console.log(hash);
                  var hash = hash.split("/");

                  if (hash[1] == "welcome") {

                      $state.go('welcome');
                  }
                  if (hash[1] == "archive") {
                      $state.go('archive');
                  }

              } else {

              }
          }).catch(function(error) {

          })

      }
      $scope.check();








      $scope.bgcolor = [{
              "color": "#ffffff",
              "path": "../image/Ok-24.png"
          },
          {
              "color": "#80f8ff",
              "path": "../image/blue.png"
          },

          {
              "color": "#ccff90",
              "path": "../image/green.png"
          },
          {
              "color": "#80d8ff",
              "path": "../image/light_blue.png"
          },
          {
              "color": "#cfd8dc",
              "path": "../image/grey.png"
          },
          {
              "color": "#ff8a80",
              "path": "../image/yellow.png"
          },
          {
              "color": "#ffff99",
              "path": "../image/light_yellow.png"
          }
      ]


      $scope.reload = function() {
          $state.reload();
      };

      $scope.select_color = function(id, color) {



          var bg_color_object = {
              bgcolor: color
          }
          var url = "/bgColor/" + id + "";
          var action="POST";
          var obj = todo_service.App(url,action, bg_color_object);
          obj.then(function(data) {

          }).catch(function(error) {

          })
          $scope.get_data();

      };

      $scope.facebookshare=function(todo){
		console.log("facebook share")
		FB.init({
			appId : '1783193788658916',
			status: true,
			xfbml : true
		});
		 FB.ui({
	           method: 'share_open_graph',
	           action_type: 'og.shares',
	           action_properties: JSON.stringify({
	               object : {
	                  // your url to share
	                  'og:title': todo.title,
	                  'og:description': todo.take_note,
	                  /*'og:image': 'http://example.com/link/to/your/image.jpg'*/
	               }
	           })
	           },
	           // callback
	           function(response) {
	           if (response && !response.error_message) {
	               // then get post content
	               alert('successfully posted. Status id : '+response.post_id);
	           } else {
	               alert('Something went error.');
	           }
	       });

	};



      $scope.remind = function(id, time) {
          console.log(id, time, "hhgfgh");
          // $scope.id=x._id
          var date = new Date();
          console.log("remind");
          $scope.time = time;
          if ($scope.time == "today") {
              var today_r = new Date(date);
              today_r.setHours(20, 00, 00)
              $scope.remind_at = new Date(today_r)
              console.log($scope.remind_at, "today");
          } else if ($scope.time == "tomorrow") {
              var tomorrow_r = new Date(date);
              tomorrow_r.setDate(tomorrow_r.getDate() + 1);
              tomorrow_r.setHours(20, 00, 00)
              $scope.remind_at = new Date(tomorrow_r)
              console.log($scope.remind_at, "tomorrow");
          } else if ($scope.time == "next") {
              var next_r = new Date(date);
              next_r.setDate(date.getDate() + 7);
              next_r.setHours(20, 00, 00)
              $scope.remind_at = new Date(next_r)
              console.log($scope.remind_at, "next");
          } else {

              $scope.remind_at = new Date(time);
          }
          var remind_at_Object = {
              remind_at: $scope.remind_at
          }
          var url = "/reminder/" + id + "";
          var action="POST";
          var obj = todo_service.App(url, action,remind_at_Object);
          obj.then(function(data) {

          }).catch(function(error) {

          })
          $scope.get_data();

      };

      $scope.profile_pic = function() {
          console.log("sadKDSFG");

          var modalInstance = $uibModal.open({

              templateUrl: '../html/profilePic.html',
              controller: 'profileController',

              resolve: {

                  object: function() {
                      // return Data_object;
                  }
              }
          });
          modalInstance.result.catch(function(error) {
              console.log(error);
          })
      };









      $scope.open = function(x) {
          console.log("x", x);
          var Data_object = {
              title: x.title,
              note: x.take_note,
              id: x._id,
              updated: x.updated,
              bgcolor: x.bgcolor

          }
          console.log('opening pop up', $scope.data_info);
          var modalInstance = $uibModal.open({

              templateUrl: '../html/popup.html',
              controller: 'popupController',

              resolve: {

                  object: function() {
                      return Data_object;
                  }
              }
          });

          modalInstance.result.catch(function(error) {
              console.log(error);
          })
      };

      $scope.archive = function(id, archive, pin) {
          var archive_obj = {

              archive: archive,
              pinned: pin
          }
          var url = "/archive/" + id + "";
              var action="POST";
          var obj = todo_service.App(url,action, archive_obj);
          obj.then(function(data) {

              $state.reload();

          }).catch(function(error) {

          })
      };



      $scope.pinup = function(id, pin, archive) {

          var url = "/pinup/" + id + "";
          var obj = {
              pin: pin,
              archive: archive
          }
          var action="POST";
          var obj = todo_service.App(url,action, obj);
          obj.then(function(data) {
              $scope.get_data();


          }).catch(function(error) {

          })

      };









      $scope.logout = function() {


          var url = "/logout";
              var action="POST";
          var obj = todo_service.App(url,action);
          obj.then(function(data) {
              if (data.data.status == false) {
                  console.log("logout");
                  $state.go('signin');
              }
          }).catch(function(error) {

          })
          if (!$auth.isAuthenticated()) {
              return;
          }
          $auth.logout()
              .then(function() {
                  console.log('You have been logged out');
                  $state.go('/');
              });

      };


      $scope.copy = function(x) {
          var url = "/dataCard";
          var action="POST";
          var obj = todo_service.App(url,action, x);
          obj.then(function(data) {

          }).catch(function(error) {

          });
          $scope.get_data();
      };

      $scope.delete_reminder = function(id) {

          var url = "/deleteReminder/" + id + "";
            var action="POST";
          var obj = todo_service.App(url,action);
          obj.then(function(data) {

          }).catch(function(error) {

          });
          $scope.get_data();
      };





      $scope.save = function() {

          if ($scope.title == "" && $scope.take_note == "") {
              return;
          }
          var title = $scope.title;
          var take_note = $scope.take_note;

          var object = {
              title: title,
              take_note: take_note

          }
          var url = "/dataCard";
              var action="POST";

          $scope.title = null;
          $scope.take_note = null;
          var obj = todo_service.App(url,action, object);
          obj.then(function(data) {

          }).catch(function(error) {

          })
          $scope.get_data();
        };






      $rootScope.get_data = function() {

          var url = "/getDatacard";
              var action="POST";
          var obj = todo_service.App(url,action);
          obj.then(function(data) {

              if (data.data.status == true) {
                  var cards = [];
                  for (var i = data.data.data_info.length - 1; i >= 0; i--) {
                      cards[cards.length] = data.data.data_info[i];
                      if (data.data.data_info[i].pinned) {
                          $scope.pin = true;
                      } else {
                          $scope.pin = false;
                      }



                  }



                  $rootScope.data_info = cards;


                  if ($localStorage.view == "grid") {

                      $scope.grid_view();
                  } else {
                      $scope.list_view();
                  }

              }
          }).catch(function(error) {

          })
      };


      $scope.menu = function() {
          console.log($scope.sidebar);
          if (window.innerWidth > 600) {
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

          $scope.grid_show = "grid_card";
          $scope.innerbox = "innerbox1";
          $scope.view_change = "col-sm-10 col-lg-9 col-xs-12 col-md-12 a";
          $scope.pin_view = "col-sm-10 col-lg-9 col-xs-12 col-md-12 a"

          $scope.list = {
              'display': 'none'
          }
          $scope.grid = {
              'display': 'block'
          }


      };
      $scope.grid_view = function() {

          $localStorage.view = "grid";



          $scope.grid_show = "grid_card";
          $scope.innerbox = "innerbox ";
          $scope.view_change = "col-sm-8 col-lg-4 col-xs-12 col-md-5 a";
          $scope.pin_view = "col-sm-8 col-lg-4 col-xs-12 col-md-4 a"
          console.log("hghj");
          $scope.grid = {
              'display': 'none'

          }
          $scope.list = {
              'display': 'block'
          }


      };
      $scope.delete = function(id, dele) {

          var url = "/deleteCard/" + id + "";
    var action="POST";
          var object = {
              delete: dele
          }
          var obj = todo_service.App(url,action, object);
          obj.then(function(data) {


          }).catch(function(error) {
              console.log("err");

          })
          $scope.get_data();
      };

      $scope.get_data();

  });

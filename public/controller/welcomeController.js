  App.controller('welcomeController', function($scope, $uibModal, $interval, $state, $localStorage, $rootScope, todo_service, ngNotify, $auth) {
      console.log("in welcomeController");
      $scope.custom = true;
      $scope.sidebar = true;
      $scope.pop = true;
      $scope.archiveDiv = false;
      $scope.reminderDiv = false;
      $scope.binview = false;
      $scope.loggerDiv = false;
      $scope.today = "today";
      $scope.tomorrow = "tomorrow";
      $scope.next = "next";
      $scope.keep = "keep";


      $rootScope.check = function() {
          console.log("inside check");
          var url = "/userInfo/";
          var action = "POST";

          var obj = todo_service.App(url, action);
          obj.then(function(data) {
              console.log(data, "data");
              if (data.data.status == true) {
                //giving access of user_data to all controllers
                  $rootScope.user_data = data.data.user_data;
                  //if object key is local then picture inside local object is stored or picture inside social object in myImage
                  if (!('local' in data.data.user_data)) {
                      $rootScope.myImage = data.data.user_data.social.picture;
                  } else {
                      $rootScope.myImage = data.data.user_data.local.original_pic;
                  }

                  var str = window.location.hash;


                  var hash = str.split("/");


                  if (hash[1] == "logger") {

                      $state.go('logger');
                      //calling logger function and passing userId in it as parameter
                      $rootScope.logger(data.data.user_data._id)
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

      // function to reload the page
      $scope.reload = function() {
          $state.reload();
      };


      // function to select the background color of the card
      $scope.select_color = function(data, color) {

        var bgcolorObject = {
          bgcolor: color,
          userId: data.d_no,
          title:data.title
        }
        var url = "/bgColor/" + data._id + "";
        var action = "POST";
        var obj = todo_service.App(url, action, bgcolorObject);
        obj.then(function(data) {
          console.log("background color set");

        }).catch(function(error) {
          console.log(error);
        })
        $scope.get_data();

      };




      //function for posting data card on facebook
      $scope.facebookshare = function(todo) {
          console.log("facebook share")
          FB.init({
              appId: '1783193788658916',
              status: true,
              xfbml: true
          });
          FB.ui({
                  method: 'share_open_graph',
                  action_type: 'og.shares',
                  action_properties: JSON.stringify({
                      object: {
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
                      alert('successfully posted. Status id : ' + response.post_id);
                  } else {
                      alert('Something went error.');
                  }
              });

      };


      //function to set reminder
      $scope.remind = function(x, time) {

          var date = new Date();// current date

          $scope.time = time;
          if ($scope.time == "today") {
              var today_r = new Date(date);
              //setting reminder for current date at 8 pm
              today_r.setHours(20, 00, 00)
              $scope.remind_at = new Date(today_r)

          } else if ($scope.time == "tomorrow") {
              var tomorrow_r = new Date(date);
              tomorrow_r.setDate(tomorrow_r.getDate() + 1);
                //setting reminder for naxt date at 8 pm
              tomorrow_r.setHours(20, 00, 00)
              $scope.remind_at = new Date(tomorrow_r)

          } else if ($scope.time == "next") {
              var next_r = new Date(date);
                //setting reminder for next week at 8 pm
              next_r.setDate(date.getDate() + 7);
              next_r.setHours(20, 00, 00)
              $scope.remind_at = new Date(next_r)

          } else {
              //setting reminder as selected from date picker
              $scope.remind_at = new Date(time);
          }
          var remindObject = {
              remind_at: $scope.remind_at,
              userId: x.d_no,
              title:x.title
          }
          var url = "/reminder/" + x._id + "";
          var action = "POST";
          var obj = todo_service.App(url, action, remindObject);
          obj.then(function(data) {

          }).catch(function(error) {

          })
          $scope.get_data();

      };

      //function for opening a popup to change the profile pic
      $scope.profile_pic = function() {


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








// function for opening a popup and updating the data inside data card
      $scope.open = function(x) {

          var dataObject = {
              title: x.title,
              note: x.take_note,
              id: x._id,
              updated: x.updated,
              bgcolor: x.bgcolor

          }

          var modalInstance = $uibModal.open({

              templateUrl: '../html/popup.html',//popup for updating in data card
              controller: 'popupController',

              resolve: {

                  object: function() {
                      return dataObject;
                  }
              }
          });

          modalInstance.result.catch(function(error) {
              console.log(error);
          })
      };
      // function to archive any data card
      $scope.archive = function(data, archive, pin) {
          var archiveObj = {

              archive: archive,
              pinned: pin,
              userId: data.d_no,
              title:data.title
          }
          var url = "/archive/" + data._id + "";
          var action = "POST";
          var obj = todo_service.App(url, action, archiveObj);
          obj.then(function(data) {

                $scope.get_data();

          }).catch(function(error) {

          })
      };


//function to pin any data card
      $scope.pinup = function(data, pin, archive) {

          var url = "/pinup/" + data._id + "";
          var obj = {
              pin: pin,
              archive: archive,
              userId: data.d_no,
              title:data.title
          }
          var action = "POST";
          var obj = todo_service.App(url, action, obj);
          obj.then(function(data) {
              $scope.get_data();


          }).catch(function(error) {

          })

      };








// function to call api which clears the cookie
      $scope.logout = function() {


          var url = "/logout";
          var action = "POST";
          var obj = todo_service.App(url, action);
          obj.then(function(data) {
              if (data.data.status == false) {

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

// function to make an exact coy of any data card
      $scope.copy = function(x) {
          var url = "/dataCard";
          var action = "POST";
          var obj = todo_service.App(url, action, x);
          obj.then(function(data) {
            $scope.get_data();
          }).catch(function(error) {

          });

      };
    //function to delete reminder
      $scope.delete_reminder = function(x) {

          var url = "/deleteReminder/" + x._id + "";
          var action = "POST";
          var object = {
              userId: x.d_no,
                  title:x.title
          }
          var obj = todo_service.App(url, action, object);
          obj.then(function(data) {
            $scope.get_data();
          }).catch(function(error) {

          });

      };




//function to add a new data card
      $scope.save = function() {

          if ($scope.title == "" && $scope.take_note == "") {
              return;
          }


          var object = {
              title: $scope.title,
              take_note: $scope.take_note

          }
          var url = "/dataCard";
          var action = "POST";

          $scope.title = null;
          $scope.take_note = null;
          var obj = todo_service.App(url, action, object);
          obj.then(function(data) {

          }).catch(function(error) {

          })
          $scope.get_data();
      };





      //function to get all data cards
      $rootScope.get_data = function() {

          var url = "/getDatacard";
          var action = "POST";
          var obj = todo_service.App(url, action);
          obj.then(function(data) {

              if (data.data.status == true) {
                  var cards = [];
                  for (var i = data.data.data_info.length - 1; i >= 0; i--) {
                    //inserting the cards in reverse order inside the array
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
      // function to delete any data card
      $scope.delete = function(data, dele) {

          var url = "/deleteCard/" + data._id + "";
          var action = "POST";
          var object = {
              delete: dele,
              userId: data.d_no,
              title:data.title
          }
          var obj = todo_service.App(url, action, object);
          obj.then(function(data) {
            $scope.get_data();

          }).catch(function(error) {
              console.log("err");

          })

      };

      $scope.get_data();

  });

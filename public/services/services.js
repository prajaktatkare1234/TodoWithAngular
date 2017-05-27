App.service('signin_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/sign_in",
            method: "POST",
            data: object
        });
    }
});
App.service('data_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/data_card",
            method: "POST",
            data: object
        });
    }
});
App.service('get_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/get_data_card",
            method: "POST",

        });
    }
});
App.service('delete_service', function($http) {
  // console.log(id);
    this.App = function(id) {
        return $http({
            url: "/delete_data_card/" + id + "",
            method: "POST",

        });
    }
});
App.service('logout_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/logout",
            method: "POST",
            // data: object
        });
    }
});
App.service('data_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/data_card",
            method: "POST",
            data: object
        });
    }
});
App.service('get_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/get_data_card",
            method: "POST",

        });
    }
});
App.service('delete_service', function($http) {
  // console.log(id);
    this.App = function(id) {
        return $http({
            url: "/delete_data_card/" + id + "",
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
App.service('update_service', function($http) {
    this.App = function(updated_data,id) {
      console.log("in service");
        return $http({
            url: "/update_data_card/" + id + "",
            method: "POST",
            data: updated_data
        });
    }
});
App.service('reminder_service', function($http) {
    this.App = function(id,remind_at) {
      var remind_at_Object={
        remind_at:remind_at
      }
      console.log("in service",remind_at_Object);
        return $http({
            url: "/reminder/" + id + "",
            method: "POST",
            data: remind_at_Object
        });
    }
});
App.service('check_service', function($http) {
    this.App = function() {
      console.log("in service");
        return $http({
            url: "/user_info/",
            method: "POST"
            // data: updated_data
        });
    }
});
App.service('signup_service', function($http) {
    this.App = function(object) {
        return $http({
            url: "/sign_up",
            method: "POST",
            data: object
        });
    }
});
App.service('delete_reminder_service', function($http) {
    this.App = function(id) {
        return $http({
            url: "/delete_reminder/" + id + "",
            method: "POST",
            // data: object
        });
    }
});
App.service('color_service', function($http) {
    this.App = function(id,bgcolor) {
      var bg_color_object={
        bgcolor:bgcolor
      }
      console.log("bbb",bg_color_object);
        return $http({
            url: "/bgcolor/" + id + "",
            method: "POST",
            data: bg_color_object
        });
    }
});

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
            url: "http://localhost:8081/logout",
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

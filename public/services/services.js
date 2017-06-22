
App.service('todo_service',function($http) {
  console.log("in service");
    this.App = function(url,action,data) {
        return $http({
            url: url,
            method: action,
            data:data

        });
    }
});

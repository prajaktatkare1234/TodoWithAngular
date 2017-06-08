
App.service('todo_service',function($http) {
  console.log("in service");
    this.App = function(url,data,id) {
        return $http({
            url: url,
            method: "POST",
            data:data

        });
    }
});


App.service('todo_service',function($http) {
    this.App = function(url,data,id) {
        return $http({
            url: url,
            method: "POST",
            data:data

        });
    }
});

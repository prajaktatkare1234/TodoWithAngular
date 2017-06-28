App.controller('loggerController', ['$scope','$rootScope','todo_service','$controller', function($scope,$rootScope,todo_service,$controller){
  $controller('welcomeController', {$scope: $scope})
//using  binController inside welcomeController
  $scope.loggerDiv=true;
  $scope.keep="Logger";

//changing color of navigation bar
  $scope.archive_style={
    "background-color":"grey"

  }
  $scope.drop={
    "background-color":"grey"
  }
  $scope.search_archive={
    "background-color":"white"
  }

  $rootScope.logger=function(userId){
    var url = "/getLoggers";
        var action="POST";
        var object={
          userId:userId
        }

    var obj = todo_service.App(url,action,object);
    obj.then(function(data) {
        if (data.data.status == true) { //fetches data from logger schema

            var loggerCards = [];

            for(i in data.data.result )
            {
              loggerCards[i]=data.data.result[i]
            }



            $rootScope.activeLogs = loggerCards;
          }



    }).catch(function(error) {
      console.log(error);

    })
  };



}]);

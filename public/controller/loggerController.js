App.controller('loggerController', ['$scope','$rootScope','todo_service','$controller', function($scope,$rootScope,todo_service,$controller){
  $controller('welcomeController', {$scope: $scope})
  $scope.logger_view=false;
  $scope.keep="Logger";
  $rootScope.logger=function(userId){
    // console.log("logger",userId);
    var url = "/getLoggers";
        var action="POST";
        var object={
          userId:userId
        }

    var obj = todo_service.App(url,action,object);
    obj.then(function(data) {
      console.log(data);
        //
        if (data.data.status == true) {

            var loggerCards = [];

            for (var i = data.data.result.length - 1; i >= 0; i--) {

                loggerCards[loggerCards.length] = data.data.result[i];
                // if (data.data.data_info[i].pinned) {
                //     $scope.pin = true;
                // } else {
                //     $scope.pin = false;
                // }



            }



            $rootScope.activeLogs = loggerCards;
            console.log("dfldskdflgkfdg",$rootScope.activeLogs );



        }
    }).catch(function(error) {

    })
  };


  // }
}]);

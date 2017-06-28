App.controller('archiveController', ['$scope', '$controller', function($scope, $controller){
  $controller('welcomeController', {$scope: $scope})
  //using  archiveController inside welcomeController
  $scope.archiveDiv=true;
  $scope.keep="Archive";
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
}]);

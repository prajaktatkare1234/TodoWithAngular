App.controller('reminderController', ['$scope', '$controller', function($scope, $controller){
  $controller('welcomeController', {$scope: $scope})
  //using  reminderController inside welcomeController

  $scope.reminderDiv=true;
  $scope.keep="Reminder";
// changing the color of navigation bar
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

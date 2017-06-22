App.controller('reminderController', ['$scope', '$controller', function($scope, $controller){
  $controller('welcomeController', {$scope: $scope})

  $scope.reminder_div=false;
  $scope.keep="Reminder";
  
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

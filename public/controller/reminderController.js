App.controller('reminderController', ['$scope', '$controller', function($scope, $controller){
  $controller('welcomeController', {$scope: $scope})
  //inside scope you the controllerOne scope will available
  $scope.reminder_div=false;
  // console.log($scope.input_div);
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

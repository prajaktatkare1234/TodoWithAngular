App.controller('archive_controller', ['$scope', '$controller', function($scope, $controller){
  $controller('welcome_controller', {$scope: $scope})
  //inside scope you the controllerOne scope will available
  $scope.input_div=false;
  console.log($scope.input_div);
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

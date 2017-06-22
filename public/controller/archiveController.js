App.controller('archiveController', ['$scope', '$controller', function($scope, $controller){
  $controller('welcomeController', {$scope: $scope})
  
  $scope.input_div=false;
  $scope.keep="Archive";
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

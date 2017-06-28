App.controller('binController', ['$scope', '$controller', function($scope, $controller){
  $controller('welcomeController', {$scope: $scope})
//using  binController inside welcomeController  $scope.bin_view=false;
  $scope.keep="Bin";
  $scope.binDiv= true;
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

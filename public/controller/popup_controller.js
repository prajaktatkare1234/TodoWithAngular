App.controller('popup_controller', function($scope,$uibModalInstance,object,update_service) {
  $scope.updated_title=object.title;
  $scope.updated_note=object.note;
  $scope.updated_date=object.updated;
  $scope.id=object.id;


  // console.log("contr", $scope.title);
$scope.update = function (id) {
console.log(id);
console.log("title",$scope.updated_title);

    var updated_data={
      title:$scope.updated_title,
      take_note:$scope.updated_note,
      _id:id

    }

    console.log("updated",updated_data);
    var obj = update_service.App(updated_data,id);
    obj.then(function(data) {
      $scope.get_data();


    }).catch(function(error) {
        console.log("err");

    })
   $uibModalInstance.dismiss('Done');
  };
});

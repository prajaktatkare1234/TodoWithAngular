
App.controller('popupController', function($scope,$uibModalInstance,object,todo_service) {
  //storing in $scope so that it can be accessed in popup.html
  $scope.updated_title=object.title;
  $scope.updated_note=object.note;
  $scope.updated_date=object.updated;
  $scope.updated_color=object.bgcolor;
  $scope.id=object.id;



$scope.update = function (id) {
console.log(id);
console.log("title",$scope.updated_title);

    var updated_data={
      title:$scope.updated_title,
      take_note:$scope.updated_note,
      _id:id,
      userId:object.d_no

    }
   var url="/updateDatacard/" + id + "";
   var action="POST";
    var obj = todo_service.App(url,action,updated_data,id);
    obj.then(function(data) {
      $scope.get_data();


    }).catch(function(error) {
        console.log("err");

    })
   $uibModalInstance.dismiss('Done');
  };
});

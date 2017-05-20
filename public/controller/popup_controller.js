App.controller('popup_controller', function($scope,$uibModalInstance,object,update_service) {
  $scope.title=object.title;
  $scope.note=object.note;
  $scope.id=object.id;

  // console.log("contr", $scope.title);
$scope.update = function (id) {
console.log(id);
console.log("title",$scope.updated_title);
console.log("note",$scope.updated_note);
    var updated_data={
      title:$scope.updated_title,
      take_note:$scope.updated_note,
      _id:id

    }
    console.log("updated",updated_data);
    var obj = update_service.App(updated_data,id);
    obj.then(function(data) {


    }).catch(function(error) {
        console.log("err");

    })
   $uibModalInstance.dismiss('Done');
  };
});
// App.service('update_service', function($http) {
//     this.App = function(updated_data,id) {
//       console.log("in service");
//         return $http({
//             url: "/update_data_card/" + id + "",
//             method: "POST",
//             data: updated_data
//         });
//     }
// });

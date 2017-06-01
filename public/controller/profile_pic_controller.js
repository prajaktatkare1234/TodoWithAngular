App.controller('profile_pic_controller', function($scope,$rootScope) {
  console.log("ssdjafhds");
    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


    $scope.done = function (image) {
    console.log("hhhg");
    $rootScope.img=image;
    // console.log("title",$scope.updated_title);
    //
    //     var updated_data={
    //       title:$scope.updated_title,
    //       take_note:$scope.updated_note,
    //       _id:id
    //
    //     }
    //    var url="/update_data_card/" + id + "";
    //
    //     var obj = todo_service.App(url,updated_data,id);
    //     obj.then(function(data) {
    //       $scope.get_data();
    //
    //
    //     }).catch(function(error) {
    //         console.log("err");
    //
    //     })
    //    $uibModalInstance.dismiss('Done');
      };

  });

App.controller('profileController', function($scope,$uibModalInstance,$rootScope,todo_service) {
  console.log("ssdjafhds");
    $scope.myImage=$rootScope.myImage;
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

    $scope.test=function() {
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    }

    $scope.done = function (image) {
    console.log("hhhg");
    // $rootScope.img=image;
    console.log("jedgjhd",$rootScope.user_data);
    image_object={
      big_image:$scope.myImage,
      croped_image:$scope.myCroppedImage,
      name:$rootScope.user_data.name
    }

  var url="/profilePic";
    var obj = todo_service.App(url,image_object);
    obj.then(function(data) {

      $uibModalInstance.dismiss('Done');

    }).catch(function(error) {
        console.log("err");
        $uibModalInstance.dismiss('Done');

    });

      };

  });

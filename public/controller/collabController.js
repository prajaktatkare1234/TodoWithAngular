App.controller('collabController', function($scope, $uibModalInstance, object, todo_service) {
    console.log(object);
    $scope.collabEmail = function() {

        var url = "getallUser";
        var action = "POST";
        var obj = todo_service.App(url, action);
        obj.then(function(data) {
            console.log(data);
            var emailArray = [];


            var emailArray = data.data.result.map(function(data) {

                if (data.local) {
                    return data.local.email;
                }
                // else
                // if(data.social){
                //
                //     return data.social.gmail;
                //   }


            });
            emailArray = emailArray.filter(function(Data) {
                //  console.log("shdsajkhsaf");
                return Data !== undefined ;
            });

            $scope.collabList = emailArray;
            console.log($scope.collabList);


          }).catch(function(error) {
            console.log("err");

          });




    }
    $scope.submit = function() {
        console.log($scope.shareEmail, "email");
        console.log(object);
        var shareEmail = {
            email: $scope.shareEmail,
            col: "col"
        }
        var url = "signIn";
        var action = "POST";
        var obj = todo_service.App(url, action, shareEmail);
        obj.then(function(data) {
          console.log("got id of shareEmail",data);
          var sharenoteObj={
            id:data.data.result._id,
            title:object.title,
            take_note:object.take_note,
            col:"col",
            collabWith:$scope.shareEmail
          }
          var url = "dataCard";
              var action="POST";
          var obj = todo_service.App(url,action,sharenoteObj);
          obj.then(function(data) {



          }).catch(function(error) {

          })



        }).catch(function(error) {

        })

        $uibModalInstance.dismiss('Done');




    }
    $scope.collabEmail();

});

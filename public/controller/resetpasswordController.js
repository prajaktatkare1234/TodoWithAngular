App.controller('resetpasswordController', function($scope,$state,todo_service,$rootScope,$auth,$window) {
  $scope.regex_password = /[a-z]{5,8}$/;

$scope.resetPassword=function(){

var verifyEmail=$scope.verifyEmail;
  var object={
    email:verifyEmail
  }
console.log(object);
  var url= "/verifyEmail";
  var action="PUT";
var obj = todo_service.App(url,action,object);

obj.then(function(data) {
  // console.log(data.data.status,);
  if(data.data.status==true)

  {

    $window.alert("link for changing the password is send to the registered email");


    console.log("registered  is Email");

//     $scope.goSomewhere = function($state) {
//     $rootScope.token=data.data.token;
//        $state.go(
//          'changePassword',
//          {
//            token: data.data.token
//           }
//
//
// )}
//   $scope.goSomewhere();
}
  else{
      $window.alert("Email address is not registered");

      $state.go('verifyEmail');

  }

}).catch(function(error) {

})
};

$scope.submit=function(){

var a=$state.href('changePassword', $state.params,{});
// console.log(a);
    var hash=a.split("Password/");
  // console.log(hash);
  var token=hash[1];

  var newPassword=$scope.newPass;
  var url= "/signUp";
  // var email=email
  var object={
  password:$scope.newPass,
  updation:"change",
  token:token
  }
  var action="POST";
  // console.log("changeObj",object);
var obj = todo_service.App(url,action,object);
obj.then(function(data) {

  if(data.data.status==true)
  {
    $window.alert("Password is changed successfully");

    console.log("password changed");
    $state.go('signin');
}
  else{

      $state.go('changePassword');
      // console.log("email is not registered");
  }

}).catch(function(error) {

})
};



});

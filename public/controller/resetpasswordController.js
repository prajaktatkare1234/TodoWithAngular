App.controller('resetpasswordController', function($scope,$state,todo_service,$rootScope,$auth) {


$scope.resetPassword=function(){

var verifyEmail=$scope.verifyEmail;
  var object={
    email:verifyEmail
  }
console.log(object);
// localStorage.setItem('verifiedEmail',verifyEmail)
  var url= "/verifyEmail";

var obj = todo_service.App(url,object);
obj.then(function(data) {
  // console.log(data.data.status,);
  if(data.data.status==true)
  {

    console.log("registered  is Email");
    // $state.go('welcome');
}
  else{

      $state.go('resetPassword');
      console.log("email is not registered");
  }

}).catch(function(error) {

})
};



$scope.submit=function(){
  console.log(document.cookie);
  var newPassword=$scope.newPass;
  var url= "/signUp";
  // var email=email
  var object={
  password:$scope.newPass,
  updation:"change"
  }
  console.log("changeObj",object);
var obj = todo_service.App(url,object);
obj.then(function(data) {
  // console.log(data.data.status,);
  if(data.data.status==true)
  {
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

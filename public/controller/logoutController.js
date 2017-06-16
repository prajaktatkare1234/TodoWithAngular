App.controller('logoutController', function($scope,$state,todo_service,$rootScope,$auth) {
  if (!$auth.isAuthenticated()) { return; }
  $auth.logout()
    .then(function() {
      console.log('You have been logged out');
      $state.go('/');
    });
});

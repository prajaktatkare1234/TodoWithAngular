var App = angular.module('App', ['ngRoute','ngSanitize']);

   // configure our routes
   App.config(function($routeProvider) {
       $routeProvider

           // route for the home page
           .when('/', {
               templateUrl : 'html/signin.html',
               controller  : 'signin_controller'
           })
           .when('/signin', {
               templateUrl : 'html/signin.html',
               controller  : 'signin_controller'
           })

           // route for the about page
           .when('/signup', {
               templateUrl : 'html/signup.html',
               controller  : 'signup_controller'
           })

           // route for the contact page
           .when('/welcome', {
               templateUrl : 'html/welcome.html',
               controller  : 'welcome_controller'
           });
   });

  App.directive('content', function($sce) {
     return {
         require: '?ngModel',
         scope: {
         },
         link: function(scope, element, attrs, ngModel) {
           if (!ngModel) return; // do nothing if no ng-model

               // Specify how UI should be updated
                 ngModel.$render = function() {
                   element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                   read(); // initialize
                 };

                 // Listen for change events to enable binding
                 element.on('blur keyup change', function() {
                   scope.$evalAsync(read);
                 });

                 // Write data to the model
                 function read() {
                   var html = element.html();
                   // When we clear the content editable the browser leaves a <br> behind
                   // If strip-br attribute is provided then we strip this out
                   if ( attrs.stripBr && html == '<br>' ) {
                     html = '';
                   }
                   ngModel.$setViewValue(html);
                 }
         }
     };
 });

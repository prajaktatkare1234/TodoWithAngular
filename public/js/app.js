// var App = angular.module('App', ['ngRoute','ngSanitize']);
//
//    // configure our routes
//    App.config(function($routeProvider) {
//        $routeProvider
//
//            // route for the home page
//            .when('/', {
//                templateUrl : 'html/signin.html',
//                controller  : 'signin_controller'
//            })
//            .when('/signin', {
//                templateUrl : 'html/signin.html',
//                controller  : 'signin_controller'
//            })
//
//            // route for the about page
//            .when('/signup', {
//                templateUrl : 'html/signup.html',
//                controller  : 'signup_controller'
//            })
//
//            // route for the contact page
//            .when('/welcome', {
//                templateUrl : 'html/welcome.html',
//                controller  : 'welcome_controller'
//            });
//    });
var App=angular.module('App',['ui.router','ngSanitize','ngStorage','ui.bootstrap']);
    App.config(function($stateProvider,$urlRouterProvider){

        $urlRouterProvider.otherwise('/signin');

        $stateProvider.state('signin',{
            url:'/signin',
            templateUrl:'html/signin.html',
            controller:'signin_controller',

        })
        .state('signup',{
            url : '/signup',
            templateUrl : 'html/signup.html',
            controller : 'signup_controller',

        })
        .state('welcome',{
            url : '/welcome',
            templateUrl : 'html/welcome.html',
            controller : 'welcome_controller',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })


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
//   App.directive('content', [function() {
//     return {
//         require: '?ngModel',
//         scope: {
//         },
//         link: function(scope, element, attrs, ctrl) {
//             // view -> model (when div gets blur update the view value of the model)
//             element.bind('blur', function() {
//                 scope.$apply(function() {
//                     ctrl.$setViewValue(element.html());
//                 });
//             });
//
//             // model -> view
//             // ctrl.$render = function() {
//             //     element.html(ctrl.$viewValue);
//             // };
//             //
//             // // load init value from DOM
//             // ctrl.$render();
//
//             // remove the attached events to element when destroying the scope
//             scope.$on('$destroy', function() {
//                 element.unbind('blur');
//                 element.unbind('paste');
//                 element.unbind('focus');
//             });
//         }
//     };
// }]);

// var mApp = angular.module('myApp', []);

App.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "dd/mm/yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});

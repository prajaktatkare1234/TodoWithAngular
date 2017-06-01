var App=angular.module('App',['ui.router','ngSanitize','ngStorage','ui.bootstrap','ui.bootstrap.datetimepicker','ngImgCrop']);
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

App.directive('testpackery', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        console.log("link called on", element[0]);
        if ($rootScope.packery === undefined || $rootScope.packery === null) {
          scope.element = element;
          $rootScope.packery = new Packery(element[0].parentElement, {
            // isResizeBound: true,
            // rowHeight: 230,
            // columnWidth: 230,
            itemSelector: '.a'
          });
          $rootScope.packery.bindResize();
          var draggable1 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable1);

          draggable1.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
              // $rootScope.packery.reloadItems();
            }, 200);
          });

          //
          // var orderItems = function() {
          //   var itemElems = $rootScope.packery.getItemElements();
          //   $(itemElems).each(function(i, itemElem) {
          //     $(itemElem).text(i + 1);
          //   });
          // };
          //
          // $rootScope.packery.on('layoutComplete', orderItems);
          // $rootScope.packery.on('dragItemPositioned', orderItems);


        } else {
          // console.log("else", element[0]);
          var draggable2 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable2);


          draggable2.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
            }, 200);
          });

        }
        $timeout(function() {
          $rootScope.packery.reloadItems();
          $rootScope.packery.layout();
        }, 100);
      }
    };

  }
]);

var App = angular.module('App', ['ui.router', 'ngSanitize', 'ngStorage', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ngImgCrop', 'ngNotify', 'satellizer']);
App.config(function($stateProvider, $urlRouterProvider, $authProvider) {

    $urlRouterProvider.otherwise('/signin');

    $stateProvider.state('signin', {
            url: '/signin',
            templateUrl: 'html/signin.html',
            controller: 'signinController',

        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'html/signup.html',
            controller: 'signupController',

        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'html/welcome.html',
            controller: 'welcomeController',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })
        .state('archive', {
            url: '/archive',
            templateUrl: 'html/welcome.html',
            controller: 'archiveController',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })
        .state('reminder', {
            url: '/reminder',
            templateUrl: 'html/welcome.html',
            controller: 'reminderController',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })
        .state('bin', {
            url: '/bin',
            templateUrl: 'html/welcome.html',
            controller: 'binController',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })
        .state('verifyEmail', {
            url: '/verifyEmail',
            templateUrl: 'html/verifyEmail.html',
            controller: 'resetpasswordController',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })
        .state('changePassword', {
            url: '/changePassword',
            templateUrl: 'html/changePassword.html',
            controller: 'resetpasswordController',
            // onEnter : function(){
            //     console.log('inside table');
            // }
        })
        // .state('', {
        //     url: '/reminder',
        //     templateUrl: 'html/welcome.html',
        //     controller: 'reminderController',
        //     // onEnter : function(){
        //     //     console.log('inside table');
        //     // }
        // })
        $authProvider.facebook({
            name: 'facebook',
            clientId: '1783193788658916'
            // responseType:'token',
            // url: '/auth/facebook',
            // authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
            // redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
            // scope: 'email',
            // scopeDelimiter: ',',
            // requiredUrlParams: ['display', 'scope'],
            // display: 'popup',
            // type: '2.0',
            // popupOptions: {
            //     width: 481,
            //     height: 269
            // }

        });
        $authProvider.google({
            clientId: '564021516839-4er0mlf724d67r6kf7j5lmkgp2dnq9e5.apps.googleusercontent.com',
            // responseType:'token',
            // url: '/auth/google',
            // authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            // redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            // scope: ['profile', 'email'],
            // scopePrefix: 'openid',
            // scopeDelimiter: ' ',
            // requiredUrlParams: ['scope'],
            // optionalUrlParams: ['display'],
            // display: 'popup',
            // type: '2.0',
            // popupOptions: { width: 452, height: 633 }
              });




});
App.directive('content', function($sce) {
    return {
        require: '?ngModel',
        scope: {},
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
                if (attrs.stripBr && html == '<br>') {
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

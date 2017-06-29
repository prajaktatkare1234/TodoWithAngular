var App = angular.module('App', ['ui.router', 'ngSanitize', 'ngStorage', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ngImgCrop', 'ngNotify', 'satellizer']);
App.config(function($stateProvider, $urlRouterProvider, $authProvider) {

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

        })
        .state('archive', {
            url: '/archive',
            templateUrl: 'html/welcome.html',
            controller: 'archiveController',

        })
        .state('reminder', {
            url: '/reminder',
            templateUrl: 'html/welcome.html',
            controller: 'reminderController',

        })
        .state('bin', {
            url: '/bin',
            templateUrl: 'html/welcome.html',
            controller: 'binController',

        })
        .state('logger', {
            url: '/logger',
            templateUrl: 'html/welcome.html',
            controller: 'loggerController',

        })
        .state('verifyEmail', {
            url: '/verifyEmail',
            templateUrl: 'html/verifyEmail.html',
            controller: 'resetpasswordController',

        })
        .state('changePassword', {
            url: '/changePassword/:token',
            templateUrl: 'html/changePassword.html',
            controller: 'resetpasswordController',

        });

            $urlRouterProvider.otherwise('/signin');


        $authProvider.facebook({
            name: 'facebook',
            clientId: '1783193788658916'


        });
        $authProvider.google({
            clientId: '564021516839-4er0mlf724d67r6kf7j5lmkgp2dnq9e5.apps.googleusercontent.com',

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

App.directive('testpackery', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                // console.log("link called on", element[0]);
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

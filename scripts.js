var challengeApp = angular.module('challengeApp', ['ngRoute']);

// create the controller and inject Angular's $scope
challengeApp.controller('mainController', function($scope) {

    $scope.message = "This is the home page";
});

challengeApp.controller('editController', function($scope) {
    $scope.message = "This is the edit page.";
});

// create routes
challengeApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
          templateUrl : 'views/home.html',
          controller  : 'mainController'
        })

        .when('/edit', {
          templateUrl : 'views/edit.html',
          controller  : 'editController'
        })

        .otherwise({
          redirectTo: '/'
        });

    //remove the hash prefix from the URL for pretty URLs
    $locationProvider.hashPrefix('');



});

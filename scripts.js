var challengeApp = angular.module('challengeApp', ['ngRoute', 'ngGrid']);

// create the controller and inject Angular's $scope
challengeApp.controller('mainController', function($scope) {

    $scope.gridData = [{name: "Moroni", age: 50},
                     {name: "Teancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Steve", age: 43},
                     {name: "Scotty", age: 27},
                     {name: "Maverick", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = {
      data: 'gridData',
      plugins: [new ngGridFlexibleHeightPlugin()]
    };
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

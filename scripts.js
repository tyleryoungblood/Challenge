var challengeApp = angular.module('challengeApp', ['ngRoute', 'ngGrid', 'restangular']);


// mLabs resource url
// mongodb://tyleryoungblood:/+nJ4uvL*<(8<Eq8@ds153980.mlab.com:53980/challenge-db

challengeApp.constant('mongolab', {
    url: 'https://api.mongolab.com/api/1/databases/challenge-db/collections/',
    key: 'JiY3STffidCB_PDLbVoWiNotWTZpTTVQ'
});

// create the controller and inject Angular's $scope as well as Restangular
challengeApp.controller('toolController', [
    '$scope',
    'Restangular',
    function($scope, Restangular) {
      var Tool = Restangular.all('tools');

      $scope.gridData = Tool.getList().then(function (response) {
          //strip extra object data out of response
          $scope.gridData = response.plain();
          console.log($scope.gridData);
      });

      //$scope.gridData = $scope.gridData.plain();
      $scope.gridOptions = {
        data: 'gridData',
        columnDefs: [
          {field:'name', displayName: 'Name'},
          {field:'description', displayName:'Description', wordwrap: true, width: "*"}  ],
        plugins: [new ngGridFlexibleHeightPlugin()]
      };
    }
  ]);

challengeApp.controller('editController', function($scope) {
    $scope.message = "This is the edit page.";
});

// create routes
challengeApp.config(function($routeProvider, $locationProvider, RestangularProvider, mongolab) {
    $routeProvider

        .when('/', {
          templateUrl : 'views/home.html',
          controller  : 'toolController'
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

    //configure Restangular connection to mLabs
    RestangularProvider.setBaseUrl(mongolab.url);
    RestangularProvider.setDefaultRequestParams({
      apiKey: mongolab.key
    });
    //configure id to match mLabs format
    RestangularProvider.setRestangularFields({
      id: '_id.$oid'
    });



});

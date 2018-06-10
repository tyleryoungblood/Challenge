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
    '$log',
    '$location',
    function($scope, Restangular, $log, $location) {
      var Tool = Restangular.all('tools');

      $scope.gridData = Tool.getList().then(function (response) {
          //strip extra object data out of response using .plain()
          $scope.gridData = response.plain();
      });

      //$scope.gridData = $scope.gridData.plain();
      $scope.gridOptions = {
        data: 'gridData',
        columnDefs: [
          {field:'name', displayName: 'Name',
          cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="loadById(row)">{{row.getProperty(col.field)}}</a></div>' },
          {field:'description', displayName:'Description', wordwrap: true, width: "*"}],
        plugins: [new ngGridFlexibleHeightPlugin()]
      };

      $scope.loadById = function ( row ) {
        console.log(row.entity._id);
        $location.path( "/edit/" + row.entity._id.$oid);
      };
    }
  ]);


challengeApp.controller('editController', function($scope, $location, Restangular, tool){
  var original = tool;
  $scope.tool = Restangular.copy(original);

  $scope.isClean = function() {
    return angular.equals(original, $scope.tool);
  };

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/');
    });
  };

  $scope.save = function() {
    $scope.tool.put().then(function() {
      $location.path('/');
    });
  };
});

challengeApp.controller('createController', function($scope, $location, Restangular){
  $scope.save = function () {
    // POST /tools
    Restangular.all('tools').post($scope.tool).then(function(tool) {
      //reload list when done
      $location.path('/');
    });
  };
});

// create routes @ configure restangular
challengeApp.config(function($routeProvider, $locationProvider, RestangularProvider, mongolab) {

    $routeProvider

      .when('/', {
        controller:'toolController',
        templateUrl:'views/home.html'
      })

      .when('/new', {
        controller:'createController',
        templateUrl:'views/edit.html'
      })

      .when('/edit/:toolId', {
        controller:'editController',
        templateUrl:'views/edit.html',
        resolve: {
          tool: function(Restangular, $route){
            return Restangular.one('tools', $route.current.params.toolId).get();
          }
        }
      })

      .otherwise({redirectTo:'/'});

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

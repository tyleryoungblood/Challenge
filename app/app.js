var challengeApp = angular.module("challengeApp", [
  "ngRoute",
  "ngGrid",
  "restangular",
  "ui.bootstrap"
]);

// mLabs resource url
// mongodb://tyleryoungblood:/+nJ4uvL*<(8<Eq8@ds153980.mlab.com:53980/challenge-db

challengeApp.constant("mongolab", {
  url: "https://api.mongolab.com/api/1/databases/challenge-db/collections/",
  key: "JiY3STffidCB_PDLbVoWiNotWTZpTTVQ"
});

// create routes @ configure restangular
challengeApp.config(function(
  $routeProvider,
  $locationProvider,
  RestangularProvider,
  mongolab
) {
  $routeProvider

    .when("/", {
      controller: "ToolCtrl",
      templateUrl: "app/home/home.html"
    })

    .when("/new", {
      controller: "CreateCtrl",
      templateUrl: "app/edit/edit.html"
    })

    .when("/edit/:toolId", {
      controller: "EditCtrl",
      templateUrl: "app/edit/edit.html",
      resolve: {
        tool: function(Restangular, $route) {
          return Restangular.one("tools", $route.current.params.toolId).get();
        }
      }
    })

    .otherwise({ redirectTo: "/" });

  //remove the hash prefix from the URL for pretty URLs
  $locationProvider.hashPrefix("");

  //configure Restangular connection to mLabs
  RestangularProvider.setBaseUrl(mongolab.url);
  RestangularProvider.setDefaultRequestParams({
    apiKey: mongolab.key
  });
  //configure id to match mLabs format
  RestangularProvider.setRestangularFields({
    id: "_id.$oid"
  });
});

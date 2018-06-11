challengeApp.controller("EditCtrl", function(
  $scope,
  $location,
  Restangular,
  tool
) {
  var original = tool;
  $scope.tool = Restangular.copy(original);

  $scope.isClean = function() {
    return angular.equals(original, $scope.tool);
  };

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path("/");
    });
  };

  $scope.save = function() {
    $scope.tool.put().then(function() {
      $location.path("/");
    });
  };

  $scope.cancel = function() {
    $location.path("/");
  };
});

challengeApp.controller("CreateCtrl", function($scope, $location, Restangular) {
  $scope.save = function() {
    // POST /tools
    Restangular.all("tools")
      .post($scope.tool)
      .then(function(tool) {
        //reload list when done
        $location.path("/");
      });
  };
});

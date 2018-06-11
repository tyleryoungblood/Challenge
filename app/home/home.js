// create the controller and inject Angular's $scope as well as Restangular
challengeApp.controller("ToolCtrl", [
  "$scope",
  "Restangular",
  "$log",
  "$location",
  function($scope, Restangular, $log, $location) {
    var Tool = Restangular.all("tools");

    $scope.gridData = Tool.getList().then(function(response) {
      //strip extra object data out of response using .plain()
      $scope.gridData = response.plain();
    });

    //$scope.gridData = $scope.gridData.plain();
    $scope.gridOptions = {
      data: "gridData",
      enableRowSelection: true,
      columnDefs: [
        {
          field: "name",
          displayName: "Name",
          width: "20%",
          cellTemplate:
            '<div class="ngCellText" ng-class="col.colIndex()"><a class="link" ng-click="loadById(row)">{{row.getProperty(col.field)}}</a></div>'
        },
        {
          field: "description",
          displayName: "Description",
          wordwrap: true,
          width: "80%"
        }
      ],
      plugins: [new ngGridFlexibleHeightPlugin()]
    };

    $scope.loadById = function(row) {
      console.log(row.entity._id);
      $location.path("/edit/" + row.entity._id.$oid);
    };
  }
]);

angular.module('rankingApp', []);

angular.module('rankingApp', [])
  .controller('rankingController', ['$scope', '$http', function($scope, $http) {
    $scope.players = [];
    $scope.tableHeaders = [];
    $scope.currentPage = 1;
    $scope.pageSize = 20;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.players.length/$scope.pageSize);
    }

    // Install http-server by command "sudo npm install -g http-server"
    // Use command http-server to serve up JSON file
    $http.get("../json/starCraftData.json").then(pushToPlayers);

    function Player(username, name, region, race, wins, losses) {
      this.username = username;
      this.name = name;
      this.region = region;
      this.race = race;
      this.wins = wins;
      this.losses = losses;
      this.winPrct = +((this.wins/(this.wins+this.losses))*100).toFixed(2);
    };

    function pushToPlayers(jsonObject) {
      jsonObject.data.cols.forEach(function(arrEl) {
        $scope.tableHeaders.push(arrEl)
      });
      $scope.tableHeaders.push("Win Ratio");
      jsonObject.data.data.forEach(function(arrEl) {
        $scope.players.push(new Player(arrEl[0], arrEl[1], arrEl[2], arrEl[3], arrEl[4], arrEl[5]));
      });
    };

    }]);

angular.module('rankingApp', [])
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    }
  })
  .controller('rankingController', ['$scope', '$http', function($scope, $http) {
    $scope.players = [];
    $scope.filteredPlayers = [];
    $scope.tableHeaders = ['Rank', 'Username', 'Fullname', 'Region', 'Race', 'Games Played', 'Wins', 'Losses', 'Win Percentage'];
    $scope.currentPage = 0;
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
      this.games = this.wins + this.losses;
      this.winPrct = (this.wins/this.games).toFixed(3);
    };

    function pushToPlayers(jsonObject) {
      jsonObject.data.data.forEach(function(arrEl) {
        $scope.players.push(new Player(arrEl[0], arrEl[1], arrEl[2], arrEl[3], arrEl[4], arrEl[5]));
      });
      assignRankings();
    };

    function assignRankings() {
      $scope.players = _.sortBy($scope.players, 'winPrct').reverse();
      $scope.players = _.each($scope.players, function(element, index) {
        _.extend(element, {rank : (index+1)});
      });
    }

  }]);

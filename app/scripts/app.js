// require("./landing");
// require("./collection");
// require("./album");
// require("./profile");

// angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {
var blocJams = angular.module('BlocJams', ['ui.router']);

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/templates/landing.html'
  });

  $stateProvider.state('song', {
    url: '/song',
    controller: 'Song.controller',
    templateUrl: '/templates/song.html'
  });

}]);

blocJams.controller('Landing.controller', ['$scope', function($scope){
  $scope.title = "Bloc Jams";
  $scope.subText = 'Turn the music up!';

  $scope.subTextClicked = function(){
    $scope.subText += '!';
  };

  $scope.albumURLs = [
    '/images/album-placeholders/album-1.jpg',
    '/images/album-placeholders/album-2.jpg',
    '/images/album-placeholders/album-3.jpg',
    '/images/album-placeholders/album-4.jpg',
    '/images/album-placeholders/album-5.jpg',
    '/images/album-placeholders/album-6.jpg',
    '/images/album-placeholders/album-7.jpg',
    '/images/album-placeholders/album-8.jpg',
    '/images/album-placeholders/album-9.jpg'
  ];

}]);

blocJams.controller('Song.controller', ['$scope', function($scope){
  $scope.title = "I'm not one of those who can easily hide.";
}])

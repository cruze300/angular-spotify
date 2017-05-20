angular
  .module('spotifyApp', ['spotify'])
  .config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('123456789123456789');
    SpotifyProvider.setRedirectUri('http://example.com/callback.html');
    SpotifyProvider.setScope('playlist-read-private');
  })
  .directive("trackspotify", function() {
    return {
        templateUrl: '../views/trackList.html'
    };
  })
  // For Artist Search
  // .directive("artistspotify", function() {
  //   return {
  //       templateUrl: '../views/artistList.html'
  //   };
  // })
  // For Album Search
  // .directive("albumspotify", function() {
  //   return {
  //       templateUrl: '../views/albumList.html'
  //   };
  // })
  .directive("toptrackspotify", function() {
    return {
        templateUrl: '../views/topTrackList.html'
    };
  })

  .controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

    $scope.searchMaster = function () {
      Spotify.search($scope.searchmaster, 'track').then(function (data) {
        $scope.tracks = data.data.tracks.items;
      });

      // Artist Service Call
      // Spotify.search($scope.searchmaster, 'artist').then(function (data) {
      //   $scope.artists = data.data.artists.items;
      // });

      // Album Service Call
      // Spotify.search($scope.searchmaster, 'album').then(function (data) {
      //   $scope.albums = data.data.albums.items;
      // });
    };

    // Top List Arrays
    $scope.topLists = [];

    // Add a Item to the Top list
    $scope.addItem = function (track, $event, $index) {
        if($scope.topLists.length < 10) {
            $scope.alertMax = false;
            $scope.topLists.push({
               track: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               note: "",
               customImage: track.album.images[0].url
            });
        } else {
           $scope.alertMax = true;
        }
    };

    // JSON Obj Console Print
    $scope.getJson = function () {
      $scope.myJsonString = JSON.stringify($scope.topLists);
      console.log('Json String Start ' + $scope.myJsonString);
      $scope.alertConsole = true;
    };

  }]);

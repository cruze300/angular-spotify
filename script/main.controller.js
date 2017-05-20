angular
  .module('spotifyApp', ['spotify'])
  .config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('123456789123456789');
    SpotifyProvider.setRedirectUri('http://example.com/callback.html');
    SpotifyProvider.setScope('playlist-read-private');
  })
  .controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (data) {
        $scope.artists = data.data.artists.items;
      });

      Spotify.search($scope.searchartist, 'track').then(function (data) {
        $scope.tracks = data.data.tracks.items;
      });

      Spotify.search($scope.searchartist, 'album').then(function (data) {
        $scope.albums = data.data.albums.items;
      });
    };

    // Top List Arrays
    $scope.topLists = [];

    // Add a Item to the Top list
    $scope.addItem = function () {

        $scope.topLists.push({
           track: $scope.topTrack,
           artist: $scope.topArtist,
           album: $scope.topAlbum,
           note: $scope.topNote,
           customImage: $scope.topImgSource
        });

        // Clear input fields after push
        // $scope.topTrack = "";
        // $scope.topArtist = "";
        // $scope.topAlbum = "";
        // $scope.topNote = "";
        // $scope.topImgSource = "";

        console.log($scope.topLists);

    };

  }]);

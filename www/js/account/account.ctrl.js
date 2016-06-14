angular.module('nwind')
  .controller('AccountCtrl', function($scope, Session, $window, $state, Address, LocationService) {
    $scope.setMap = function(address){
      var point = { latitude: address.lat, longitude: address.lng };
      $scope.map = { center: point, zoom: 14 };
      $scope.marker = { id: address.id || 1, coords: point };
    };

    Session.me()
      .then(function(user){
        return Address.findAll({userId: user.id});
      })
      .then(function(addresses){
        $scope.addresses = addresses;
        if($scope.addresses.length)
          $scope.setMap($scope.addresses[0]);
        else
          $scope.setMap({ latitude: 45, longitude: -73 });
      });

    $scope.logout = function(){
      Session.logout()
        .then(function(){
           $state.go('tab.home');
        });
    };
    $scope.location = LocationService.location;
    $scope.$watch('location', function(curr){
      $scope.here = {
        id: 2,
        coords: { latitude: curr.lat, longitude: curr.lng }
      };
      console.log('Account Ctrl', JSON.stringify(curr));
    }, true);
    $scope.auth = Session.auth;
    $scope.settings = {
      enableFriends: true
    };
  });

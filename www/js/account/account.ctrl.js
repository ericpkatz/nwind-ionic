angular.module('nwind')
  .controller('AccountCtrl', function($scope, Session, $window, $state, Address) {
    $scope.setMap = function(address){
      $scope.map = { center: { latitude: address.lat, longitude: address.lng }, zoom: 14 };
    };
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 14 };
    Session.me()
      .then(function(user){
        return Address.findAll({userId: user.id});
      })
      .then(function(addresses){
        $scope.addresses = addresses;
      });
    $scope.logout = function(){
      Session.logout()
        .then(function(){
           $state.go('tab.home');
        });
    };
    $scope.auth = Session.auth;
    $scope.settings = {
      enableFriends: true
    };
  });

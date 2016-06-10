angular.module('nwind')
  .controller('AccountCtrl', function($scope, Session, $window, $state, Address) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
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

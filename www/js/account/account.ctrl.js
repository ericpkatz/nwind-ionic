angular.module('nwind')
  .controller('AccountCtrl', function($scope, Session, $window, $state, Address) {
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

angular.module('nwind')
  .controller('AccountCtrl', function($scope, Session, $window, $state) {
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

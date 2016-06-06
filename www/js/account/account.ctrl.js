angular.module('nwind')
  .controller('AccountCtrl', function($scope, Session, $window, $state) {
    $scope.logout = function(){
      $window.localStorage.removeItem('token');
      angular.copy({}, Session.auth);
      $state.go('tab.home');
    };
    $scope.auth = Session.auth;
    $scope.settings = {
      enableFriends: true
    };
  });

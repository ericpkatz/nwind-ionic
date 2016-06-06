angular.module('nwind')
  .controller('HomeCtrl', function($scope, Session){
    $scope.showLogin = function(){
      return !Session.auth.id;
    };
  });

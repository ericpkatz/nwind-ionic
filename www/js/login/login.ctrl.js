angular.module('nwind')
  .controller('LoginCtrl', function($scope, Session, $window, $state){
        $scope.credentials = {
          email: 'curly.katz@example.com',
          password: 'Curly'
        
        };
        $scope.login = function(){
          Session.login($scope.credentials)
            .then(function(){
              console.log(Session.auth);
              $state.go('tab.account');
            });
        };
      });

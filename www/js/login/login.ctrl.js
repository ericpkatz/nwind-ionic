angular.module('nwind')
  .controller('LoginCtrl', function($scope, Session, $window, $state){
        $scope.credentials = {
          email: 'curly.katz@example.com',
          password: 'Curly'
        
        };
        $scope.login = function(){
          Session.create($scope.credentials)
            .then(function(response){
              $window.localStorage.setItem('token', response.id);
              return Session.find(response.id, { bypassCache: true});
            })
            .then(function(user){
              angular.copy(user, Session.auth);
              $state.go('tab.account');
            });
        };
      });

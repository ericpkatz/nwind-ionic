angular.module('nwind')
  .config(function($stateProvider){
    $stateProvider
      .state('tab.account', {
        url: '/account',
        resolve: {
          user: function(Session, $state, $timeout, $q, $window){
            if(!$window.localStorage['token'])
            {
              $timeout(function(){
                $state.go('login');
              }, 0);
            }
            else{
              return Session.find($window.localStorage['token']);
            }
          }
        },
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });
  });

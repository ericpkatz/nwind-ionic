angular.module('nwind')
  .config(function($stateProvider){
    $stateProvider
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            controller: 'HomeCtrl',
            templateUrl: 'templates/tab-home.html'
          }
        }
      });
  });

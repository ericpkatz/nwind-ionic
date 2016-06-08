angular.module('nwind')
  .config(function($stateProvider){
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
      });
  
  });

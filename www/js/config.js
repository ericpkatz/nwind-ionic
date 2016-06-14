angular.module('nwind')
  .run(function($ionicPlatform, LocationService){
    $ionicPlatform.ready(function(){
      LocationService.start();
    });
  })
  .constant('API', 'http://nwind-api.herokuapp.com/api')
  //.constant('API', 'http://localhost:3000/api')
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    });

    // Each tab has its own nav history stack:

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  })
  .run(function(DS, API){
    //DS.adapters.http.defaults.basePath = 'http://localhost:3000/api';
    DS.adapters.http.defaults.basePath = API;
  });

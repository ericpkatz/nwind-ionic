angular.module('nwind')
  .run(function($ionicPlatform, LocationService){
    $ionicPlatform.ready(function(){
      LocationService.start();
       // Get a reference to the plugin.
    var bgGeo = window.BackgroundGeolocation;


    //This callback will be executed every time a geolocation is recorded in the background.
    var callbackFn = function(location, taskId) {
        var coords = location.coords;
        var lat    = coords.latitude;
        var lng    = coords.longitude;
        console.log('- Location: ', JSON.stringify(location));

        // Must signal completion of your callbackFn.
        bgGeo.finish(taskId);
    };

    // This callback will be executed if a location-error occurs.  Eg: this will be called if user disables location-services.
    var failureFn = function(errorCode) {
        console.warn('- BackgroundGeoLocation error: ', errorCode);
    }

    // Listen to location events & errors.
    bgGeo.on('location', callbackFn, failureFn);

    // Fired whenever state changes from moving->stationary or vice-versa.
    bgGeo.on('motionchange', function(isMoving) {
      console.log('- onMotionChange: ', isMoving);
    });

    // BackgroundGeoLocation is highly configurable.
    bgGeo.configure({
        // Geolocation config
        desiredAccuracy: 0,
        distanceFilter: 10,
        stationaryRadius: 50,
        locationUpdateInterval: 1000,
        fastestLocationUpdateInterval: 5000,

        // Activity Recognition config
        activityType: 'AutomotiveNavigation',
        activityRecognitionInterval: 5000,
        stopTimeout: 5,

        // Application config
        debug: true,
        stopOnTerminate: false,
        startOnBoot: true,

        // HTTP / SQLite config
        url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
        method: 'POST',
        autoSync: true,
        maxDaysToPersist: 1,
        headers: {
            "X-FOO": "bar"
        },
        params: {
            "auth_token": "maybe_your_server_authenticates_via_token_YES?"
        }
    }, function(state) {
        // This callback is executed when the plugin is ready to use.
        console.log('BackgroundGeolocation ready: ', state);
        if (!state.enabled) {
            bgGeo.start();
        }
    });

    // The plugin is typically toggled with some button on your UI.
    function onToggleEnabled(value) {
        if (value) {
            bgGeo.start();
        } else {
            bgGeo.stop();
        }
    }
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

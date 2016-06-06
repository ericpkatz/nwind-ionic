angular.module('nwind')
  .factory('Session', function(DS, $q, $window) {
    var factory = DS.defineResource({
      name: 'session',
      endpoint: 'sessions'
    });
    factory.auth = {};

    factory.me = function(){
      if(!$window.localStorage.getItem('token'))
        return $q.when(null);
      if(factory.auth.id){
        return $q.when(factory.auth);
      }
      return factory.find($window.localStorage.getItem('token')) 
      .then(function(response){
        angular.copy(response.data, factory.auth);
        return factory.auth;
      });
    };
    return factory;
  })
  .run(function(Session, $window){
    if($window.localStorage.getItem('token'))
      Session.find($window.localStorage.getItem('token'), { bypassCache: true})
      .then(function(user){
        angular.copy(user, Session.auth);
      });
  });

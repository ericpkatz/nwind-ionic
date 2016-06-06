angular.module('starter.services', [])
.factory('User', function($q, $http, DS) {
  var service = DS.defineResource({
    name: 'user',
    endpoint: 'users'
  });
  return service;
})
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
.factory('Department', function(DS) {
  var factory = DS.defineResource({
    name: 'department',
    endpoint: 'departments'
  });
  return factory;
})
.factory('FavoriteProduct', function(DS) {
  var service = DS.defineResource({
    name: 'favoriteProduct',
    endpoint: 'favoriteProducts',
    relations: {
      belongsTo: {
        user: {
          parent: true,
          localKey: 'userId',
          localField: 'user'
        }
      }
    }
  });
  return service;
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

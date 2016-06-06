angular.module('starter.services', [])
.factory('User', function($q, $http, DS) {
  var service = DS.defineResource({
    name: 'user',
    endpoint: 'users'
  });
  return service;
});

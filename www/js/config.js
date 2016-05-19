angular.module('nwind')
  .run(function(DS){
    DS.adapters.http.defaults.basePath = 'http://localhost:3000/api';
  });

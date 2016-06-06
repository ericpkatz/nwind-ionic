angular.module('nwind')
  .factory('Category', function(DS) {
    var factory = DS.defineResource({
      name: 'category',
      endpoint: 'categories'
    });
    return factory;
  });

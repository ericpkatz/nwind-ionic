angular.module('nwind')
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
  });

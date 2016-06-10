angular.module('nwind')
  .factory('Address', function(DS) {
    var service = DS.defineResource({
      name: 'address',
      endpoint: 'addresses',
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

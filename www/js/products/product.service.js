angular.module('nwind')
.factory('Product', function(DS) {
  var service = DS.defineResource({
    name: 'product',
    endpoint: 'products',
    relations: {
      belongsTo: {
        category: {
          parent: true,
          localKey: 'categoryId',
          localField: 'category'
        }
      }
    }
  });
  return service;
})

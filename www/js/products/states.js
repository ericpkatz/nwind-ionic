angular.module('nwind')
  .config(function($stateProvider){
    $stateProvider
      .state('tab.categories', {
        url: '/categories',
        resolve: {
          categories: function(Category){
    
            return Category.findAll();
          }
        },
        views: {
          'tab-categories': {
            templateUrl: 'templates/tab-categories.html',
            controller: 'CategoriesCtrl',
          }
        }
      })
      .state('tab.category', {
        url: '/categories/:id',
        resolve: {
          favoriteProducts: function(Session, FavoriteProduct){
            return Session.me()
              .then(function(me){
                if(!me)
                  return null;
                return FavoriteProduct.findAll({userId: me.id});
              });
          },
          products: function(Product, $stateParams){
            return Product.findAll({categoryId: $stateParams.id});
          },
          category: function(Category, $stateParams){
            return Category.find($stateParams.id);
          }
        },
        views: {
          'tab-categories': {
            templateUrl: 'templates/tab-category.html',
            controller: 'ProductsCtrl'
          }
        }
      });
  });

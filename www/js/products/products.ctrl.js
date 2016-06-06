angular.module('nwind')
  .controller('ProductsCtrl', function(API, $http, category, $scope, products, Session, $ionicPopup, FavoriteProduct, User){
            $scope.products = products;
            $scope.category = category;
            $scope.auth = Session.auth;


            $scope.addFavorite = function(product){
              User.inject(Session.auth);
              FavoriteProduct.create({productId: product.id, userId: Session.auth.id})
                .then(function(favoriteProduct){
                  Session.auth.favoriteProducts.push(favoriteProduct);
                 var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: 'Favorite Product has Been Added'
                  });
                
                });
            };

            $scope.removeFavorite = function(product){
              var filtered = Session.auth.favoriteProducts
                .filter(function(favoriteProduct){
                  return favoriteProduct.productId === product.id;
                });
              var favoriteProduct = filtered[0];  
              User.inject(Session.auth);
              FavoriteProduct.inject(favoriteProduct);
              FavoriteProduct.destroy({id: favoriteProduct.id, userId: Session.auth.id})
                .then(function(){
                  var index = Session.auth.favoriteProducts.indexOf(favoriteProduct);
                  Session.auth.favoriteProducts.splice(index, 1);
                 var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: 'Favorite product has been removed.'
                  });
                });
            };

            $scope.loggedIn = function(){
              return Session.auth.id;
            };
            
            $scope.isFavorite = function(product){
              if(!Session.auth.id)
                return false;
              var favoriteIds = Session.auth.favoriteProducts
                .map(function(favoriteProduct){
                  return favoriteProduct.productId;
                });
              return favoriteIds.indexOf(product.id) !== -1;
            };
          });

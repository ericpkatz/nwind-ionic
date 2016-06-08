angular.module('nwind')
  .controller('ProductsCtrl', function(API, $http, category, $scope, products, Session, $ionicPopup, FavoriteProduct, User, favoriteProducts){
    console.log(favoriteProducts);
            $scope.products = products;
            $scope.category = category;
            $scope.auth = Session.auth;


            $scope.addFavorite = function(product){
              FavoriteProduct.create({productId: product.id, userId: Session.auth.id})
                .then(function(favoriteProduct){
                  favoriteProducts.push(favoriteProduct);//why?
                });
            };

            $scope.removeFavorite = function(product){
              var filtered = favoriteProducts
                .filter(function(favoriteProduct){
                  return favoriteProduct.productId === product.id;
                });
              var favoriteProduct = filtered[0];  
              var alertPopup = $ionicPopup.confirm({
                 title: 'Are you sure',
                 template: 'That you want to remove..'
              });
              alertPopup.then(function(res){
                if(res)
                  FavoriteProduct.destroy({ id: favoriteProduct.id })
                    .then(function(){

                    });
              });
            };

            $scope.loggedIn = function(){
              return Session.auth.id;
            };
            
            $scope.isFavorite = function(product){
              if(!favoriteProducts)
                return false;
              var favoriteIds = favoriteProducts
                .map(function(favoriteProduct){
                  return favoriteProduct.productId;
                });
              return favoriteIds.indexOf(product.id) !== -1;
            };
          });

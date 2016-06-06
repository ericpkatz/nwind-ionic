angular.module('nwind')
  .controller('CategoriesCtrl', function(categories, $scope){
            $scope.categories = categories;
  });

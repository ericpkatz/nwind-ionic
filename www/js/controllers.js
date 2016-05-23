angular.module('starter.controllers', [])

.controller('UsersCtrl', function($scope, UserService) {
  UserService.findAll()
    .then(function(users){
      $scope.users = users;
    });

})
.controller('UsersDetailCtrl', function($scope, UserService, $stateParams) {
  UserService.find($stateParams.id)
    .then(function(user){
      $scope.user = user;
      $scope.selectedFavorite = 'favorite';
      $scope.selectTab = function(favorite){
        $scope.selectedFavorite = favorite;
      };
    });

})

.controller('ProductsCtrl', function($scope, CategoryService) {
  CategoryService.findAll()
    .then(function(categories){
      $scope.categories = categories;
    });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

angular.module('starter.controllers', [])

.controller('UsersCtrl', function($scope, UserService) {
  UserService.fetchAll()
    .then(function(users){
      $scope.users = users;
    });

})
.controller('UsersDetailCtrl', function($scope, UserService, $stateParams) {
  UserService.fetchOne($stateParams.id)
    .then(function(user){
      $scope.user = user;
    });

})

.controller('ProductsCtrl', function($scope) {
  $scope.products = [
    {
      id: 1,
      name: 'Foo'
    },
    {
      id: 2,
      name: 'Bar'
    },
    {
      id: 3,
      name: 'Bazz'
    },
  ];

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

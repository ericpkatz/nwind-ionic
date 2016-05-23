angular.module('nwind')
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.products', {
      url: '/products',
      views: {
        'tab-products': {
          templateUrl: 'templates/tab-products.html',
          controller: 'ProductsCtrl'
        }
      }
    })
    .state('tab.productsByCategory', {
      url: '/products/category/:id',
      views: {
        'tab-products': {
          templateUrl: 'templates/tab-products-by-category.html',
          //controller: 'ProductsCtrl'
        }
      }
    })
    .state('tab.users', {
      url: '/users',
      views: {
        'tab-users': {
          templateUrl: 'templates/tab-users.html',
          controller: 'UsersCtrl'
        }
      }
    })
    .state('tab.userDetail', {
      url: '/users/:id',
      views: {
        'tab-users': {
          templateUrl: 'templates/users-detail.html',
          controller: 'UsersDetailCtrl'
        }
      }
    })
    .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/products');

  })
  .run(function(DS){
    DS.adapters.http.defaults.basePath = 'http://localhost:3000/api';
  });

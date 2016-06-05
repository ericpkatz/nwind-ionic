angular.module('nwind')
  .run(function(Session, $window){
    if($window.localStorage.getItem('token'))
      Session.find($window.localStorage.getItem('token'), { bypassCache: true})
      .then(function(user){
        angular.copy(user, Session.auth);
      });
  
  })
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
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html'
        }
      }
    })
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
          controller: function(categories, $scope){
            $scope.categories = categories;
          }
        }
      }
    })
    .state('tab.category', {
      url: '/categories/:id',
      resolve: {
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
          controller: function(category, $scope, products, Session){
            $scope.products = products;
            $scope.category = category;
            $scope.auth = Session.auth;
          }
        }
      }
    })
    .state('tab.departments', {
      url: '/departments',
      views: {
        'tab-departments': {
          cache: false,
          resolve: {
            departments: function(Department, $ionicLoading){
              return Department.findAll()
                .then(function(departments){
                  return departments;
                });
            }
          },
          templateUrl: 'templates/tab-departments.html',
          controller: function($scope, departments){
            $scope.departments = departments;
          }
        }
      },
    })
    .state('tab.department', {
      cache: false,
      url: '/department/:id',
      resolve: {
        department: function(Department, $stateParams, $ionicLoading){
          return Department.find($stateParams.id);
        },
        departments: function(Department){
          return Department.findAll();
        }
      },
      views: {
        'tab-departments': {
          cache: false,
          templateUrl: 'templates/tab-department.html',
          controller: function($ionicLoading, $scope, department, departments, $state){
            $scope.idx = departments.indexOf(department);
            $scope.departments = departments;
            $scope.department = department;
            $scope.next = function(){
              $scope.idx++;
              $scope.department = departments[$scope.idx];
            };
            $scope.previous = function(){
              $scope.idx--;
              $scope.department = departments[$scope.idx];
            };
          }
        }
      }
    })
    .state('tab.users', {
      cache: false,
      url: '/users',
      views: {
        'tab-users': {
          templateUrl: 'templates/tab-users.html',
          controller: 'UsersCtrl'
        }
      }
    })
    .state('tab.userDetail', {
      cache: false,
      url: '/users/:id',
      views: {
        'tab-users': {
          templateUrl: 'templates/users-detail.html',
          controller: 'UsersDetailCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      resolve: {
        user: function(Session, $state, $timeout, $q, $window){
          if(!$window.localStorage['token'])
          {
            $timeout(function(){
              $state.go('login');
            }, 0);
          }
          else{
            return Session.find($window.localStorage['token']);
          }
        }
      },
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/tab-login.html',
      controller: function($scope, Session, $window, $state){
        $scope.credentials = {};
        $scope.login = function(){
          Session.create($scope.credentials)
            .then(function(response){
              $window.localStorage.setItem('token', response.id);
              return Session.find(response.id, { bypassCache: true});
            })
            .then(function(user){
              angular.copy(user, Session.auth);
              $state.go('tab.account');
            });
        };
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  })
  .run(function(DS){
    //DS.adapters.http.defaults.basePath = 'http://localhost:3000/api';
    DS.adapters.http.defaults.basePath = 'http://nwind-api.herokuapp.com/api';
  });

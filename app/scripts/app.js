'use strict';

angular.module('sistemaDeControlApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'filters',
  'angularShamSpinner'
])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('index',{
        url:'/',
        templateUrl: '/views/index.html',
        controller: 'HomeCtrl',
        requireLogin: true
      })
      .state('index.dashboard',{
        url:'dashboard',
        templateUrl:'/views/main.html',
        controller: 'HomeCtrl',
        requireLogin: true
      })
      .state('index.casos-agregar',{
        url:'casos/:type/add',
        templateUrl:'/views/casos/add.html',
        controller: 'CaseCtrl',
        requireLogin: true,
        data:{
          action: 'add'
        }
      })
      .state('index.casos',{
        url:'casos/:type/list',
        templateUrl:'/views/casos/list.html',
        controller: 'CaseCtrl',
        requireLogin: true,
        data:{
          action: 'list'
        }
      })
      .state('index.casos-view',{
        url:'casos/:type/get/:folio',
        templateUrl:'/views/casos/view.html',
        controller: 'CaseCtrl',
        requireLogin: true,
        data:{
          action: 'view'
        }
      })
      .state('index.search',{
        url:'search',
        templateUrl:'/views/search-results.html',
        controller: 'CaseCtrl',
        requireLogin: true,
        data:{
          action: 'search'
        }
      })
      .state('login',{
        url:'/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl',
        requireLogin: false
      })
      .state('error_404',{
        url:'/404',
        templateUrl: '/views/404.html',
        controller: 'HomeCtrl',
        requireLogin: false
      });

  }])

.run(['$rootScope','AuthenticationService', '$state', function($rootScope, AuthenticationService, $state){
    var RequiredLogin = false;


    $rootScope.$on("$stateChangeStart", function(event, toState, toParams) {
      var Auth = AuthenticationService.getUserAuthenticated();



      RequiredLogin = toState.requireLogin || false;

      if(RequiredLogin ) {
        if(Auth){
          Auth.success(function(e){
            if(e.valid){
              if (toState.name === 'index'){
                  $state.go ("index.dashboard");
                  return false;
              }
              $state.go(toState.name, toParams);
              event.preventDefault();
            }else{
              $state.go('login', toParams);
              event.preventDefault();
            }
          });
        } else {
          $state.go('login', toParams);
          event.preventDefault();
        }

      }
      //event.preventDefault();
    });

}]);



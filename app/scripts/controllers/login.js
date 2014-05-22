'use strict';

angular.module('sistemaDeControlApp')
  .controller('LoginCtrl',['$scope', '$state','cookieService', '$User',  function ($scope, $state, cookieService, $User ) {
    $scope.username = '';
    $scope.password = '';

    cookieService.removeCookie('auth');
    cookieService.removeCookie('user');

    $scope.login = function(){
        $User.login($scope.username, $scope.password)
        .success(function(User){
            cookieService.cookie('auth',{
                id: User.id,
                user: User.user,
                token: User.auth
            });

            cookieService.cookie('user',{
                id: User.id,
                user: User.user,
                name: User.name,
                lastname: User.lastname

            });

            $state.go('index');
        })
        .error(function(){

        });
    }

  }]);

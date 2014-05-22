'use strict';

angular.module('sistemaDeControlApp')
  .factory('$User',['$http',function ($http) {
    return {
      login: function(username, password){
        return $http.post('http://transformemos-mexico.org:8080/v1/users/login', {username:username, password:password});
      },
      check: function(user_id, username, token){
        return $http.post('http://transformemos-mexico.org:8080/v1/users/check', {user_id: user_id, username:username, token:token});
      }
    }
  }]);

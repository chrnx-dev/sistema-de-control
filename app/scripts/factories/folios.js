'use strict';

angular.module('sistemaDeControlApp')
  .factory('$Folio',['$http',function ($http) {
    return {
      get: function(module){
        return $http.get('http://transformemos-mexico.org:8080/v1/folio/' + module);
      },
      increase: function(module){
        return $http.post('http://transformemos-mexico.org:8080/v1/folio/'+module+'/increase');
      }
    }
  }]);

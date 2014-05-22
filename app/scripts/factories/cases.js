'use strict';

angular.module('sistemaDeControlApp')
  .factory('$Case',['$http',function ($http) {
    return {
      list: function(type, status, page, per_page){
        type = type || 'otros';
        page = page || 1;
        per_page = per_page || '20';
        var strStatus = '';
        if (typeof status !== 'undefined') {
          strStatus += '&status=' + status || '';
        };

        if (typeof page !== 'undefined') {
          strStatus += '&page=' + page ;
        };

        if (typeof per_page !== 'undefined') {
          strStatus += '&p=' + per_page ;
        };

        return $http.get('http://transformemos-mexico.org:8080/v1/cases/list?tipo=' + type + strStatus) ;
      },
      count: function(){
        return $http.get('http://transformemos-mexico.org:8080/v1/cases/count') ;
      },
      get: function(folio){
        return $http.get('http://transformemos-mexico.org:8080/v1/cases/' + folio) ;
      },
      search: function(search){
        search = search || ''
        return $http.get('http://transformemos-mexico.org:8080/v1/cases/search/' + search);
      },
      add: function(data){
        return $http.post('http://transformemos-mexico.org:8080/v1/cases/add', data);
      },
      status: function(id, field, value){
        return $http.post('http://transformemos-mexico.org:8080/v1/cases/status', {request:JSON.stringify({id: id, field: field, value:value})});
      },
      setup: function(type){
        var config ={
          educacion:{
            subtypes:[
              {
                id: 'becas',
                name: 'Becas'
              }
            ],
            title: 'Educación'
          },
          salud:{
            subtypes:[
              {
                id: 'apoyo-medico',
                name: 'Apoyo Médico'
              }
            ],
            title: 'Salud'
          },
          social:{
            subtypes:[
              {
                id: 'bolsa-trabajo',
                name: 'Bolsa de Trabajo'
              },
              {
                id: 'apoyo-economico',
                name: 'Apoyo Económico'
              },
              {
                id: 'gestion-social',
                name: 'Gestión Social'
              }
            ],
            title: 'Social'

          }
        };

        if (typeof config[type] !== 'object') {
          return {
            subtypes:[
              {
                id: 'becas',
                name: 'Becas'
              }
            ],
            title: 'Otros',
            filter: 'otros'
          }
        }
        return config[type];
      }
    }
  }]);

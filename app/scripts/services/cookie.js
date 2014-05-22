'use strict';

angular.module('sistemaDeControlApp')
.service('cookieService',['$http',function ($http) {
  $.cookie.json = true;
  $.cookie.raw = true;
  return {


    cookie: $.cookie,
    removeCookie: $.removeCookie
  }
}]);

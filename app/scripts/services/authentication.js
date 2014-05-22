'use strict';

angular.module('sistemaDeControlApp')
.service('AuthenticationService',['$http','cookieService','$User',function ($http, cookieService, $User) {
	var userIsAuthenticated = false;

	this.setUserAuthenticated = function(value){
		userIsAuthenticated = value;
	};

	this.getUserAuthenticated = function(){
    var Auth = cookieService.cookie('auth') || false;

    if (Auth){
      Auth = JSON.parse(Auth);
      return $User.check(Auth.id, Auth.user, Auth.token);
    }
		return  false;
	};
}]);

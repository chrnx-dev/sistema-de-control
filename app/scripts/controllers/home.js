'use strict';

angular.module('sistemaDeControlApp')
  .controller('HomeCtrl',['$scope', '$state', '$Case', function ($scope, $state, $Case) {

    $Case.count().success(function(counts){
      countUp(counts['educacion']);
      countUp2(counts['salud']);
      countUp3(counts['social']);
      countUp4(counts['otros']);
    })

  }]);

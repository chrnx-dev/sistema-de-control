'use strict';

angular.module('sistemaDeControlApp')
  .controller('CaseCtrl', ['$scope', '$Case', '$Folio', '$state', '$stateParams','cookieService', '$q',
    function ($scope, $Case,$Folio, $state, $stateParams, cookieService, $q) {

      $scope.CaseType = $stateParams.type || 'otros';
      $scope.Cases = {total:0, page:0, pagination:20};
      $scope.fields = {};
      $scope.setup = $Case.setup($scope.CaseType);

      $scope.user = cookieService.cookie('user');


      if( $scope.user ){
          $scope.user = JSON.parse($scope.user);
      }




    $scope.counts = function(Total, Page, Pagination){

      if ( (Pagination * Page) <= Total){
        return (Pagination * Page);
      }else {
        return Total;
      }

    };

    $scope.countInit = function(Page, Pagination){
      return (Page-1)*Pagination + 1
    };

    $scope.padding = function  (number, paddingChar,i) {
      var padding = new Array(number + 1).join(paddingChar);
      return padding.substr(0, padding.length - (Math.floor(i).toString().length)) + Math.floor(i );
    };

    $scope.statusClass = function(status){
      var classes = {
        "en-espera":"warning",
        "en-tramite":"primary",
        "resuelto":"success",
        "cancelado":"danger"
      };

      if (typeof classes[status] !== 'string'){
        return 'info';
      }

      return classes[status];

    };

    $scope.statusMessage = function(status){
      if (typeof status === 'undefined'){
        return '';
      }

      var classes = {
        "en-espera":"En Espera",
        "en-tramite":"En Trámite",
        "resuelto":"Resuelto",
        "cancelado":"Cancelado"
      };

      if (typeof classes[status] !== 'string'){
        return 'info';
      }

      return classes[status];

    };

    $scope.subjectMessage = function(subject, type){

      if (subject){
        $state.current.data = $state.current.data || { filter:'' };
        var type = type || $scope.CaseType,
            Setup = $Case.setup(type);
        return _.findWhere(Setup.subtypes, {id:subject}).name;
      }

      return '';
    };

    $scope.getFilter = function(){
      return $scope.CaseType;
    }

    $scope.getDate = function(date){
      moment.lang('es');
      return moment(date).fromNow();
    }

    $scope.listFilter = function(filter, page, per_page){

      if(filter){
        $Case.list($scope.CaseType, filter, page, per_page).then(function(cases){
          $scope.Cases= cases.data;

        });
      }else{
        $Case.list($scope.CaseType, '', page, per_page).then(function(cases){
            $scope.Cases= cases.data;

        });
      }

    };

    $scope.addCase = function(){
        var data = {
          _creator: $scope.user.id,
          name: '',
          folio:'',
          subject: '',
          email: '',
          phone: '',
          description:'',
          status:'en-tramite',
          observacion: '',
          canalizacion: '',
          seen: false,
          tipo: $scope.CaseType,
          city:'culiacan'
        },
        ready = {};

        angular.extend(ready, data);

        angular.extend(ready, $scope.fields);

        $Folio.get('cases').then(function(folio){
          ready.folio = $scope.padding(10,"0",folio.data.folio);
          $Case.add(ready).then(function(response){
              $Folio.increase('cases').then(function(){
                $state.go('index.casos', $stateParams);

              });
          });

        });
        return false;
    };

    $scope.changeStatus = function(status){
      status = status || ''
      var selectedCases = $('.mail-checkbox:checked'),
        currentCase,
        promises = [];
      angular.forEach(selectedCases, function(selectedCase){
        promises.push($Case.status($(selectedCase).attr('data-id'), 'status', status))

      });

      $q.all(promises).then(function(){
        $scope.Actions('list').call($scope);
      });

    };

    $scope.nextPage = function(page, per_page){
      if(page !== -1){
        $scope.listFilter('', page, per_page);
      }
    };


    $scope.Actions = function(action){
      var actions = {
        list: function(){
          $Case.list($scope.CaseType).then(function(cases){
              $scope.Cases= cases.data;
          });
        },
        view: function(){

          $Case.get($stateParams.folio).then( function(Case){
            $scope.Cases = Case.data;
            $Case.status(Case.data._id, 'seen', true);
            console.log(Case.data._id);
          });
        }

      };

      if (typeof actions[action] !== 'function'){
        return function(){console.log('No action')};
      }

      return actions[action];
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.Actions($state.current.data.action).call($scope);

    });

  }]);

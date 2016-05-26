var beerApp = angular.module('beerApp', ['ngRoute']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.when('/', {templateUrl: 'index.html', controller: 'BeerController.js'});
		$locationProvider.html5Mode({enabled: true, requireBase: false});
  }]);

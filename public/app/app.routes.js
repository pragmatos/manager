angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/views/home.html',
		})
		.when('/login', {
			templateUrl: 'app/views/login-page.html'
		})
		.when('/signup', {
			templateUrl: 'app/views/signup-page.html'
		})
		.when('/channels', {
			templateUrl: 'app/views/channels.html'
		})
		.when('/categories', {
			templateUrl: 'app/views/categories.html',
			controller: 'CategoryController',
			controllerAs: 'category'
		})

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
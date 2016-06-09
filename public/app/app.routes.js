angular.module('appRoutes', ['ngRoute','as.sortable'])

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
		.when('/categories', {
			templateUrl: 'app/views/categories.html',
			controller: 'CategoryController',
			controllerAs: 'category'
		})
		.when('/channels', {
			templateUrl: 'app/views/channels.html',
			controller: 'ChannelsController'
		})
		.when('/users', {
			templateUrl: 'app/views/users.html',
			controller: 'UserController'
		})
		.when('/playlist', {
			templateUrl: 'app/views/playlist.html',
			controller: 'PlaylistController'
		})
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
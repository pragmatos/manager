angular.module('Manager',[
	'mainController', 
	'authService',
	'playlistService',
	'appRoutes',
	'userController',
	'categoryController',
	'channelsController',
	'playlistController'
	])
 
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});

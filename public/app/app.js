angular.module('Manager',[
	'mainController', 
	'authService',
	'playlistService',
	'appRoutes',
	'userController',
	'categoryController',
	'channelsController',
	'playlistController',
	'userChannelsController'
	])
 
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});

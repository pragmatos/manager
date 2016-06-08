angular.module('Manager',[
	'mainController', 
	'authService',
	'appRoutes',
	'userController',
	'categoryController',
	'channelsController'
	])
 
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});

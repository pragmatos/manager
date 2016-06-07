angular.module('Manager',[
	'mainController', 
	'authService',
	'appRoutes',
	'userController',
	'categoryController'
	])
 
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});

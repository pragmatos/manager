angular.module('Manager',[
	'ngDialog',
	'mainController', 
	'authService',
	'appRoutes',
	'userController',
	'categoryController'
	])
 
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});

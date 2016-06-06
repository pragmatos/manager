angular.module('Manager',[
	'mainController', 
	'authService',
	'appRoutes',
	'userController'
	])
 
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});

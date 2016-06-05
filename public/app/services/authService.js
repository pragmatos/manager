angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken){
		
	var authFactory = {};

	authFactory.login = function(login, pass){

		return $http.post('/api/users/login',{
			login: login,
			pass: pass
		})
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	}

	authFactory.logout = function(){
		AuthToken.setToken();
	}

	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken())
			return true;
		else
			return false;
	}

	authFactory.getUser = function(){
		if(AuthToken.getToken())
			return $http.get('/me');
		else
			return $q.reject({ message: 'User whithout token'});
	}

	return authFactory;

})

.factory('AuthToken', function($window){
	var authToken = {};

	authToken.getToken = function(){
		return $window.localStorage.getItem('token');
	}

	authToken.setToken = function(token){
		if(token) {
			$window.localStorage.setItem('token', token);
		}
		else {
			$window.localStorage.removeItem('token');
	
		}
	}

	return authToken;
}])

.factory('AuthInterceptor', function($q, $location, AuthToken){
	
	var interceptor = {};

	interceptor.request = function(config) {

		var token = AuthToken.getToken();

		if(token) { 
		
			config.headers['x-access-token'] = token;
		
		}

		return config;

	}

	interceptor.responseError = function(res) {

		if(res.status == 403) {
			$location.path('/login');
		}

		return $q.reject(res);
	}
	return  interceptor;
}])
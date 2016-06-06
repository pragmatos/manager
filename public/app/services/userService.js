angular.module('userService', [])

.factory('UserService', function($http){
	var factory = {};

	factory.create = function(user){
		return $http.post('/api/users/signup', user);
	}

	factory.all = function(user){

	}

	return factory;
});
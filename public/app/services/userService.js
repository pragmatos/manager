angular.module('userService', [])

.factory('UserService', function($http){
	var factory = {};

	factory.create = function(user){
		return $http.post('/api/users/signup', user);
	}

	factory.all = function(user){
		return $http.get('/api/users');
	}

	facory.delete = function(id){
		return $http.delete('/api/users/'+id);
	}

	factory.update = function(id){
		return $http.put('/api/users/'+id);
	}

	return factory;
});
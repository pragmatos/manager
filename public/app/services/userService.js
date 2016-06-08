angular.module('userService', [])

.factory('UserService', function($http){
	var factory = {};


	factory.create = function(user){
		return $http.post('/api/users/signup', user);
	}

	factory.all = function(user){
		return $http.get('/api/users');
			
	}

	factory.delete = function(id){
		return $http.delete('/api/users/'+id);
	}

	factory.update = function(data){
		return $http.put('/api/users/'+data._id,data);
	}

	return factory;
});
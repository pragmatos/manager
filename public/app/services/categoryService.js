angular.module('categoryService', [])

.factory('CategoryService', function($http){
	var cat = {};

	cat.items = [];

	cat.getAll = function(){
		$http.get('/api/category')
			 .success(function(res){
			 	cat.items = res;
			 });
	}
	cat.post = function(data){
		return $http.post('/api/category', data);
			 
	}
	cat.getOne = function(id){
		return $http.get('/api/category/'+id);
	}
	cat.deleteOne = function(id){
		$http.delete('/api/category/'+id)
			.success(function(res){
				cat.getAll();
			});
	}
	cat.updateOne = function(id, data){
		return $http.put('/api/category/'+id, data);
	}
	cat.getCategoryById = function(id){
		for(var i in cat.items) {
			if(cat.items[i]._id == id){
				return cat.items[i].name;
			}
		}
	}
	return cat;
});
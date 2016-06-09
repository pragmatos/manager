angular.module('playlistService', [])

.factory('PlaylistService', function($http){

	var o = {};

	o.items = [];

	o.getAll = function(){
		$http.get('/api/playlist')
			.success(function(res){
				console.log(res);
				o.items = res;
			});
	}
	o.add = function(id) {
		return $http.post('/api/playlist', {id: id});

	}
	
	o.delete = function(id){
		return $http.delete('/api/playlist/'+id);
	}
	return o;

});

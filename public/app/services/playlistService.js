angular.module('playlistService', [])

.factory('PlaylistService', function($http){

	var o = {};

	o.items = [];

	o.getAll = function(){
		$http.get('/api/playlist')
			.success(function(res){
				o.items = res;
			});
	}
	o.add = function(id) {
		return $http.post('/api/playlist', {id: id});

	}
	
	o.delete = function(id){
		return $http.delete('/api/playlist/'+id);
	}

	o.createFile = function(){
		var data = [];
		for(var i in o.items) {
			data.push({
				name: o.items[i].channel.name,
				href: o.items[i].channel.href
			});
			
		}

		return $http.post('/api/playlist/file', data);
	}
	return o;

});

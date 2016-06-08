angular.module('channelsService', [])

.factory('ChannelsService', function($http){
	var chan = {};
	chan.items = [];

	chan.all = function() {
		return $http.get('/api/channels')
			.success(function(res){
				chan.items = res;
			});
	}
	chan.post = function(data) {
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		return $http.post('/api/channels', fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		});
	}
	chan.delete = function(id) {
		return $http.delete('/api/channels/'+ id);
	}

	return chan;
});

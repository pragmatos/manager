angular.module('channelsService', [])

.factory('ChannelsService', function($http){
	var factory = {};

	factory.all = function() {
		return $http.get('/api/channels');
	}
});
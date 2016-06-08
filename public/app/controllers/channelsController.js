angular.module('channelsController',['channelsService'])

.controller('ChannelsController', function($scope,ChannelsService){

	var vm = this;
	$scope.showEdit = false;
	$scope.channels = ChannelsService;
	$scope.item = {};

	ChannelsService.all();
	$scope.post = function(){
		ChannelsService.post($scope.channel)
			.success(function(res){
				console.log(res);
			});
	}

})

angular.module('userChannelsController',['channelsService'])

.controller('UserChannelsController', function($scope, ChannelsService){

	$scope.channels = [];

	ChannelsService.getUsersChannels()
		.success(function(res){
			$scope.channels = res;
		});
	$scope.delete = function(id,index){
		ChannelsService.deleteUserChannel(id)
			.success(function(res){
				$scope.channels.splice(index,1);
			});
	}
});

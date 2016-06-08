angular.module('channelsController',['channelsService'])

.controller('ChannelsController', function($scope,ChannelsService, CategoryService){

	var vm = this;
	$scope.showEdit = false;
	$scope.channels = ChannelsService;
	$scope.categories = CategoryService;
	$scope.channel = {};

	ChannelsService.all();
	$scope.post = function(){
		ChannelsService.post($scope.channel)
			.success(function(res){
				console.log($scope.channel);
				$scope.showEdit = false;
				ChannelsService.all();
			});
	}
	$scope.delete = function(id){
		ChannelsService.delete(id)
			.success(function(res){
				ChannelsService.all();
			});
	}

})

angular.module('channelsController',['channelsService'])

.controller('ChannelsController', function($scope,ChannelsService, CategoryService, PlaylistService){

	var vm = this;
	$scope.showEdit = false;
	$scope.isNew = true;
	$scope.channels = ChannelsService;
	$scope.categories = CategoryService;
	$scope.channel = {};
	$scope.type = '';
	$scope.categories.type = '';
	
	ChannelsService.all();
	CategoryService.getAll();
	$scope.post = function(){
		ChannelsService.post($scope.channel)
			.success(function(res){
				$scope.showEdit = false;
				ChannelsService.all();
				$scope.channel = {};
			});
	}
	$scope.delete = function(id){
		ChannelsService.delete(id)
			.success(function(res){
				ChannelsService.all();
			});
	}
	$scope.edit = function(data){
		$scope.channel = data;
		$scope.isNew = false;
		$scope.showEdit = true;
	}
	$scope.update = function(id){
		ChannelsService.put($scope.channel)
			.success(function(res){
				$scope.showEdit = false;
				$scope.channel = {};
				ChannelsService.all();
			});
	}
	$scope.addToPlaylist = function(channel) {
		PlaylistService.add(channel._id)
			.success(function(res){
				channel.added = true;
				PlaylistService.getAll();	
		});
		console.log(channel);
	}

})

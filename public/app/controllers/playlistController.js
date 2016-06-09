angular.module('playlistController',[])

.controller('PlaylistController', function($scope, PlaylistService){

	$scope.items = PlaylistService;
	$scope.isShow = [];
	$scope.isCreated = false;

	$scope.showDetails = function(id){
		$scope.isShow[id] = $scope.isShow[id]== true? false: true;
	}
	
	$scope.delete = function(id){
		PlaylistService.delete(id)
			.success(function(res){
				PlaylistService.getAll();
			});
	}
	$scope.generateLink = function(){
		PlaylistService.createFile()
			.success(function(res){
				$scope.isCreated = true;
				$scope.url = res;
			});
	}
	$scope.download = function() {
		
	}
});
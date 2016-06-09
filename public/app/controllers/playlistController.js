angular.module('playlistController',[])

.controller('PlaylistController', function($scope, PlaylistService){

	$scope.items = PlaylistService;
	$scope.isShow = [];
	$scope.showDetails = function(id){
		$scope.isShow[id] = $scope.isShow[id]== true? false: true;
	}
	
	$scope.delete = function(id){
		PlaylistService.delete(id)
			.success(function(res){
				PlaylistService.getAll();
				console.log(res);
			});
	}
});
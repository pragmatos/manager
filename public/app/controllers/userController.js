angular.module('userController',['userService'])

.controller('UserController', function($scope, UserService){

	$scope.users = [];

	function update(){
		UserService.all()
			.success(function(res){
				$scope.users = res;
			});
	}
	update();
	$scope.edit = function(data){
		$scope.user = data;
		$scope.showEdit = true;
	}
	$scope.update = function(id){
		UserService.update($scope.user)
			.success(function(res){
				$scope.showEdit = false;
				Service.all();
			});
	}
	$scope.delete = function(id){
		UserService.delete(id)
			.success(function(res){
				update();
			});
	}
})

.controller('UserCreateController', function(UserService, $location, $window){

	var vm = this;

	vm.signupUser = function(){
		vm.msg = "";
		if(vm.userData.pass == vm.confirm.pass) {
			UserService.create(vm.userData)
				.then(function(res){
					vm.msg = res.data.message;
					if(res.data.success) {
						$window.localStorage.setItem('token', res.data.token);
						$location.path('/');
					} else {
						vm.msg = res.data.message;
					}
				});
		} else {
			vm.userData.pass = "";
			vm.confirm.pass = "";
			vm.msg = "Паролі не схожі";
		}
	}
	
})
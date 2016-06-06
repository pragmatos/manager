angular.module('userController',['userService'])

.controller('UserController', function(UserService){

	var vm = this;
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
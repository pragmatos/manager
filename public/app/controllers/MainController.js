angular.module('Manager', [])

.controller('MainController', function($rootScope, $location, Auth){
	
	var vm = this;

	vm.loggedIn = Auth.isLogged();

	$rootScope.$on('$routeChangeStart', function(){

		vm.loggedIn = Auth.isLoggedIn();

	});

	vm.login = function(){
		
		vm.processing = true;
		Auth.login(vm.loginData.login, vm.loginData.pass)
			.success(function(data){
				if(data.success) {
					$location.path('/');
				} else {
					vm.error = data.message;
				}
			});
	}

	vm.logout = function() {
		Auth.logout();
		$location.path('/');
	}
}]);
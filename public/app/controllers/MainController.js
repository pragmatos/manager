angular.module('mainController',[])

.controller('MainController', function($rootScope, $location, Auth, $http, Loader){
	
	var vm = this;
	
	vm.l = Loader;
	vm.user = {};
	vm.loggedIn = Auth.isLoggedIn();
	

	$rootScope.$on('$routeChangeStart', function(){

		vm.loggedIn = Auth.isLoggedIn();

		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
				vm.isAdmin = data.data.admin;
			});

	});

	vm.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	vm.login = function(){
		Auth.login(vm.loginData.login, vm.loginData.pass)
			.success(function(data){
				
				Auth.getUser()
					.then(function(data){
						console.log(data);
						vm.user = data.data;
						vm.isAdmin = data.data.admin;
					});

				if(data.success) {
					$location.path('/');
				} else {
					vm.error = data.message;
				}
			});
	}

	vm.logout = function() {
		Auth.logout();
		vm.loggedIn = Auth.isLoggedIn();
		vm.isAdmin = false;
		$location.path('/home');
	}
});
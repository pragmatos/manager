angular.module('categoryController',['categoryService'])

.controller('CategoryController', function(CategoryService, ngDialog){

	var vm = this;
	vm.item = null;
	vm.categories = CategoryService;

	vm.categories.getAll();

	vm.add = function(){
		CategoryService.post(vm.item)
			.success(function(res){
			 	CategoryService.items.push(res);
			 	vm.item = null;
			 });
	}
	vm.edit = function(id) {
		CategoryService.getOne(id)
			.success(function(res){
				vm.item = res;
			});
	}
	vm.delete = function(id){
		CategoryService.deleteOne(id);
	}
	vm.update = function(id){
		CategoryService.updateOne(id, vm.item)
			.success(function(res){
				CategoryService.getAll();
				vm.item = null;
			});
	}
	
})
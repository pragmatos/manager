define([
  'app',
  'models/categoryModel'
], function(app,Category) {
   var CategoryCollection = Backbone.Collection.extend({
    model : Category,
    url   : "api/category"
 

    
    
  });

  return CategoryCollection;
});


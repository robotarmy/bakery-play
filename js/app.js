App = Ember.Application.create();

App.Router.map(function() {
  this.resource('bakery', {path:'/bakery'}, function() {
    this.resource('goodies',{path:':bakery_name'})
  })
});

App.BakeryRoute = Ember.Route.extend({
  model: function() {
    return {name:'Yummy Land'};
  },
  afterModel: function() {
    this.transitionTo('goodies',this.model().name);
  }
});

App.GoodiesRoute = Ember.Route.extend({
  model: function() {
    return [{name:'Eclair'},{name:'Donut'},{name:'Oatmeal Cookie'}];
  }
});

App.BakeryController = Ember.ObjectController.extend({
})

App.GoodiesController = Ember.ArrayController.extend({
  needs: "bakery",
  searchFilter: function() {
    Ember.Logger.debug("someone is looking for " + this.get("controllers.bakery.searchText"))
  }.observes("controllers.bakery.searchText")
})

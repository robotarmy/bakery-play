App = Ember.Application.create();

App.Router.map(function() {
  this.resource('bakery', {path:'/'}, function() {
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
  sortProperties:["name"],
  sortAscending: true,

  needs: "bakery",
  searchResults: Ember.computed.defaultTo("arrangedContent"),


  filterItem: function (model) {
    searchInput = this.get('controllers.bakery.searchText')
    regexp = new RegExp(searchInput, "i");
    if(!searchInput || (searchInput && (0 == searchInput.length))) {
      return true
    } else if (-1 != model.name.search(regexp)) {
      return true
    } else {
      return false
    }
  },

  searchFilter: function() {
    searchInput = this.get('controllers.bakery.searchText')
    Ember.Logger.debug("someone is looking for " + this.get("controllers.bakery.searchText"))
    this.set('searchResults',this.get('arrangedContent').filter(this.filterItem.bind(this)))
  }.observes("controllers.bakery.searchText"),
})

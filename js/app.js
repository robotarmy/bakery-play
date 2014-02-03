HackHashSoEmberHistoryLocationDoesntClearIt = window.location.hash


$( document ).ajaxError(function( event, request, settings ) {
  console.log("Error requesting page s(" + JSON.stringify(settings) + ") r("+JSON.stringify(request)+")" );
});


App = Ember.Application.create();

App.oauth = Ember.OAuth2.create({providerId: 'google'});

App.Router.reopen({
  location: 'history'
});


App.GooglePerson = Ember.Object.extend({
  isAuthenticated : function() {
    var access_token =  App.oauth.getAccessToken()
    if (access_token && !App.oauth.accessTokenIsExpired()) {
      return true
    }
  },

});

App.Router.map(function() {

  this.resource('bakery', {path:'/bakery'}, function() {
    this.resource('goodies',{path:':bakery_name'})
  })
  this.route('oauth_callback', {path:'/oauth-callback'})
});


App.OauthCallbackRoute = Ember.Route.extend({
  model: function() {
    return {}
  },
  beforeModel:function(){
    var hash = HackHashSoEmberHistoryLocationDoesntClearIt
    App.oauth.onRedirect(hash);
    this.transitionTo("bakery")
  }
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


App.ApplicationController = Ember.Controller.extend({

  actions: {
    authorize: function() {
      App.oauth.authorize();
    }
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
    var searchInput = this.get('controllers.bakery.searchText')
    var regexp = new RegExp(searchInput, "i");
    if(!searchInput || (searchInput && (0 == searchInput.length))) {
      return true
    } else if (-1 != model.name.search(regexp)) {
      return true
    } else {
      return false
    }
  },

  searchFilter: function() {
    var searchInput = this.get('controllers.bakery.searchText')
    Ember.Logger.debug("someone is looking for " + this.get("controllers.bakery.searchText"))
    this.set('searchResults',this.get('arrangedContent').filter(this.filterItem.bind(this)))
  }.observes("controllers.bakery.searchText"),
})

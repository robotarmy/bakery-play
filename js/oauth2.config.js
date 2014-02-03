  Ember.OAuth2.config = {
    google: {
      clientId: "334812751686-aa8lsb2ljoobderpk5plfokdads4qkbm.apps.googleusercontent.com",
      authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: 'https://bakery-play.herokuapp.com/oauth-callback',
      scope: 'openid profile email'
    } 
  } 

  Ember.OAuth2.reopen({ onSuccess: function(data) { console.log("onsuccess  "+ JSON.stringify(data)) } });
  Ember.OAuth2.reopen({ onError: function(data) {console.log("-----  onerror    "+  JSON.stringify(data)) } });



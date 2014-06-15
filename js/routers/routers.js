define([
  'jquery',
  'lodash',
  'backbone',
  'views/viewMain'
], function($, _, Backbone, ViewMain){

        var Router = Backbone.Router.extend({
            initialize: function() {
                // Tells Backbone to start watching for hashchange events
                //Backbone.history.start();

                Backbone.history.bind('url-changed', function(path,e){
                    console.log("url change", path, e)
                });

            },
            // All of your Backbone Routes (add more)
            routes: {
                // When there is no hash on the url, the home method is called
                "": "index",
                "otherRoute":"otherRoute",
                "otherRoute/:query":"otherRoute",
                "otherRoute/:query/parameter:id":"otherRoute",
                //"otherRoute/:query/(parameter:id)":"otherRoute", //optional parameter
                "otherRoute/*random":"otherRoute",
                //"*default":"index",
                "*random":"index" //undefined routes must be in the end line of routes object!!!!!!
            },
            index: function(hash) {
                 console.log('mainRoute');
                 if(!this.view){
                    this.view = new ViewMain();
                 }else{
                      console.log('back on main');
                 }

                if(hash){
                     console.log('strange hash: ' + hash);
                }
            },
            otherRoute:function (id, param){
                if(id&&!param)
                    console.log('otherRoute' + id); //#otherRoute/123
                if(!id)
                     console.log('otherRoute'); //#otherRoute
                if(param)
                    console.log('otherRoute' + id+'-'+param); //#otherRoute/123/parameter4
                Backbone.history.navigate("",{trigger:true});
                //Backbone.history.navigate('otherRoute/2', {trigger: true});
                //Backbone.history.navigate('view/19', {trigger: true, replace: true});
            }
        });
        // Returns the DesktopRouter class

        return Router;
});

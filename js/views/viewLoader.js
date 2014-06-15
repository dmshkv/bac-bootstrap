define([
    'jquery',
    'lodash',
    'backbone',
	'jst',
	'events'
], function($, _, Backbone, JST, GlobalEvents){
    //all code here
    var ViewLoader=Backbone.View.extend({
        className:'overlay',
        initialize:function (){
            _.bindAll(this,'render');
            //this.preloadImage();
            this.listenTo(GlobalEvents,'loader_show', this.render);
            this.listenTo(GlobalEvents,'loader_hide', this.unrender);
        },
        render:function (){
            this.$el.html(JST.loader()).appendTo('body');
        },
        unrender:function (){ 
            this.$el.remove();
        },
		//may be used to preload an image during initialization
        preloadImage:function (){
            try{
                $('<img />').attr('href','/WaveGUI/prilozhenie/img/ajax_preload.gif');
            }catch(e){
                 console.log(e);
            }
        }
    });
    return ViewLoader;
});

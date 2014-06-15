define([
    'jquery'
    ,'lodash'
    ,'backbone'
    ,'routers/routers'
    //,'L10n'
    //,'lapter'
    //,'mockAjax','mockUrl' //turn on ajax redirect
], function($, _, Backbone, Router/*, L10n, Lapter*/){
	//set some important globals
	//window.globalData = window.globalData || {};
	//window.L10n=L10n; //localization will be a global property
    //window.Lapter=Lapter;
	window.App={};
    var initialize = function(){
        window.App = new Router();
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
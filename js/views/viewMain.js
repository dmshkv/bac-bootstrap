define([
	'jqueryui',
	'lodash',
	'backbone',
	'jst',
	'models/modelMain',
	'views/viewLoader',
	'text!templates/welcome.html',
	'events',
	'datepicker_localization', //this module doesn't create own global - only extends jquery ui
	'bootstrap.dropdown'
], function ($, _, Backbone, JST, ModelMain, ViewLoader, text_template, GlobalEvents) {
	var ViewMain = Backbone.View.extend({
		el               : '.body',
		events           : {

		},
		className        : 'main-layout',
		initialize       : function () {
			this.model = new ModelMain();
			window.globalData = this.model.toJSON();
			this.setListeners();
			this.render();
		},
		setListeners     : function () {
			this.listenTo(this.model, 'change', this.rewriteGlobalData);
			this.listenTo(GlobalEvents, 'widget:change', this.updateModel);
		},
		rewriteGlobalData: function () {
			window.globalData = this.model.toJSON();
		},
		updateModel      : function (data) {
			this.model.set(data);
		},
		initComponents   : function () {
			this.viewLoader = new ViewLoader();
		},
		render           : function () {
			this.$el.html(JST.mainLayout()); //JST use example
			this.$el.append(_.template(text_template)); //text.js use example
			this.$el.find('.datepicker').datepicker(); //jquery ui example
			this.initComponents();
			this.$el.find('.dropdown-toggle').dropdown();
		}
	});
	return ViewMain;
});
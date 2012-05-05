app.views.Base = Backbone.View.extend({
	initialize: function(options) {
		this.setupRenderEvents();
	},
	
	presenter: function() {
		return this.defaultPresenter();
	},
	
	defaultPresenter: function() {
		var modelJson = this.model && this.model.attributes ? _.clone(this.model.attributes) : {};
		return modelJson;
	},
	
	setupRenderEvents: function() {
		
	},
	
	render: function() {
		this.renderTemplate();
		this.renderSubviews();
		return this;
	},
	
	renderTemplate : function(){
    var presenter = _.isFunction(this.presenter) ? this.presenter() : this.presenter
    this.template = JST[this.templateName]
    if(!this.template) {
      console.log(this.templateName ? ("no template for " + this.templateName) : "no templateName specified")
    }

    this.$el
      .html(this.template(presenter))
      .attr("data-template", _.last(this.templateName.split("/")));
    this.postRenderTemplate();
  },

  postRenderTemplate : $.noop, //hella callbax yo

  renderSubviews : function(){
    var self = this;
    _.each(this.subviews, function(property, selector){
      var view = _.isFunction(self[property]) ? self[property]() : self[property]
      if(view) {
        self.$(selector).html(view.render().el)
        view.delegateEvents();
      }
    })
  }

});
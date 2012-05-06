app.views.SquaresShow = app.views.Base.extend({
	tagName: 'li',
	className : "span4 square",
	templateName : "squares/square",
	
	subviews: {

	},
	
	events : {
		'click .read_more': 'readMore',
		'click .remove': 'destroyModel'
	},
	
	initialize: function(options) {
		this.model.on('destroy', this.replaceWithNew, this);
	},
	
	postRenderTemplate: function() {
		this.resizeBackground();
		this.$el.attr('data-id', this.model.get('id'));
		this.$('a[rel=facebox]').facebox();
	},
	
	resizeBackground: function() {
		if(this.model.get('isMediaOnly')) {
			var $div = this.$('div:first');
			
			$div
				.css('background-image', "url("+this.model.get('url')+")")
				.addClass('image');
			var width = $div.width();
			var height = $div.height();
		}
	},
	
	destroyModel: function(e) {
		e.preventDefault();
		this.model.destroy();
	},
	
	replaceWithNew: function() {
		var model = new app.models.Square();
		this.model.collection.add(model);
		var view = new app.views.SquaresNew({model: model});
    if(view) {
			var $html = $("<li class='span4 square new-square'></li>");
			$html.html(view.render().el);
      this.$el.replaceWith($html);
      view.delegateEvents();
    }
	},
	
	readMore: function(e) {
		// var width = this.$el.outerWidth();
		// var height = this.$el.outerHeight();
		// this.$el.effect('scale', {to: {width: width*2+16, height: height*2}}, 500);
		e.preventDefault();
		var self = this;
		this.model.fetch({
			success: function(model, response) {
				self.loadFacebox();
			}
		});
		// this.model.on('change', this.loadFacebox, this);
		
	},
	
	loadFacebox: function() {
		this.$('.full').html(JST['squares/full'](this.model.toJSON()));
		
		jQuery.facebox({ div: '#full-'+this.model.get('id') });
	}
});
app.views.SquaresShow = app.views.Base.extend({
	tagName: 'li',
	className : "span4 square",
	templateName : "squares/square",
	
	subviews: {

	},
	
	events : {
		'click .read_more': 'readMore'
	},
	
	initialize: function(options) {

	},
	
	postRenderTemplate: function() {
		this.resizeBackground();
		this.$el.attr('data-id', this.model.get('id'));
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
	
	readMore: function(e) {
		// var width = this.$el.outerWidth();
		// var height = this.$el.outerHeight();
		// this.$el.effect('scale', {to: {width: width*2+16, height: height*2}}, 500);
		e.preventDefault();
	}
});
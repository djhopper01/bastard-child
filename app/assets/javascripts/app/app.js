//= require_tree ./helpers
//= require_self
//= require ./router
//= require ./models
//= require ./views
//= require_tree ./models
//= require_tree ./pages
//= require_tree ./collections
//= require_tree ./views

window.app = {
	models: {},
	collections: {},
	routers: {},
	views: {},
	pages: {},
	helpers: {},
	
	apiBaseUrl: function() {
		return "http://api.mifavoritos.com";
	},
	
	init: function() {
		app.router = new app.Router();
		
		Backbone.history.start({pushState: true});
		
		$('a[rel=remote]').click(function(e) {
			e.preventDefault();
			var link = $(this);
			app.router.navigate(link.attr('href').substring(1) ,true);
		});
		
	}
}

$(document).ready(function() {
	$(document).bind('beforeReveal.facebox', function() {
	    var height = $(window).height() - 100;
			console.log(height);
	    $('#facebox .content').css('height', height + 'px');
	    $('#facebox').css('top', ($(window).scrollTop() + 10) + 'px');
	});
	
	app.init();
});
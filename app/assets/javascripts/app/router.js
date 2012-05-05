app.Router = Backbone.Router.extend({
	routes: {
		"grids": "grids",
		"grids/:id": "showGrid"
	},
	
	grids: function() {
		this.renderPage(new app.pages.GridsIndex());
	},
	
	showGrid: function(gridId) {
		this.renderPage(new app.pages.GridsShow({id: gridId}));
	},
	
	renderPage: function(page) {
		app.page = page;
		$('#main-container').html(app.page.render().el);
	}
});
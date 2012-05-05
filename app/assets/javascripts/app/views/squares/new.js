app.views.SquaresNew = app.views.Base.extend({
	className : "",
	templateName : "squares/new",
	
	subviews: {
		'.square_form': 'form'
	},
	
	events : {
		'submit': 'save'
	},
	
	initialize: function(options) {
		this.form = new app.views.SquaresForm();
		this.model = new app.models.Square();
	},
	
	postRenderTemplate: function() {
		var self = this;
		this.$('.new_square').popover({
			popover: self.$('.square_form')
		});
	},
	
	save: function(e) {
		e.preventDefault();
		var model = new app.models.Square(new FormAttributes(this.$('form')).attributes());
		model.save();
	}
});
app.views.SquaresNew = app.views.Base.extend({
	id: 'uploader',
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
		
		this.model.on('sync', this.hideLoader, this);
		this.model.on('sync', this.replaceWithSquare, this);
	},
	
	postRenderTemplate: function() {
		this.makePopover();
		// this.makeUploader();
	},
	
	logit: function(e) {
		console.log(e);
	},
	
	makeUploader: function() {
		var self = this;
		var uploader = new plupload.Uploader({
			runtimes : 'gears, html5, flash, silverlight',
			url : '/upload',
			flash_swf_url : '/plupload.flash.swf',
			silverlight_xap_url: '/plupload.silverlight.xap',
			filters : [
				{title: "Image files", extensions: "jpg,gif,png"}
			],
			drop_element: 'new_square',
			container: 'uploader',
			autostart: true,
			max_file_size: '500MB'
		});
		
		uploader.bind('Init', function(up, params) {
			console.log("Runtime: " + params.runtime);
		});
		
		uploader.init();
		
		uploader.bind('FilesAdded', function(uploader, files) {
			uploader.refresh();
			uploader.start();
		});
		
		this.$el.bind('dragover', function(e) {
			$(this).parent().addClass('hover');
			e.preventDefault();
		})
		.bind('dragleave drop', function(e) {
			$(this).parent().removeClass('hover');
			e.preventDefault();
		})
		.bind('drop', function(e) {
			console.log(e);
			e.preventDefault();
		});
	},
	
	makePopover: function() {
		var self = this;
		this.$('.new_square').popover({
			popover: self.$('.square_form')
		});
	},
	
	save: function(e) {
		this.$('.new_square').data('popover').hide();
		e.preventDefault();
		this.model.set(new FormAttributes(this.$('form')).attributes());
		this.showLoader();
		this.model.save();
	},
	
	replaceWithSquare: function(model) {
		var view = new app.views.SquaresShow({model: model});
		this.$el.parent().replaceWith(view.render().el);
		view.delegateEvents();
	},
	
	showLoader: function() {
		this.$('a.new_square').css('background-image', 'url(/images/loader.gif)');
	},
	
	hideLoader: function() {
		this.$('a.new_square').css('background-image', 'url(/images/68x68/117.png)');
	}
});
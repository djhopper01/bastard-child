app.pages.GridsShow = app.views.Base.extend({
	className : "row",
	templateName : "grids/show",
	
	subviews: {

	},
	
	events : {
		
	},
	
	initialize: function(options) {
		
		this.model = new app.models.Grid({id: options.id});
		this.model.on('change', this.updateSquares, this);
		this.model.fetch();
		
		this.squares = new app.collections.Squares(this.model.get('squares'));
		
		this.squares.on('sync', this.updateGrid, this);
		this.squares.on('reset', this.render, this);

	},
	
	renderSubviews: function() {
		// this.$('ul.squares').empty();
		this.squaresShow();
		this.squaresNew();
	},
	
	updateSquares: function(model) {
		this.squares.reset(model.get('squares'));
	},
	
	squaresShow: function() {
		var self = this;
		this.squares.each(function(square) {
			var view = new app.views.SquaresShow({model: self.squares.get(square.id)});
      if(view) {
				var index = square.get('position').y * 3 + square.get('position').x;
				self.$('ul.squares li:eq('+index+')').after(view.render().el);
        view.delegateEvents();
      }
		});
	},
	
	squaresNew: function() {
		var self = this;
		this.$('.new-square').each(function(index, element) {
			var model = new app.models.Square();
			self.squares.add(model);
			var view = new app.views.SquaresNew({model: model});
      if(view) {
        $(element).html(view.render().el)
        view.delegateEvents();
      }
		});
	},
	
	postRenderTemplate: function() {
		this.makeSortable();
	},
	
	makeSortable: function() {
		var self = this;
		var $sortable = this.$('ul');
		$sortable.sortable({
			update: function(event, ui) {
				self.updateGrid();
			}
		});
		$sortable.disableSelection();
	},
	
	updateGrid: function() {
		var self = this;
		this.$('.square').each(function(index, element) {
			var x = index % 3;
			var y = parseInt(index / 3);
			var id = parseInt($(element).data('id'));
			if(id) {
				self.squares.get(id).set({position: {x: x, y:y}});
			}
		});
		
		var attributes = this.squares.map(function(square) {
			if(square.get('id')) {
				return {id: square.get('id'), position: square.get('position')};
			}
		});
		
		$.ajax({
			url: app.apiBaseUrl() + "/grids/"+this.model.get('id'),
			type: "POST",
			data: JSON.stringify(_.compact(attributes)),
			success: function(response) {

			}
		});
	}
});
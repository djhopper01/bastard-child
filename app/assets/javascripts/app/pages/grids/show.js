app.pages.GridsShow = app.views.Base.extend({
	className : "row",
	templateName : "grids/show",
	
	subviews: {

	},
	
	events : {
		
	},
	
	initialize: function(options) {
		var grid = {
			squares: [
				{title: "Arraignment held for 9/11 suspects", summary: "This is a super great summary."},
				{title: "Buffett on his cancer: 'A non-event'", summary: "This is a super great summary."},
				{title: "Soldier's death on Skype investigated", summary: "This is a super great summary."},
				{title: "Don't miss tonight's super moon", summary: "This is a super great summary."},
				{title: "Cinco de Mayo as American as July 4", summary: "This is a super great summary."},
				{title: "Panetta to GIs: Misconduct aids enemy", summary: "This is a super great summary."},
				{title: "Olmert: U.S. right wing derailed peace", summary: "This is a super great summary."}
			]
		}
		
		this.model = new app.models.Grid(grid);

	},
	
	renderSubviews: function() {
		this.squaresNew();
	},
	
	squaresNew: function() {
		this.$('.new-square').each(function(index, element) {
			var view = new app.views.SquaresNew({});
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
		var $sortable = this.$('ul');
		$sortable.sortable({

		});
		$sortable.disableSelection();
	}
});
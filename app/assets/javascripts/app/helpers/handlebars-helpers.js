Handlebars.registerHelper('showNewSquare', function(squares) {
	var html = "";
	for(var i=0; i < 9 - squares.length; i++) {
		html += "<li class='span4 square new-square'></li>";
	}
	return html;
});
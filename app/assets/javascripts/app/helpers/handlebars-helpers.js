Handlebars.registerHelper('showNewSquare', function(squares) {
	var html = "";
	var count = 0;
	if(squares) {
		count = squares.length;
	}
	for(var i=0; i < 9; i++) {
		html += "<li class='span4 square new-square'></li>";
	}
	return html;
});


Handlebars.registerHelper('mediaHelper', function(url) {

});

Handlebars.registerHelper('renderText', function(text) {
	return text.replace(/\n+/g, "<br/><br/>");
});
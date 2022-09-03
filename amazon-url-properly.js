javascript:(function(){
	s = "https://amazon.co.jp/dp/" + location.href.match(/(?<=\/)([A-Z0-9]{10,})(?=\/|\?|$)/)[0];
	location.href = s;
	navigator.clipboard.writeText(s);
})();

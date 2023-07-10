javascript:(function(){
	location.href = "https://amazon.co.jp/dp/" + location.href.match(/(?<=\/)([A-Z0-9]{10,})(?=\/|\?|$)/)[0];
})();

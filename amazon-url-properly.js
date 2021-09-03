javascript:(function(){
	s=location.href;
	s="https://amazon.co.jp/dp/"+s.match(/\/([A-Z]+[0-9]+[A-Z0-9]*|[0-9]+)\//)[0].replace(/\//g, "");
	location.href=s;
	navigator.clipboard.writeText(s);
})();

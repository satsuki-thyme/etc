javascript:(function(){
	s=location.href;
	s="https://amazon.co.jp/dp/"+s.match(/\/([A-Z0-9]{10,})\//)[0].replace(/\//g, "");
	location.href=s;
	navigator.clipboard.writeText(s);
})();

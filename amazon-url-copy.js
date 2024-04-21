javascript:(function(){
	navigator.permissions.query({name: "clipboard-write"}).then(res => {if(res.state === "granted" || res.state === "prompt") {navigator.clipboard.writeText("https://amazon.co.jp/dp/" + location.href.match(/(?<=\/)([A-Z0-9]{10,})(?=\/|\?|$)/)[0])}});
})();

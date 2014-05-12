window.GameUtils = {
	ajax: function(url, handler){

		var req = new XMLHttpRequest();

		req.onreadystatechange = function(){
			if(req.readyState == 4 && req.status == 200 && handler){
				handler(JSON.parse(req.responseText));
			}
		}

		req.open("GET", url, true);
		req.send(null);

	}
}

window.requestAnimFrame = (function(){
  	return  window.requestAnimationFrame       || 
          	window.webkitRequestAnimationFrame || 
     	 	function( callback, element){
            	window.setTimeout(callback, 1000 / 60);
          	};
})();

window.cancelAnimFrame = (function(){
  	return  window.cancelAnimationFrame       || 
          	window.webkitCancelAnimationFrame || 
     	 	window.clearTimeout
})();
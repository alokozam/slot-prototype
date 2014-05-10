(function(){

	var GameUtils = {
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

	window.GameUtils = GameUtils;

})()
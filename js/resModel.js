(function(){

	ResModel = function(){
		this.resources = [];
		this.ammount = 0;
	};

	ResModel.prototype.set = function(data){
		if(Array.isArray(data)){//there may be other validation
			this.resources = data;

			this.ammount = data.length;
		} else {
			throw('Invalid resources list');
		}
	}

	ResModel.prototype.get = function(){
		return JSON.parse( JSON.stringify(this.resources) );
	}




	window.ResModel = ResModel;
})()
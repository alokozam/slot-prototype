(function(){

	/*
	This component is responsible for resources loading, and UI components enabling/disabling
	*/
	var GameUIManager = function(params){

		this.imagesList = [{title: 'first', url: 'img/SYM1.png'},{title: 'second', url: 'img/SYM3.png'}];

		//this.resources = []; //empty array for resources

		this.preloadImages(this.imagesList);



	}

	GameUIManager.prototype.preloadImages = function(imagesList){


		imagesList.forEach(function(imgItem){
			var newImageItem = new Image();
			//TODO onload handling
			newImageItem.src = imgItem.url;
		});
	}

	/*GameUIManager.prototype.saveImage = function(imageItem, title){
		this.resources.push({
			title: title,
			item: imageItem
		});
	}*/

	new GameUIManager({});

})(window)
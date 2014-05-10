(function(){

	/*
	This component is responsible for resources loading, and UI components enabling/disabling
	@constructor

	@param {function} onUIReady - handler that will execute after all resources be loaded
	*/
	var GameUIManager = function(params){

		this.loadingVisibleClass = 'visible';
		this.resourcesUrl = 'data/resources.json';

		this.canvasBuffer = document.getElementById('spin-buffer');

		//this.resources = []; //empty array for resources

		//this.preloadImages(this.imagesList);

		this.prepareGame();

	}

	GameUIManager.prototype.prepareGame = function(){
		this.setLoadingIndication(true);
		this.getResourcesList();
	}

	GameUIManager.prototype.bufferizeResources = function(resourcesList){

		var resourcesAmount = resourcesList.length,
			resourcesCounter = 0, //used for primitive deferred pattern realization

			checkState = function(){
				if (resourcesAmount == resourcesCounter){ //all resources loaded
					this.setLoadingIndication(false);
					//TODO call handler, after loading

					var canv2 = document.getElementById('slot-spin'),
						ctx2 = canv2.getContext('2d'),
						y = 300;

					ctx2.drawImage(this.canvasBuffer, 0, y);
					ctx2.drawImage(this.canvasBuffer, 0, y-155*6);
				}
			}; 

		resourcesList.forEach( (function(imgItem, itemIndex){
			var newImageItem = new Image();

			newImageItem.onload = (function(){
				resourcesCounter+=1;
				this.addToBuffer(newImageItem, itemIndex);
				checkState.call(this);
			}).bind(this);

			newImageItem.src = imgItem.url;
		}).bind(this) );
	}

	GameUIManager.prototype.addToBuffer = function(imgData, index){
		var canvas = this.canvasBuffer,
			ctx = canvas.getContext('2d');

			ctx.drawImage(imgData, 0, 155*index);
	}

	/*
	Gets list of resources to preload
	*/
	GameUIManager.prototype.getResourcesList = function(){
		GameUtils.ajax('data/resources.json', (function(response){
			this.bufferizeResources(response);
		}).bind(this) );
	}

	/*
	@param {boolean} state
	*/
	GameUIManager.prototype.setLoadingIndication = function(state){
		var loadingOverlay = document.getElementById('loading-overlay'),
			isLoadingOvarlayVisible = !(loadingOverlay.className.indexOf(this.loadingVisibleClass)<0);

			if(state && !isLoadingOvarlayVisible){
				loadingOverlay.className+=" "+this.loadingVisibleClass;
			} else {
				loadingOverlay.className = loadingOverlay.className.replace(this.loadingVisibleClass,'');
			}

	}

	new GameUIManager({});

})(window)
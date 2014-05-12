(function(){

	/*
	This component is responsible for resources loading
	@constructor
	*/
	var ResManager = function(params){
		if(!params){
			throw('GameUIManager reqire mandatory params')
		}

		this.loadingVisibleClass = 'visible';
		this.resourcesUrl = 'data/resources.json';

		this.canvasBuffer = document.getElementById('spin-buffer');

		this.resources = params.resources; //save link on res models
		this.UIReadyPool = [];

		this.prepareGame();
	}

	ResManager.prototype.prepareGame = function(){
		this.setLoadingIndication(true);
		this.getResourcesList();
	}

	ResManager.prototype.bufferizeResources = function(resourcesList){

		var resourcesAmount = resourcesList.length,
			resourcesCounter = 0, //used for primitive deferred pattern realization

			checkState = function(){
				if (resourcesAmount == resourcesCounter){ //all resources loaded
					this.setLoadingIndication(false);

					this.UIReadyPool.forEach(function(handlerItem){
						handlerItem();
					})

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

	ResManager.prototype.addToBuffer = function(imgData, index){
		var canvas = this.canvasBuffer,
			ctx = canvas.getContext('2d');

			ctx.drawImage(imgData, 0, 155*index);
	}

	/*
	Gets list of resources to preload
	*/
	ResManager.prototype.getResourcesList = function(){
		GameUtils.ajax('data/resources.json', (function(response){
			this.resources.set(response) ;
			this.bufferizeResources(response);
		}).bind(this) );
	}

	/*
	@param {boolean} state
	*/
	ResManager.prototype.setLoadingIndication = function(state){
		var loadingOverlay = document.getElementById('loading-overlay'),
			isLoadingOvarlayVisible = !(loadingOverlay.className.indexOf(this.loadingVisibleClass)<0);

			if(state && !isLoadingOvarlayVisible){
				loadingOverlay.className+=" "+this.loadingVisibleClass;
			} else {
				loadingOverlay.className = loadingOverlay.className.replace(this.loadingVisibleClass,'');
			}

	}

	ResManager.prototype.onUIReady = function(handler){
		this.UIReadyPool.push(handler);
	}

	window.ResManager = ResManager;

})(window)
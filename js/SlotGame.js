(function(){


	var SlotGame = function(params){
		if(!params){
			throw ('Slot game require params')
		}

		this.resources = params.resources;
		this.startPosition = 0; //Initial spin state
		this.itemHeight = 155;
		this.animSpeed = 3000;
		this.spinHeight = this.itemHeight*this.resources.ammount;
		this.canvas = document.getElementById('slot-spin');
		this.winPositionItem = null;
		this.playersBet = null;
		this.resultMessageWrap = document.querySelector('#game-result-wrap');
		this.playButton = document.querySelector(params.startButtonSelector);
		this.messageContainer = document.querySelector(params.messageContainerSelector);

		this.betOptionsElement = document.querySelector(params.betOptionsSelector);

		this.drawSpinFrame(this.startPosition);

		this.playButton.addEventListener('click', (function(){
			this.startGame();
		}).bind(this) );


		this.resources.get().forEach( (function(item){
			var option = document.createElement('option');

			option.value = item.title;
			option.innerHTML = item.title;

			this.betOptionsElement.appendChild(option)

		}).bind(this) );
	}


	SlotGame.prototype.startGame = function(){
		var startDate = new Date(),
			reqId,
			offsetY;

		this.savePlayersBet();
		this.toggleControls();

		this.messageContainer.innerHTML = '';

		(function draw(){
		    var currDate = new Date(),
		    	currentDuration = currDate - startDate;

		    offsetY = (this.animSpeed *currentDuration/1000)%this.spinHeight;//S = V*t
		    this.drawSpinFrame(offsetY);
		    reqId = requestAnimFrame(draw.bind(this), this.canvas);
		}).call(this);

		setTimeout( (function(){
			cancelAnimFrame(reqId);
			var finalOffsetY = this.getWinPosition().index*this.itemHeight;
			this.stopSpinner( offsetY, finalOffsetY);
		}).bind(this), 3000)
	}

	SlotGame.prototype.getWinPosition = function(){

		var itemsArr = this.resources.get(),
			index =  Math.floor(Math.random() * (itemsArr.length));

		this.winPositionItem = {
	    	index: index,
	    	item: itemsArr[ index ]
	    };

		return this.winPositionItem;
	}

	SlotGame.prototype.savePlayersBet = function () {
		this.playersBet = this.betOptionsElement.value;
	}

	SlotGame.prototype.showResult = function(){
		var winItem = this.winPositionItem.item.title,
			winMessage = 'You win!',
			looseMessage = 'You lose!';

		if (winItem == this.playersBet) {
			this.messageContainer.innerHTML = winMessage; 
		} else {
			this.messageContainer.innerHTML = looseMessage; 
		}
	}

	SlotGame.prototype.drawSpinFrame = function(offsetY){
		var ctx = this.canvas.getContext('2d');

		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

		//TODO remove link on gameUI
		ctx.drawImage(gameUI.canvasBuffer, 0, offsetY);
		ctx.drawImage(gameUI.canvasBuffer, 0, offsetY-this.spinHeight);
	}

	SlotGame.prototype.stopSpinner = function(startOffsetY, finalOffsetY){
		var startDate = new Date();

		(function drawFinalAnimation(){
			var currDate = new Date(),
				currDuration = currDate - startDate,
				currPosition = (startOffsetY+this.animSpeed *currDuration/1000 )%this.spinHeight,

				currOffsetY = currPosition-finalOffsetY < this.spinHeight/10 ? finalOffsetY : currPosition;// 10 is magic number

			this.drawSpinFrame(currOffsetY);

			var stopSpinReqId = requestAnimFrame(drawFinalAnimation.bind(this), this.canvas);

			if( currOffsetY ==  finalOffsetY){
				cancelAnimFrame(stopSpinReqId);
				this.showResult();
				this.toggleControls();
			}
		}).call(this)
	}

	SlotGame.prototype.toggleControls = function(){
		this.betOptionsElement.disabled = !this.betOptionsElement.disabled;
		this.playButton.disabled = !this.playButton.disabled;
	}

	window.SlotGame = SlotGame;

})(window);
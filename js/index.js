var resources = new ResModel(),
	gameUI = new ResManager({
		resources: resources
	});

gameUI.onUIReady(function(){
	var slotGame = new SlotGame({
		resources: resources,
		startButtonSelector: "#play-game",
		betOptionsSelector: "#bet-dropdown",
		messageContainerSelector: "#game-result-wrap"
	});
});
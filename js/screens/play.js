game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.money = 0;

		this.bg = new game.BG();
        me.game.add(this.bg, -1000);
		this.HUD = new game.HUD.Container();
		me.game.add(this.HUD, 100000);
        me.game.add(new game.Grass(100, 100), 0);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});

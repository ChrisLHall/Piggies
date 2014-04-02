game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.money = 0;

        me.audio.play("bgmusic", true);

		this.bg = new game.BG();
        me.game.world.addChild(this.bg);
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
        me.game.world.addChild(new game.Grass(100, 100));
        me.game.world.addChild(new game.Piggy(100, 40));
        me.game.world.addChild(new game.GrassButton(228, 32));
        me.game.world.addChild(new game.PigButton(228, 64));
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeAll();
        me.audio.stop("bgmusic");
	}
});

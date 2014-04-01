
/** 
 * a basic HUD item to display score
 */
game.BG = me.AnimationSheet.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(x, y, me.loader.getImage("bg"), 256, 144);

        this.addAnimation("bg", [0]);
        this.setCurrentAnimation("bg");
	},

	/**
	 * update function
	 */
	update : function () {
		return false;
	},
});

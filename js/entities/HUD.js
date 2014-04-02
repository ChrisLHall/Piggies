

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();

        this.z = 10000;
		
		this.alwaysUpdate = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.PoopIcon(224, 8));
        this.text = new game.FancyText.String(232, 8, 3);
        this.text.setString("0");
        this.text.z = 10000;
        this.addChild(this.text);
	},

    update: function() {
        this.parent();
        this.text.setString(game.data.money.toString());
        return true;
    },
});


/**
 * Poop icon for  the score screen.
 */
game.HUD.PoopIcon = me.AnimationSheet.extend({
    init: function(x, y) {
        this.z = 10000;
        this.parent(x, y, me.loader.getImage("poop"), 8, 8);

        this.floating = true;

        this.addAnimation("0", [0]);
        this.setCurrentAnimation("0");
    },
});

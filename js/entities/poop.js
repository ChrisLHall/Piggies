/**
 * Poop object for money.
 */
game.Poop = me.ObjectEntity.extend({
    init: function(x, y) {
        var settings = {};
        settings.image = me.loader.getImage("poop");
        settings.spritewidth = 8;
        settings.spriteheight = 8;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;

        this.renderable.addAnimation("0", [0]);
        this.renderable.setCurrentAnimation("0");

        me.input.registerPointerEvent("mousedown", this.collisionBox,
            this.clicked.bind(this));
    },

    clicked: function() {
        game.data.money++;
        me.game.remove(this);
    },
});
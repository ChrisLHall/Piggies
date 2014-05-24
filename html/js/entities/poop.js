/**
 * Poop object for money.
 */
game.Poop = me.ObjectEntity.extend({
    init: function(x, y) {
        this.z = -5;
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

        this.removed = false;

        me.input.registerPointerEvent("mousedown", this.collisionBox,
            this.clicked.bind(this));
    },

    clicked: function() {
        if (!this.removed) {
            this.removed = true;
            game.data.money++;
            me.audio.play("getpoop");
            me.game.world.removeChild(this);
        }
    },
});
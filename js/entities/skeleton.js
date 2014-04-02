/**
 * Dead and gone piggy.
 */
game.Skeleton = me.ObjectEntity.extend({
    init: function(x, y) {
        this.z = -15;
        var settings = {};
        settings.image = me.loader.getImage("skeleton");
        settings.spritewidth = 16;
        settings.spriteheight = 16;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;

        this.renderable.addAnimation("0", [0]);
        this.renderable.setCurrentAnimation("0");

    },
});
/**
 * Grass object that the piggies eat.
 */
game.Grass = me.ObjectEntity.extend({
    init: function(x, y) {
        this.z = -10;
        this.isGrass = true;

        var settings = {};
        settings.image = me.loader.getImage("grass");
        settings.spritewidth = 16;
        settings.spriteheight = 16;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;
        this.collisionBox.adjustSize(4, 8, 8, 8);

        this.renderable.addAnimation("0", [0]);
        this.renderable.addAnimation("1", [1]);
        this.renderable.addAnimation("2", [2]);
        this.renderable.setCurrentAnimation("0");

        this.growState = 0;
        this.growTimer = 0;
    },

    update: function() {
        if (this.growState < 2) {
            this.growTimer++;
            if (this.growTimer > 240 + 120 * this.growState) {
                this.growTimer = 0;
                this.growState++;
                this.renderable.setCurrentAnimation(this.growState.toString());
            }
        }
        return true;
    },
});
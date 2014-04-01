/**
 * Piggy object.
 */
game.Piggy = me.ObjectEntity.extend({
    init: function(x, y) {
        var settings = {};
        settings.image = me.loader.getImage("piggies");
        settings.spritewidth = 16;
        settings.spriteheight = 16;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;

        this.renderable.addAnimation("0", [0]);
        this.renderable.addAnimation("1", [1]);
        this.renderable.addAnimation("2", [2]);
        this.renderable.addAnimation("3", [3]);
        this.renderable.addAnimation("4", [4]);
        this.renderable.setCurrentAnimation("0");

        this.growState = 0;
        this.poopLeft = 2;
        this.poopTimer = 300 + Math.floor(Math.random() * 120);
        // Air timer gets set to 20. Jump peaks at ~4 pixels.
        // Polynomial for jumping: y = -(t * (t - 20)) * 0.01
        this.airTimer = -1;
        this.nextMoveTimer = 30 + Math.floor(Math.random() * 60);
        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;

        this.setMaxVelocity(2, 2);
    },

//had to run! see you in cory at 5! so little work accomplished...-weina

    update: function() {
        if (this.airTimer > 0) {
            this.airTimer--;
            var deltaY = (this.airTimer * (this.airTimer - 20)) * 0.02;
            this.pos.set(Math.floor(this.startX + (20 - this.airTimer)
                * (this.targetX - this.startX) / 20), Math.floor(this.startY +
                (20 - this.airTimer) * (this.targetY - this.startY) / 20)
                + deltaY);
        } else if (this.airTimer == 0) {
            this.airTimer = -1;
            this.startX = this.targetX;
            this.startY = this.targetY;
        }

        if (this.poopTimer > 0) {
            this.poopTimer--;
        } else if (this.poopTimer == 0) {
            this.poopTimer = -1;
            this.poopLeft--;
            me.game.add(new game.Poop(this.pos.x + 4, this.pos.y + 8), -5);
            if (this.poopLeft > 0) {
                this.poopTimer = 300 + Math.floor(Math.random() * 120);
            }
        }
        if (this.nextMoveTimer > 0) {
            this.nextMoveTimer--;
        } else {
            this.nextMoveTimer = 60 + Math.floor(Math.random() * 60);
            this.airTimer = 20;
            if (this.poopLeft == 0) {

            } else {
                this.targetX = this.startX - 30 + Math.floor(Math.random() * 60);
                this.targetY = this.startY - 30 + Math.floor(Math.random() * 60);
            }
            this.targetX = Math.max(Math.min(this.targetX, game.data.XMAX),
                    game.data.XMIN);
            this.targetY = Math.max(Math.min(this.targetY, game.data.YMAX),
                    game.data.YMIN);
        }

        return true;
    },
});
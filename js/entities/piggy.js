/**
 * Piggy object.
 */
game.Piggy = me.ObjectEntity.extend({
    init: function(x, y) {
        this.z = 0;
        this.isPig = true;

        var settings = {};
        settings.image = me.loader.getImage("piggies");
        settings.spritewidth = 16;
        settings.spriteheight = 16;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;

        // Left facing pigs
        this.renderable.addAnimation("0", [0]);
        this.renderable.addAnimation("1", [1]);
        this.renderable.addAnimation("2", [2]);
        this.renderable.addAnimation("3", [3]);
        this.renderable.addAnimation("4", [4]);
        // Right facing pigs
        this.renderable.addAnimation("5", [5]);
        this.renderable.addAnimation("6", [6]);
        this.renderable.addAnimation("7", [7]);
        this.renderable.addAnimation("8", [8]);
        this.renderable.addAnimation("9", [9]);
        this.renderable.setCurrentAnimation("0");

        this.facingLeft = true;

        this.growState = 0;
        this.eatsToGrow = 2;
        this.poopLeft = 2;
        this.poopTimer = 120 + Math.floor(Math.random() * 60);
        // Air timer gets set to 20. Jump peaks at ~4 pixels.
        // Polynomial for jumping: y = -(t * (t - 20)) * 0.01
        this.airTimer = -1;
        this.nextMoveTimer = 30 + Math.floor(Math.random() * 60);
        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;

        this.removed = false;

        this.setMaxVelocity(2, 2);
    },

//had to run! see you in cory at 5! so little work accomplished...-weina

    update: function() {
        if (this.removed) return false;

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
            me.game.world.addChild(new game.Poop(this.pos.x + 4, this.pos.y + 8));
            if (this.poopLeft > 0) {
                this.poopTimer = 120 + Math.floor(Math.random() * 60);
            }
        }
        if (this.nextMoveTimer > 0) {
            this.nextMoveTimer--;
        } else {
            this.nextMoveTimer = 40 + Math.floor(Math.random() * 40);
            this.airTimer = 20;
            var foundTarget = false;
            if (this.growState == 4) {
                foundTarget = this.targetPig();
                if (!foundTarget && !this.removed) {
                    this.removed = true;
                    me.game.world.removeChild(this);
                    me.game.world.addChild(new game.Piggy(this.pos.x,
                        this.pos.y));
                    return true;
                }
            } else if (this.poopLeft == 0) {
                foundTarget = this.targetGrass();
            }
            if (!foundTarget) {
                this.targetX = this.startX - 20 + Math.floor(Math.random() * 40);
                this.targetY = this.startY - 20 + Math.floor(Math.random() * 40);
            }
            this.targetX = Math.max(Math.min(this.targetX, game.data.XMAX),
                    game.data.XMIN);
            this.targetY = Math.max(Math.min(this.targetY, game.data.YMAX),
                    game.data.YMIN);

            this.facingLeft = (this.targetX < this.startX);
            this.changeFrame();
            return true;
        }

        // Collide the grass, or pigs if in eating mode
        for (var i = 0; i < me.game.world.children.length; i++) {
            var m = me.game.world.getChildAt(i);
            if (m == this) continue;
            if (m.isGrass && m.growState == 2) {
                if (this.collisionBox && m.collisionBox
                        && this.collisionBox.overlaps(m.collisionBox)) {
                    me.game.world.removeChild(m);
                    this.eatGrass();
                }
            } else if (m.isPig && !m.removed && this.growState == 4) {
                if (this.collisionBox && m.collisionBox
                        && this.collisionBox.overlaps(m.collisionBox)) {
                    m.removed = true;
                    me.game.world.removeChild(m);
                    me.game.world.addChild(new game.Skeleton(m.pos.x,
                        m.pos.y));
                }
            }
        }

        return true;
    },

    changeFrame: function() {
        var frame = this.growState;
        if (!this.facingLeft) {
            frame += 5;
        }
        this.renderable.setCurrentAnimation(frame.toString());
    },

    targetGrass: function() {
        var foundTarget = false;
        var closestDist = -1;
        for (var i = 0; i < me.game.world.children.length; i++) {
            var m = me.game.world.getChildAt(i);
            if (m == this) continue;
            if (m.isGrass && m.growState == 2) {
                if (!foundTarget || Math.abs(m.pos.x - this.pos.x)
                    + Math.abs(m.pos.y - this.pos.y) < closestDist) {
                    this.targetX = m.pos.x;
                    this.targetY = m.pos.y;
                    foundTarget = true;
                    closestDist = Math.abs(m.pos.x - this.pos.x)
                        + Math.abs(m.pos.y - this.pos.y);
                }
            }
        }
        this.targetX = Math.max(Math.min(this.targetX, this.startX + 20),
            this.startX - 20);
        this.targetY = Math.max(Math.min(this.targetY, this.startY + 20),
            this.startY - 20);
        return foundTarget;
    },

    targetPig: function() {
        var foundTarget = false;
        var closestDist = -1;
        for (var i = 0; i < me.game.world.children.length; i++) {
            var m = me.game.world.getChildAt(i);
            if (m == this) continue;
            if (m.isPig && m.growState != 4) {
                if (!foundTarget || Math.abs(m.pos.x - this.pos.x)
                    + Math.abs(m.pos.y - this.pos.y) < closestDist) {
                    this.targetX = m.pos.x;
                    this.targetY = m.pos.y;
                    foundTarget = true;
                    closestDist = Math.abs(m.pos.x - this.pos.x)
                        + Math.abs(m.pos.y - this.pos.y);
                }
            }
        }

        return foundTarget;
    },

    eatGrass: function() {
        if (this.poopTimer <= 0) {
            this.poopTimer = 120 + Math.floor(Math.random() * 60);
        }
        this.poopLeft += 2;
        this.eatsToGrow--;
        if (this.eatsToGrow == 0 && this.growState < 4) {
            this.growState++;
            this.changeFrame();
            this.eatsToGrow = 2 + this.growState * 2;
        }
    },
});
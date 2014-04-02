/**
 * Buy grass button.
 */
game.GrassButton = me.ObjectEntity.extend({
    init: function(x, y) {
        this.z = 10000;
        var settings = {};
        settings.image = me.loader.getImage("buttons");
        settings.spritewidth = 24;
        settings.spriteheight = 24;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;

        this.renderable.addAnimation("on", [0]);
        this.renderable.addAnimation("off", [2]);
        this.renderable.setCurrentAnimation("on");

        me.input.registerPointerEvent("mousedown", this.collisionBox,
            this.clicked.bind(this));
    },

    update: function() {
        if (game.data.money >= 1) {
            this.renderable.setCurrentAnimation("on");
        } else {
            this.renderable.setCurrentAnimation("off");
        }
        return true;
    },

    clicked: function() {
        //TODO REMOVE
        game.data.money += 5;
        if (game.data.money >= 1) {
            game.data.money -= 1;
            var xCoord = game.data.XMIN + Math.floor(Math.random()
                * (game.data.XMAX - game.data.XMIN));
            var yCoord = game.data.YMIN + Math.floor(Math.random()
                * (game.data.YMAX - game.data.YMIN));
            me.game.world.addChild(new game.Grass(xCoord, yCoord));
        }
    },
});

/**
 * Buy piggie button.
 */
game.PigButton = me.ObjectEntity.extend({
    init: function(x, y) {
        this.z = 10000;
        var settings = {};
        settings.image = me.loader.getImage("buttons");
        settings.spritewidth = 24;
        settings.spriteheight = 24;

        this.parent(x, y, settings);

        this.gravity = 0;
        this.alwaysUpdate = true;

        this.collidable = true;

        this.renderable.addAnimation("on", [1]);
        this.renderable.addAnimation("off", [3]);
        this.renderable.setCurrentAnimation("on");

        me.input.registerPointerEvent("mousedown", this.collisionBox,
            this.clicked.bind(this));
    },

    update: function() {
        if (game.data.money >= 5) {
            this.renderable.setCurrentAnimation("on");
        } else {
            this.renderable.setCurrentAnimation("off");
        }
        return true;
    },

    clicked: function() {
        if (game.data.money >= 5) {
            game.data.money -= 5;
            var xCoord = game.data.XMIN + Math.floor(Math.random()
                * (game.data.XMAX - game.data.XMIN));
            var yCoord = game.data.YMIN + Math.floor(Math.random()
                * (game.data.YMAX - game.data.YMIN));
            me.game.world.addChild(new game.Piggy(xCoord, yCoord));
        }
    },
});
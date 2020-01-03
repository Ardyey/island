ig.module(
	'game.entities.enemy_A_gun'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityEnemy_A_gun = ig.Entity.extend({

	// _wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 24, y: 24},
	maxVel: {x: 200, y: 480},

	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/ship_1_canon_r.png', 35, 27 ),

    flip: false, 
	bounceCounter: 0,
	target: {x: 0, y:0},
	player: {x: 0, y:0},
    timeInAir: 0,
    playAnim: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
        this.addAnim( 'idle', 0.1, [0] );
        this.addAnim( 'fire', 0.1, [0, 1, 2, 3, 4, 5], true );
        this.currentAnim.flip.x = !settings.flip;
	},

    reset: function( x, y, settings ) {
		this.parent( x, y, settings );
    },
    
	update: function() {
        this.parent();
        this.currentAnim.flip.x = !this.flip;
        if(this.playAnim){
            this.currentAnim = this.anims.fire;
        }
        else{
            this.currentAnim = this.anims.idle;
        }
	},

    check: function( other ) {}	
    
});

ig.EntityPool.enableFor( EntityEnemy_A_gun );


});

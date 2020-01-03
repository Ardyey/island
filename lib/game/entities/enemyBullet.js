ig.module(
	'game.entities.enemyBullet'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityEnemyBullet = ig.Entity.extend({

	_wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 39, y: 27},
	offset: {x: 6, y: 6},
	maxVel: {x: 200, y: 480},
	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.8, 

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/water_droplet_r.png', 39, 27 ),
	sfxBlast: new ig.Sound( 'media/sounds/blast2.*' ),
	
	bounceCounter: 0,
	target: {x: 0, y:0},
	ship: {x: 0, y:0},
	timeInAir: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = this.maxVel.y;
		this.addAnim( 'fire', 0.1, [0, 1, 2, 3, 4, 5], true );
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = this.maxVel.y;
		this.currentAnim = this.anims.fire.rewind();
	},

	move_toward_coord: function(x, y, timeInAir) {
	    var angleToMouse = Math.atan2(10, 10) * 180 / Math.PI,
            initialVelocity = 300;
        if(angleToMouse >= -0.02){
        	angleToMouse = angleToMouse + -1; // make sure bullet stays on a straight path
        }
	    this.vel.x = this.flip ? -Math.abs(Math.cos(angleToMouse) * initialVelocity) : Math.cos(angleToMouse) * initialVelocity;
        this.vel.y = Math.sin(angleToMouse) * initialVelocity;

	},

	update: function() {
		this.parent();
		this.timeInAir += 1;
		this.currentAnim.flip.x = !this.flip;
		this.move_toward_coord(this.target.x, this.target.y, this.timeInAir);
		if(ig.game.getEntitiesByType( EntityBase )[0].health == 0 ){
			this.kill();
		}
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.kill();
			this.timeInAir = 0;
		}
	},

	check: function( other ) {
		this.sfxBlast.play();
		other.receiveDamage( 1, this );
		this.kill();
		this.timeInAir = 0;
	}	
});

ig.EntityPool.enableFor( EntityEnemyBullet );

});

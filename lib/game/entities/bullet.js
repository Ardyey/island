ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityBullet = ig.Entity.extend({

	_wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 24, y: 24},
	offset: {x: 6, y: 6},
	maxVel: {x: 200, y: 480},
	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.8, 

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/canon_ball.png', 25, 25 ),
	
	bounceCounter: 0,
	target: {x: 0, y:0},
	player: {x: 0, y:0},
	timeInAir: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = ig.input.mouse.y;
		this.addAnim( 'fire', 1, [0, 1, 2, 3, 4, 5], true );
		
	},
	
	reset: function( x, y, settings ) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = ig.input.mouse.y;
		
		// Remember, this a used entity, so we have to reset our bounceCounter
		// as well
		this.bounceCounter = 0;
	},

	move_toward_coord: function(x, y, timeInAir) {
	    var mX = x + ig.game.screen.x,
            mY = y + ig.game.screen.y,
            centerX = this.player.x + this.size.x/2,
            centerY = this.player.y + this.size.y/2,
            angleToMouse = -Math.abs(Math.atan2(mY, mX - centerX)),
            initialVelocity = 300,
            gravity = 15,
            velFromGravity = 0;
        if(angleToMouse >= -0.02){
        	angleToMouse = angleToMouse + -1
        }
        velFromGravity = gravity*(timeInAir);
	    this.vel.x = Math.cos(angleToMouse) * initialVelocity;
        this.vel.y = Math.sin(angleToMouse) * (initialVelocity - velFromGravity);
	},

	update: function() {
		this.parent();
		this.timeInAir += 1;
		this.move_toward_coord(this.target.x, this.target.y, this.timeInAir);
		this.currentAnim.angle += ig.system.tick * 10;
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.kill()
			this.timeInAir = 0;
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 1, this );
		this.kill();
		this.timeInAir = 0;
	}	
});


// If you have an Entity Class that instanced and removed rapidly, such as this 
// Fireball class, it makes sense to enable pooling for it. This will reduce
// strain on the GarbageCollector and make your game a bit more fluid.

// With pooling enabled, instances that are removed from the game world are not 
// completely erased, but rather put in a pool and resurrected when needed.

ig.EntityPool.enableFor( EntityBullet );


});

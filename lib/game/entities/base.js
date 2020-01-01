ig.module(
	'game.entities.base'
)
.requires(
	'impact.entity',
)
.defines(function(){

	EntityBase = ig.Entity.extend({

		_wmScalable: true,
			
		size: {x: 200, y: 260},
		offset: {x: 30, y:0},
		maxVel: {x: 400, y: 800},
		friction: {x: 800, y: 0},
		
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		animSheet: new ig.AnimationSheet( 'media/island_one_line_r.png', 272, 224 ),	
		
		health: 20,

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		accelGround: 1200,
		accelAir: 600,
		jump: 500,	
		maxHealth: 3,

		coins: 0,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'healthy', 1, [0] );
			this.addAnim( 'damagedLight', 1, [1] );
			this.addAnim( 'damagedMedium', 1, [2] );
			this.addAnim( 'damagedHeavy', 1, [3] );
			this.addAnim( 'destroyed', 1, [4] );
			this.currentAnim = this.anims.healthy;
			// Set a reference to the player on the game instance
			ig.game.player = this;
		},
		
		
		update: function() {

			// // Handle user input; move left or right
			// var accel = this.standing ? this.accelGround : this.accelAir;
			// if( ig.input.state('left') ) {
			// 	this.accel.x = -accel;
			// 	this.flip = true;
			// }
			// else if( ig.input.state('right') ) {
			// 	this.accel.x = accel;
			// 	this.flip = false;
			// }
			// else {
			// 	this.accel.x = 0;
			// }

			// // jump
			// if( this.standing && ig.input.pressed('jump') ) {
			// 	this.vel.y = -this.jump;
			// }
		
			// // Stay in the pain animation, until it has looped through.
			// // If not in pain, set the current animation, based on the 
			// // player's speed
			// if( 
			// 	this.currentAnim == this.anims.pain &&
			// 	this.currentAnim.loopCount < 1
			// ) {
			// 	// If we're dead, fade out
			// 	if( this.health <= 0 ) {
			// 		// The pain animation is 0.3 seconds long, so in order to 
			// 		// completely fade out in this time, we have to reduce alpha
			// 		// by 3.3 per second === 1 in 0.3 seconds
			// 		var dec = (1/this.currentAnim.frameTime) * ig.system.tick;
			// 		this.currentAnim.alpha = (this.currentAnim.alpha - dec).limit(0,1);
			// 	}
			// }
			// else if( this.health <= 0 ) {
			// 	// We're actually dead and the death (pain) animation is 
			// 	// finished. Remove ourself from the game world.
			// 	this.kill();
			// }
			// else if( this.vel.y < 0 ) {
			// 	this.currentAnim = this.anims.jump;
			// }
			// else if( this.vel.y > 0 ) {
			// 	if( this.currentAnim != this.anims.fall ) {
			// 		this.currentAnim = this.anims.fall.rewind();
			// 	}
			// }
			// else if( this.vel.x != 0 ) {
			// 	this.currentAnim = this.anims.run;
			// }
			// else {
			// 	this.currentAnim = this.anims.idle;
			// }
			
			// this.currentAnim.flip.x = this.flip;
			
			// Move!
			this.parent();
		},

		kill: function() {
			this.parent();

			// Reload this level
			ig.game.reloadLevel();
		},

		receiveDamage: function( amount, from ) {
			this.health -= amount;
			if( this.health <= 16 && this.health > 12 ) {
				this.currentAnim = this.anims.damagedLight;
			}
			else if(  this.health <= 12 && this.health > 8  ){
				this.currentAnim = this.anims.damagedMedium;
			}
			else if(  this.health <= 8 && this.health > 4  ){
				this.currentAnim = this.anims.damagedHeavy;
			}
			else if(  this.health == 0 ){
				this.currentAnim = this.anims.destroyed;
			}
		}
	});
});
ig.module(
	'game.entities.baseMan'
)
.requires(
	'impact.entity',
	'game.entities.bullet'
)
.defines(function(){

	EntityBaseMan = ig.Entity.extend({
		
	size: {x: 0, y: 0},
	
	maxVel: {x: 400, y: 800},
	friction: {x: 800, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/island_canon.png', 140, 100 ),	
	
	health: 3,

	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 1200,
	accelAir: 600,
	jump: 500,	
	maxHealth: 3,
	target: null,

	coins: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'firing', 0.1, [0, 1, 2, 3, 4, 5], true );
		this.currentAnim = this.anims.idle;
	},
	
	
	update: function() {

		if( ig.input.pressed('leftClick') ) {
			var x = ig.input.mouse.x + ig.game.screen.x,
				y = ig.input.mouse.y + ig.game.screen.y;
			if ( x < 540 && x > 140 && x > 330) {
				x += 150;
			} else if (x > 140 && x < 330) {
				x -= 150;
			}
			var target = {
				x: this.flip ? x-100 : x+100,
				y: y
			}
			if( ig.input.mouse.x <= 330 ) {
				this.pos.x = 150;
				this.flip = true;
			}
			else if( ig.input.mouse.x >= 331 ) {
				this.pos.x = 350;
				this.flip = false;
			}
			var player = {
				x: this.flip ? this.pos.x+50 : this.pos.x+80, 
				y: this.pos.y+40
			}
			ig.game.spawnEntity( EntityBullet, this.flip ? this.pos.x+50 : this.pos.x+80, this.pos.y+40, {flip:this.flip, target:target, player:player} );
			this.currentAnim = this.anims.firing;
			this.currentAnim = this.anims.firing.rewind();

		}
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
		
		this.currentAnim.flip.x = this.flip;
		
		
		// Move!
		this.parent();
	},

	kill: function() {
		this.parent();

		// Reload this level
		ig.game.reloadLevel();
	},

	giveCoins: function( amount ) {
		// Custom function, called from the EntityCoin
		this.coins += amount;
	},

	receiveDamage: function( amount, from ) {
		// if( this.currentAnim == this.anims.pain ) {
		// 	// Already in pain? Do nothing.
		// 	return;
		// }

		// // We don't call the parent implementation here, because it 
		// // would call this.kill() as soon as the health is zero. 
		// // We want to play our death (pain) animation first.
		// this.health -= amount;
		// this.currentAnim = this.anims.pain.rewind();

		// // Knockback
		// this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
		// this.vel.y = -300;
		
	}
	});
});
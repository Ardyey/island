ig.module(
	'game.entities.enemy_A'
)
.requires(
	'impact.entity',
	'game.entities.enemyBullet'
)
.defines(function(){
	
EntityEnemy_A = ig.Entity.extend({

	size: {x: 96, y: 54},
	offset: {x: 4, y:0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 1,
	canFire: false,
	fireRate: 1, //in second(s)
	
	speed: 36,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/ship_1_g.png', 96, 54 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.shootTimer = new ig.Timer(this.fireRate);
		this.addAnim( 'idle', 1, [0] );
		this.currentAnim = this.anims.idle;
	},

	update: function() {
		// Near an edge? return!
		// if( !ig.game.collisionMap.getTile(
		// 		this.pos.x + (this.flip ? +4 : this.size.x -4),
		// 		this.pos.y + this.size.y+1
		// 	)
		// ) {
		// 	this.flip = !this.flip;
			
		// 	// We have to move the offset.x around a bit when going
		// 	// in reverse direction, otherwise the blob's hitbox will
		// 	// be at the tail end.
		// 	this.offset.x = this.flip ? 0 : 24;
		// }
		
		
		this.currentAnim.flip.x = !this.flip;
		this.move_few_distance();
		if(this.canFire){
			if(this.shootTimer.delta() >= 1){
				this.shoot_bullet();
			}
		}
		this.parent();
	},

	shoot_bullet: function(){
		console.log('Beng beng A!');
		var target = {
			x: 320,
			y: 320
		}
		var ship = {
			x: this.pos.x, 
			y: this.pos.y
		}
		ig.game.spawnEntity( EntityEnemyBullet, this.flip ? this.pos.x : this.pos.x+70, this.pos.y, {flip:this.flip, target:target, ship:ship} );
		this.shootTimer.reset();
	},
	
	move_few_distance: function(){
		var x = !this.flip ? 50 : 590;
	 	var distance_x = x - this.pos.x - this.size.x / 2;
	 	if ( Math.floor(distance_x) == 0 ) { 
	 		distance_x = 0;
	 		this.canFire = true;
	 	}
	    this.vel.x = (distance_x > 1 ? 1 : -1) * this.speed * (Math.abs(distance_x) / (Math.abs(distance_x)));
	},
	
	kill: function() {
		this.parent();
		
	},
	
	// handleMovementTrace: function( res ) {
	// 	this.parent( res );
		
	// 	// Collision with a wall? return!
	// 	if( res.collision.x ) {
	// 		this.flip = !this.flip;
	// 		this.offset.x = this.flip ? 0 : 24;
	// 	}
	// },
	
	check: function( other ) {
		other.receiveDamage( 1, this );
	}
});

});
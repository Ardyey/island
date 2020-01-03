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
		sfxShoot: new ig.Sound( 'media/sounds/shoot2.ogg' ),

		flip: false,
		target: null,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'firing', 0.1, [0, 1, 2, 3, 4, 5], true );
			this.currentAnim = this.anims.idle;
		},
		
		
		update: function() {
			if ( ig.game.getEntitiesByType( EntityBase )[0].health == 0 ){
				this.kill();
			}
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
				this.sfxShoot.play();
				ig.game.spawnEntity( EntityBullet, this.flip ? this.pos.x+50 : this.pos.x+80, this.pos.y+40, {flip:this.flip, target:target, player:player} );
				this.currentAnim = this.anims.firing;
				this.currentAnim = this.anims.firing.rewind();
			}
			this.currentAnim.flip.x = this.flip;
			
			this.parent();
		},

		kill: function() {
			this.parent();
		},
	});
});
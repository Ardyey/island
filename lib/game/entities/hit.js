ig.module(
	'game.entities.hit'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityHit = ig.Entity.extend({

	_wmIgnore: true,

	size: {x: 24, y: 24},
	offset: {x: 6, y: 6},
	maxVel: {x: 200, y: 480},
	
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/explosion_r.png', 35, 25 ),

	bounceCounter: 0,
	target: {x: 0, y:0},
	player: {x: 0, y:0},
	timeInAir: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'explode', 0.04, [0, 1, 2, 3, 4, 5], true );
		this.currentAnim = this.anims.explode;
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.currentAnim = this.anims.explode.rewind();
	},

	update: function() {
		this.parent();
		if( this.currentAnim.loopCount > 0 ) {
			this.currentAnim = this.anims.explode.rewind();
			this.kill();
		}
	},


	check: function( other ) {}	
});

ig.EntityPool.enableFor( EntityHit );


});

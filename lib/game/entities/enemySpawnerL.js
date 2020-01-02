/*
This entity calls the triggeredBy( entity, trigger ) method of each of its
targets. #entity# is the entity that triggered this trigger and #trigger# 
is the trigger entity itself.


Keys for Weltmeister:

checks
	Specifies which type of entity can trigger this trigger. A, B or BOTH 
	Default: A

wait
	Time in seconds before this trigger can be triggered again. Set to -1
	to specify "never" - e.g. the trigger can only be triggered once.
	Default: -1
	
target.1, target.2 ... target.n
	Names of the entities whose triggeredBy() method will be called.
*/

ig.module(
	'game.entities.enemySpawnerL'
)
.requires(
	'impact.entity',
	'game.entities.enemy_A',
	'game.entities.enemy_B',
	'game.entities.enemy_C',
)
.defines(function(){

	EntityEnemySpawnerL = ig.Entity.extend({
		size: {x: 32, y: 32},
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		
		target: null,
		direction: null,
		canSummon: true,
		roundTimer: new ig.Timer(2),

		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NEVER,
		
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.base = ig.game.getEntitiesByType( EntityBase )[0];
		},
		
		
		check: function( other ) {},
		
		update: function() {
			if( this.roundTimer.delta() >= 2 ) {
				var rand = Math.floor(Math.random() * 6) + 1;
				if( this.canSummon && (this.base.enemyCount1 != this.base.maxEnemyCount) ) {
					switch (rand) {
						case 1: 
							ig.game.spawnEntity( EntityEnemy_A, this.pos.x-30, this.pos.y+10, {flip:false, health:this.base.wave} );
							break;
						case 2:
							ig.game.spawnEntity( EntityEnemy_B, this.pos.x-50, this.pos.y, {flip:false, health:this.base.wave} );
							break;
						case 3:
							ig.game.spawnEntity( EntityEnemy_C, this.pos.x-50, this.pos.y, {flip:false, health:this.base.wave} );
							break;
						default:
							ig.game.spawnEntity( EntityEnemy_A, this.pos.x-30, this.pos.y+10, {flip:false, health:this.base.wave} );
					}
					this.base.enemyCount1++;
					this.base.enemyCount2++;
					this.canSummon = false;
				}
			}
		}
	});

});
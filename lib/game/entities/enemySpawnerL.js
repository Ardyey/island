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
		teamList: ['germany','sweden','unitedNations'],

		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NEVER,
		
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			var chosenTeam = localStorage.getItem('team');
			this.enemyTeams = this.teamList.filter((team)=> team != chosenTeam);
		},
		
		check: function( other ) {},
		
		update: function() {
			if( this.roundTimer.delta() >= 2 ) {
				var rand = this.enemyTeams[Math.floor(Math.random() * this.enemyTeams.length)];
				this.base = ig.game.getEntitiesByType( EntityBase )[0];
				if( this.canSummon && (this.base.enemyCount1 != this.base.maxEnemyCount) ) {
					switch (rand) {
						case 'germany': 
							ig.game.spawnEntity( EntityEnemy_A, this.pos.x-30, this.pos.y+10, {flip:false, health:this.base.wave} );
							break;
						case 'sweden':
							ig.game.spawnEntity( EntityEnemy_B, this.pos.x-50, this.pos.y, {flip:false, health:this.base.wave} );
							break;
						case 'unitedNations':
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
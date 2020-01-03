ig.module(
	'game.entities.base'
)
.requires(
	'impact.entity',
	'game.levels.title',
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
		
		health: 10,
		enemyCount1: 0,
		enemyCount2: 0,
		enemyCount3: 0,
		maxEnemyCount: 0,
		canSummon: true,
		wave: 0,
		isWaveComplete: false,
		flip: false,
		team: null,

		font: new ig.Font( 'media/fredoka-one.font.png' ),
		gameEnd: new ig.Image( 'media/game_over.png' ),
		germany: new ig.Image( 'media/flag_germany_r.png' ),
		sweden: new ig.Image( 'media/flag_sweden_r.png' ),
		unitedNations: new ig.Image( 'media/flag_united_nations_r.png' ),

		bgm: new ig.Sound( 'media/sounds/beach.ogg' ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// Add the animations
			this.addAnim( 'healthy', 1, [0] );
			this.addAnim( 'damagedLight', 1, [1] );
			this.addAnim( 'damagedMedium', 1, [2] );
			this.addAnim( 'damagedHeavy', 1, [3] );
			this.addAnim( 'destroyed', 1, [4] );
			this.currentAnim = this.anims.healthy;
			this.wave = 1;
			this.maxEnemyCount = 4;
			this.enemyCount3   = 4;
			this.team = localStorage.getItem('team');
			// Set a reference to the player on the game instance
			ig.game.player = this;

			this.bgm.loop = true;
			this.bgm.volume = .5;
			this.bgm.play();
		},
		
		
		update: function() {
			if ( this.health == 0 && ig.input.pressed('leftClick') ) {
				ig.system.setGame( MyTitle );
			}
			if ( this.health != 0 && this.isWaveComplete ) {
				this.isWaveComplete = false;
				this.enemyCount1 = 0;
				this.enemyCount2 = 0;
				this.wave++;
				this.maxEnemyCount++;
				this.enemyCount3 = this.maxEnemyCount;
				var spawnerR = ig.game.getEntitiesByType( EntityEnemySpawnerR )[0];
				var spawnerL = ig.game.getEntitiesByType( EntityEnemySpawnerL )[0];
				spawnerL.canSummon = true;
				spawnerR.canSummon = true;
				spawnerL.roundTimer.reset();
				spawnerR.roundTimer.reset();
			}
			this.parent();
		},

		kill: function() {
			this.parent();
		},

		receiveDamage: function( amount, from ) {
			this.health -= amount;
			if( this.health <= 8 && this.health > 6 ) {
				this.currentAnim = this.anims.damagedLight;
			}
			else if(  this.health <= 6 && this.health > 4  ){
				this.currentAnim = this.anims.damagedMedium;
			}
			else if(  this.health <= 4 && this.health > 2  ){
				this.currentAnim = this.anims.damagedHeavy;
			}
			else if(  this.health == 0 ){
				this.currentAnim = this.anims.destroyed;
			}
		},

		draw: function () {
			this.parent();
			var cx = ig.system.width/2,
				cx2 = ig.system.width/4,
				cy = ig.system.height/2,
				hiScore = localStorage.getItem('score');
			switch (this.team) {
				case 'germany':
					this.germany.draw(cx-40,55);
					break;
				case 'sweden':
					this.sweden.draw(cx-40,55);
					break;
				case 'unitedNations':
					this.unitedNations.draw(cx-40,55);
					break;
			}
			this.font.draw(`Health: ${this.health}`, 10, 10);
			this.font.draw(`Wave: ${this.wave}`, cx2*3, 10);
			this.font.draw(`Enemies: ${this.enemyCount3}/${this.maxEnemyCount}`, 425, 50);
			this.font.draw(`High Score: W-${hiScore ? hiScore : 0 }`, 200, 10);
			if( this.health == 0 ) {
				localStorage.setItem('score', this.wave);
				var startText = 'Game Over!';
				var gameOverText = 'Press Left Mouse Button to Proceed';
				this.gameEnd.draw( 0, 0 );
				this.font.draw( startText, cx, cy, ig.Font.ALIGN.CENTER);
				this.font.draw( gameOverText, cx, 420, ig.Font.ALIGN.CENTER);
			}
		},

	});
});
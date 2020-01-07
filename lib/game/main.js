ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.levels.title',
	'game.levels.stage',
	'game.levels.teamSelect',
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/fredoka-one.font.png' ),

	init: function() {
		ig.input.bind( ig.KEY.MOUSE2, 'rightClick' );
		this.loadLevel( LevelTeamSelect );
	},
	
	loadLevel: function( data ) {
		this.currentLevel = data;
		this.parent( data );
	},

	update: function() {
		this.parent();
	},
	
	draw: function() {
	    this.parent();
	}
});

MyTitle = ig.Game.extend({

	bg: new ig.Image( 'media/title_screen_bg_resized.png' ),
	titleText: new ig.Image( 'media/title_edited.png' ),

	font: new ig.Font( 'media/fredoka-one.font.png' ),

	init: function() {
		ig.input.bind( ig.KEY.MOUSE1, 'leftClick' );
	},

	update: function() {
		if( ig.input.pressed('leftClick')  ) {
			ig.system.setGame( MyGame );
			return;
		}
		
		this.parent();
	},

	draw: function() {
		this.parent();

		var cx = ig.system.width/2;
		this.bg.draw( cx - this.bg.width/2, 0 );
		this.titleText.draw( cx - this.titleText.width/2, 10 );

		var startText = 'Press Left Mouse Button to Play!';
		
		this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);
	}
});

ig.main( '#canvas', MyTitle, 60, 640, 480, 1 );

});

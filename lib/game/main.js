ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.levels.title',
	'game.levels.stage',
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/fredoka-one.font.png' ),
	// background: new ig.Image( 'media/game_bg_resized.png' ),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.MOUSE2, 'rightClick' );
		this.loadLevel( LevelStage );
	},

	loadLevel: function( data ) {
		// Remember the currently loaded level, so we can reload when
		// the player dies.
		this.currentLevel = data;

		// Call the parent implemenation; this creates the background
		// maps and entities.
		this.parent( data );
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// this.background.draw( 0, 0 );
    
	 //    for( var i = 0; i < this.entities.length; i++ ) {
	 //        this.entities[i].draw();
	 //    }

	    this.parent();
	}
});

MyTitle = ig.Game.extend({
	clearColor: "#d0f4f7",
	gravity: 800,

	// The title image
	title: new ig.Image( 'media/title_screen_bg_resized.png' ),
	titleText: new ig.Image( 'media/title_edited.png' ),

	// Load a font
	font: new ig.Font( 'media/fredoka-one.font.png' ),

	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.MOUSE1, 'leftClick' );

		// We want the font's chars to slightly touch each other,
		// so set the letter spacing to -2px.
		this.font.letterSpacing = -2;
	},

	update: function() {
		// Check for buttons; start the game if pressed
		if( ig.input.pressed('leftClick')  ) {
			ig.system.setGame( MyGame );
			return;
		}
		
		
		this.parent();
	},

	draw: function() {
		this.parent();

		var cx = ig.system.width/2;
		this.title.draw( cx - this.title.width/2, 0 );
		this.titleText.draw( cx - this.titleText.width/2, 10 );

		
		var startText = 'Press Left Mouse Button to Play!';
		
		this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);
	}
});

// Start the Game with 60fps, a resolution of 640x480, scaled
// up by a factor of 2
ig.main( '#canvas', MyTitle, 60, 640, 480, 1 );

});

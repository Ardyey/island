ig.module(
	'game.entities.teamSelect'
)
.requires(
	'impact.entity',
	'impact.game',
)
.defines(function(){

    StartGame = ig.Game.extend({
	
        font: new ig.Font( 'media/fredoka-one.font.png' ),
        
        init: function() {
            ig.input.bind( ig.KEY.MOUSE2, 'rightClick' );
            this.loadLevel( LevelStage );
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

	EntityTeamSelect = ig.Entity.extend({
		size: {x: 32, y: 32},
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		
		team: null,

		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
        
        font: new ig.Font( 'media/fredoka-one.font.png' ),
		
		init: function( x, y, settings ) {
            this.parent( x, y, settings );
		},
		
        check: function( other ) {},
        
        update: function() {
            if (ig.input.pressed('leftClick') && this.inFocus()) {
                localStorage.setItem('team',this.team);
                ig.system.setGame( StartGame );
            }
        },
        
        draw: function(){
            this.parent();
            var cx = ig.system.width/2;
            var text = 'Please Choose Your Nation';
            this.font.draw( text, cx, 60, ig.Font.ALIGN.CENTER);
        },

        inFocus: function() {
            return (
               (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
               ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
               (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
               ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
            );
         }
	});
});
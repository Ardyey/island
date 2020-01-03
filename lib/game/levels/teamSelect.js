ig.module( 'game.levels.teamSelect' )
.requires( 'impact.image','game.entities.teamSelect' )
.defines(function(){
LevelTeamSelect=/*JSON[*/{
	"entities": [
		{
			"type": "EntityTeamSelect",
			"x": 40,
			"y": 208,
			"settings": {
				"size": {
					"x": 148,
					"y": 96
				},
				"team": "germany"
			}
		},
		{
			"type": "EntityTeamSelect",
			"x": 252,
			"y": 208,
			"settings": {
				"size": {
					"x": 144,
					"y": 100
				},
				"team": "sweden"
			}
		},
		{
			"type": "EntityTeamSelect",
			"x": 452,
			"y": 208,
			"settings": {
				"size": {
					"x": 148,
					"y": 100
				},
				"team": "unitedNations"
			}
		}
	],
	"layer": [
		{
			"name": "background",
			"width": 4,
			"height": 3,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/choose_nation.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 160,
			"foreground": false,
			"data": [
				[1,2,3,4],
				[5,6,7,8],
				[9,10,11,12]
			]
		}
	]
}/*]JSON*/;
LevelTeamSelectResources=[new ig.Image('media/choose_nation.png')];
});
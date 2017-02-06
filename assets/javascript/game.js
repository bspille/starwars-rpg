//vars and functions go here
game = {
	field: $("#mapArea"),

	zones: ["selection", "enemy", "combat", "graveyard"],

	characters: ["char_1", "char_2", "char_3", "char_4"],

	charaImage: [],

	buttons: ["start", "attack"],

	player: [],

	enemy: [],

	HP: [],

	atk: [],

	cntAtk: [],
	
	load: 	function() {
				var newBtn = $("<button>" + this.buttons[0] + "</button>");
				newBtn.attr("id", "startBtn");
				this.field.append(newBtn);
				$("#startBtn").on("click", function() {
					game.start();
				});
			},

	start: 	function() {
				game.field.empty();
				var newDiv = $("<div>");
				newDiv.attr("id", game.zones[0]);
			
				for (var i = 0; i < game.characters.length; i++) {
					var newAvatar = $("<button>");
					var newChara = $("<img>");
					newChara.attr("class", "chara");
					newChara.attr("alt", game.characters[i]);
					newChara.attr("src", "asset/images/" + game.charaImage[i]);
					newAvatar.append(newChara);
					newAvatar.attr("class", "selBtn");
					newAvatar.attr("name", game.characters[i]);
					newDiv.append(newAvatar);
				};
				game.field.append(newDiv);
				$(".selBtn").on("click", function() {
					game.player	= ($(this).attr("name"));
					game.setparty();
				});
			},

	setparty: 	function () {
					var n = game.characters.indexOf(game.player);
					game.enemy = game.characters
					game.enemy.splice(n,1);
					game.genmap();
				},

	genmap: function() {
				game.field.empty();
				for (var i = 0; i < game.zones.length; i++) {
					var newDiv = $("<div>");
					newDiv.attr("id", game.zones[i]);
					newDiv.attr("class", "quadrant");
					game.field.append(newDiv);
				}

	}

	// remaining characters are set as enemies and moved to zone
	// player chooses the order to fight one at a time
	// enemies are move to a defender area for combat and grave yard when killed
	// HP displayed on bottom of the picture
	// attacks reduce points enemies auto counter
	// win condition defeat all or lose
	// each player attack increases attack by base atk counters base only
	// HP atk and cntatk sets must differ for each character
	// players must be able to win or lose and selection must not depend on the strongest character
}

// event functions go here
$(document).ready(function() {

	game.load();
});
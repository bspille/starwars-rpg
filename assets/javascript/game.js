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

	cntrAtk: [],
	
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
					var newBtn = $("<button>");
					var newImg = $("<img>");
					newImg.attr("class", "chara");
					newImg.attr("alt", game.characters[i]);
					newImg.attr("src", "asset/images/" + game.charaImage[i]);
					newBtn.append(newImg);
					newBtn.attr("class", "selBtn");
					newBtn.attr("name", game.characters[i]);
					newDiv.append(newBtn);
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
				};
				game.fieldplyr();
			},

	fieldplyr: 	function() {
					var newDiv = $("<div>");
					var newImg = $("<img>");
					newImg.attr("alt", game.player);
					newDiv.append(newImg);
					newDiv.addClass("avatar");
					newDiv.attr("id", game.player);
					newDiv.attr("atk", "");
					newDiv.attr("cntrAtk", "");
					newDiv.attr("HP", "");
					$("#selection").append(newDiv);
					game.fieldenemy();									
				},

	fieldenemy: function() {
					for (i = 0; i < game.enemy.length; i++) {
						var newBtn = $("<button>");
						var newImg = $("<img>");
						newImg.attr("alt", game.enemy[i]);
						newBtn.append(newImg);
						newBtn.addClass("avatar");
						newBtn.attr("id", game.enemy[i]);
						newBtn.attr("atk", "");
						newBtn.attr("cntrAtk", "");
						newBtn.attr("HP", "");
						$("#enemy").append(newBtn);
					}
				}


	// link image and random attributes
	// display hp
	// random placement of atk cntatk and hp
	// danger indicator
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
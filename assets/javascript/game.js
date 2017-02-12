//vars and functions go here
game = {
	field: $("#mapArea"),

	locked: false,

	zones: ["selection", "combat", "enemy", "graveyard"],

	characters: ["char_1", "char_2", "char_3", "char_4"],
	enemy: [],

	charaImage: ["image_1.jpg", "image_2.jpg", "image_3.jpg", "image_4.jpg"],

	buttons: ["start", "attack"],

	player: [],
	baseAtk: [],

	HP: ["110", "115", "120", "125"],
	hStat: [],

	atk: ["8", "9", "11", "12"],
	aStat: [],

	cntrAtk: ["10", "13", "14", "15"],
	cStat: [],
// sets the stage to begining values can be used to reload the game without reloading the page
	load: 	function() {
				// reset values
				game.enemy = [];
				game.cStat = [];
				game.aStat = [];
				game.hStat = [];
				game.player = [];
				game.baseAtk = [];
				game.locked = false;

				// generates the start button and generates clone values
				var newBtn = $("<button>" + game.buttons[0] + "</button>");
				newBtn.attr("id", "startBtn");
				game.field.append(newBtn);

				var newDiv = $("<div>");
				newDiv.addClass("intro");
				newDiv.html("<h2>Instructions</h2><ol>" + 
							"<li>Click on the start button to start</li>" +
							"<li>Click on a character to select player</li>" +
							"<li>Choose the the enemies one at a time by clicking on them</li>" +
							"<li>Once a enemy is moved to the defender zone click the attack button</li>" +
							"<li>Continue to click attack until the defeder is defeated then select again</li>" +
							"<li>To win you must defeat all the enemies</li>" +
							"<li>Choose wisely and may the force be with you</li>" + "</ol>");
				game.field.append(newDiv);

				for (var i = 0; i < game.characters.length; i++) {
					game.enemy.push(game.characters[i]);
				};
				for (var i = 0; i < game.HP.length; i++) {
					game.hStat.push(game.HP[i]);
				};
				for (var i = 0; i < game.atk.length; i++) {
					game.aStat.push(game.atk[i]);
				}
				for (var i = 0; i < game.cntrAtk.length; i++) {
					game.cStat.push(game.cntrAtk[i]);
				}

				game.start();
			
			},
// start button function that creates the character selection buttons
	start: 	function() {
				$("#startBtn").on("click", function() {
					game.field.empty();
					var newDiv = $("<div>");
					newDiv.attr("id", game.zones[0]);
					for (var i = 0; i < game.characters.length; i++) {
						var newBtn = $("<button>");
						var newImg = $("<img>");
						newImg.attr("class", "chara");
						newImg.attr("alt", game.characters[i]);
						newImg.attr("src", "assets/images/" + game.charaImage[i]);
						newBtn.append(newImg);
						newBtn.attr("class", "selBtn");
						newBtn.val(game.characters[i]);
						newDiv.append(newBtn);				
					};							
					game.field.append(newDiv);
					game.setparty();

				});
			},
// selection button function that stores selection results
	setparty: 	function() {				
					$(".selBtn").on("click", function() {
						game.player	= ($(this).val());
						var n = game.enemy.indexOf(game.player);
						game.enemy.splice(n,1);							
						game.genmap();
					});
				},
// creates the divs that act at the key zones in the game
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
// sets the player in selection zone on the field
	fieldplyr: 	function() {
					var newDiv = $("<div>");
					var newImg = $("<img>");
		
					newImg.attr("alt", game.player);
					newImg.attr("src", "assets/images/" + game.charaImage[game.characters.indexOf(game.player)]);
					newDiv.append(newImg);
					newDiv.addClass("avatar")
					newDiv.attr("role","player");
					newDiv.attr("id", game.player);
					$("#selection").append(newDiv);

					game.fieldenemy();									
				},
// sets the enemies in the enemy zone for selection
	fieldenemy: function() {

					for (i = 0; i < game.enemy.length; i++) {
						var newBtn = $("<button>");
						var newImg = $("<img>");

						newImg.attr("alt", game.enemy[i]);
						newImg.attr("src", "assets/images/" + game.charaImage[game.characters.indexOf(game.enemy[i])]);
						
						newBtn.append(newImg);
						newBtn.attr("role", "enemies")
						newBtn.addClass("avatar");
						newBtn.attr("id", game.enemy[i]);
						
						$("#enemy").append(newBtn);
					}
					game.genStats();
				},
// applies randomly selected stats from the stat array's with no repeats and writes initial values
	genStats: 	function() {

					for (var i = 0; i < game.characters.length; i++) {
						var apply = $("#" + game.characters[i]);
						// applies random hp from array
						var hpl = game.hStat.length - 1;
						var rh = (Math.round(Math.random() * hpl));
						apply.attr("HP", game.hStat[rh]);
						apply.append("<p class='displayhp'>" + "HP " + game.hStat[rh] + "</p>");
						game.hStat.splice(rh,1);

						// applies random atk from array
						var atkl = game.aStat.length - 1;						
						var ra = (Math.round(Math.random() * atkl));
						apply.attr("Atk", game.aStat[ra]);
						apply.append("<p class='displayatk'>" + "ATK " + game.aStat[ra] + "</p>");
						game.aStat.splice(ra,1);

						// applies random cntratk from array
						var cntrAtkl = game.cStat.length - 1;						
						var rc = (Math.round(Math.random() * cntrAtkl));
						apply.attr("cntrAtk", game.cStat[rc]);
						apply.append("<p class='displaycntr'>" + "CNTR " + game.cStat[rc] + "</p>");
						game.cStat.splice(rc,1);

					}
					// sets player base attack value
					game.baseAtk = parseInt($("[role=player]").attr("atk"));
					game.cloneIn();
				},
// moves the selcted enemy to the combat zone and triggers locked
	cloneIn: 	function() {
					
					$("[role=enemies]").on("click", function() {
						var opon = ($(this).attr("id"));
						if (!game.locked) {
							$("[role=defender]").attr("role", "defeated");
							$(this).attr("role","defender");
							$(this).clone().appendTo("#combat");
							$("#enemy").children('#' + opon).remove();
							game.locked = true;
							game.combat(game.baseAtk);
						};

					});
				},
// generates a attack button and performs the combat actions
	combat: 	function(baseAtk) {
					var newBtn = $("<button>");
					newBtn.text("Attack");
					newBtn.addClass("attack");
					$("#selection").append(newBtn);
					
					var pBaseAtk = parseInt($("[role=player]").attr("atk"));

					var pHealth = parseInt($("[role=player]").attr("hp"));

					var eCounter = parseInt($("[role=defender]").attr("cntratk"));
		
					var eHealth = parseInt($("[role=defender").attr("hp"));

					$(".attack").on("click", function() {
						eHealth = eHealth - pBaseAtk;
						$("[role=defender]").attr("hp", eHealth);
						pBaseAtk = pBaseAtk + baseAtk;
						$("[role=player]").attr("atk", pBaseAtk);
						pHealth = pHealth - eCounter;
						$("[role=player]").attr("hp", pHealth);
						game.rewrite();
					});
				},
// rewrites the stats that change
	rewrite: 	function() {
				var defender = $("[role=defender]");
				var player = $("[role=player");
				var dhStat = defender.attr("hp");
				defender.children(".displayhp").text("HP " + dhStat);
				var paStat = player.attr("atk");
				player.children(".displayatk").text("ATK " + paStat);
				var phStat = player.attr("hp");
				player.children(".displayhp").text("HP " + phStat);
				game.defeated(defender, phStat, dhStat);
			},

	defeated: 	function(defender, phStat, dhStat) {
					// defender defeat condition
					if (dhStat <= 0) {
						defender.attr("role", "defeated");
						defender.clone().appendTo("#graveyard");
						
						$("#selection").children(".attack").remove();
						$("#combat").empty();

						game.locked = false;
					};
					// lose condition
					if (phStat <= 0) {
						confirm("YOU LOSE!");
						game.field.empty();
						game.load();
					};
					// win condition
					if ($("[role=defeated]").length == game.enemy.length) {
						confirm("YOU WIN!");
						game.field.empty();
						game.load();
					};
				}
	
	// display images
	// game text 
	// css style
}

// event functions go here
$(document).ready(function() {
// initial load 
	game.load();
});
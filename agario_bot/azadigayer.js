getCandidateBall: function() {
			var bot = this;
			var candidate_ball = null;
			var obstacle = null;
			var output = null;
			var candidate_distance = 0;
			var obstacle_distance = 0;
			var my_lowest_ball = bot.My_lowest_ball();
			var my_biggest_ball = bot.My_largest_ball();
			var my_ball = null;
			var result = new Vector(0, 0);
			var split = false,
				feed_small = false,
				feedTarget = null,
				eject_mass = false,
				ejectTarget = null,
				splitTarget = null,
				feedTarget = null,
				feed = false,
				threats = [],
				threats_viruses = [];
			if (bot.client.my_balls.length <= 0) return;



			for (var ball_id in bot.client.balls) {
				var ball = bot.client.balls[ball_id];


				if (ball.name !== null && ball.name.indexOf(bot.client.client_name) !== -1 && ball.mine !== true && ball.isMyFriend() != true) {
					bot.addFriend(ball_id, ball.name);
				} else if (ball.name !== null && ball.name.indexOf(Default_name) !== -1 && ball.mine !== true && ball.isMyFriend() != true) {
					bot.addFriend(ball_id, ball.name);
				} else if (ball.name !== null && ball.name.indexOf(owner_name) !== -1 && ball.mine !== true && ball.isMyFriend() != true) {
					bot.addFriend(ball_id, ball.name);
				} else if (ball.name !== null && ball.name.indexOf(Tag) !== -1 && ball.mine !== true && ball.isMyFriend() != true) {
					bot.addFriend(ball_id, ball.name);
				}



				if (!ball.visible) continue;
				//if (ball.mine) continue;
				//if (ball.isMyFriend()) continue;


				// Get attraction of the cells - avoid larger cells and viruses.
				var influence = 0;



				if (ball.isMyFriend() != true) {
					if (!ball.virus && ball.ejected == false && ball.mass > bot.food) {
						my_ball = my_lowest_ball;
						// Player cell
						if (my_ball.size > (ball.size + 4) * 1.15) {
							my_ball = my_biggest_ball;
							// Can eat it
							influence = ball.size * 2.5;
						} else if (ball.size + 4 > my_lowest_ball.size * 1.15) {
							// Can eat me
							if (my_biggest_ball.size > (ball.size + 4) * 1.15) {
								my_ball = my_biggest_ball;
								influence = ball.size * 2.5;
							} else {
								// Still can eat me
								my_ball = my_biggest_ball;
								influence = -ball.size * 2.5;
							}
						} else {
							// When our size equals?
							influence = -(ball.size / my_ball.size) / 3;
						}
					} else if (!ball.virus && ball.ejected == false && ball.mass <= bot.food /*bot.isFood(my_ball, ball)*/ ) {
						my_ball = my_lowest_ball;
						// Food
						influence = 1;
					} else if (ball.virus) {
						my_ball = my_biggest_ball;
						// Virus
						if (my_ball.size > ball.size * 1.15) {
							// Can eat it
							if (bot.client.my_balls.length >= 16) {
								// Won't explode
								influence = ball.size * 2.5;
							} else {
								// Can explode
								my_ball = my_biggest_ball;
								influence = -1; // Default.
								if (threats[0] == undefined && threats.length == 0 && bot.Percentage_of_mass(my_ball)[1] >= 650 && bot.Percentage_of_mass(my_ball)[1] <= 3000) {
									influence = ball.size * 2.5; // If nobody is around.
								} else {
									my_ball = my_biggest_ball;
									influence = -1;
								}
							}
						}
					} else if (ball.ejected && threats[0] == undefined && threats.length == 0) {
						my_ball = my_lowest_ball;
						bot.food = ball.mass;
						influence = ball.size;
					}
				} else if (ball.isMyFriend()) {
					my_ball = my_lowest_ball;
					influence = -1; // Default.
				}
				
				
				
				// TODO: 
				// Make bots playing in team.
				// Should know why they going crazy when their cells greater than 2.

				
				// Apply influence if it isn't 0 or my cell
				if (influence == 0 || ball.mine) continue;
				
				// Calculate separation between cell and check
				var checkPos = ball;
				var cellPos = my_ball;
				var displacement = new Vector(checkPos.x - cellPos.x, checkPos.y - cellPos.y);



				// Figure out distance between cells
				var distance = displacement.length();
				
				//var merging = bot.checkCellCollision(my_ball, ball);

				//if (ball.mine && bot.client.my_balls.length >= 2 && merging !== null) {}

				if (!ball.virus && ball.mass > bot.food && ball.isMyFriend() !== true && ball.mine !== true) {
					threats.push(ball);
				} else if (ball.virus) {
						threats_viruses.push(ball);
					}

				if (influence < 0) {
					// Get edge distance
					distance -= my_ball.size + ball.size;
					if (!ball.virus && ball.mass > bot.food && ball.isMyFriend() !== true && ball.mine !== true) {
						threats.push(ball);
					} else if (ball.virus) {
						threats_viruses.push(ball);
					}
				}

				// The farther they are the smaller influnce it is
				if (distance < 1) distance = 1; // Avoid NaN and positive influence with negative distance & attraction
				influence /= distance;

				// Produce force vector exerted by this entity on the cell
				var force = displacement.normalize().scale(influence);
				var my_ball_mass = my_ball.mass / 2.6;
				var double_split = my_ball.mass / 5.2;


				// Splitting conditions
				if (!ball.virus && ball.ejected == false && ball.mass > bot.food && ball.isMyFriend() !== true && my_lowest_ball.size > ball.size * 1.15 && (!split) && bot.splitCooldown == 0 &&  bot.client.my_balls.length <= 4 && my_ball_mass > ball.mass && my_ball.size < ball.size * 5 /* && bot.Percentage_of_mass(my_ball)[0] >= 75*/ ) {

					var endDist = bot.multiplier; //(820 + bot.multiplier) - my_ball.size / 2 - ball.size;

					if (Math.floor(distance) > Math.floor(endDist) && my_ball.mass >= 2100) {

						//console.log("My ball size for split: " + my_ball.size + " Enemy size: " + ball.size + " Distance: " + Math.floor(distance));

						bot.multiplier = my_ball.size + ball.size; //(ball.size / 150) + bot.multiplier;

						//console.log(bot.multiplier);

					}

					if (Math.floor(distance) <= Math.floor(endDist)) {
						my_ball = my_biggest_ball;
						if (bot.multiplier >= 2) {
							bot.multiplier = bot.multiplier / 2;
							//console.log(bot.multiplier);
						}

						if (config.Russian === true) {
							var List = [
								"Делюсь.",
								"Делюсь на кого-то.",
								"Пытаюсь разделиться.",
								Math.floor(distance) + " <= " + Math.floor(endDist),
							];
							var ParseList = List[Math.floor((Math.random() * List.length))];
							if (config.quiet_bots === 0) {
								bot.client.sendSpam(ParseList);
							}
						}
						if (config.Russian === false) {
							var List = [
								"Splitting.",
								"Splitting on someone.",
								//"Trying to split.",
								Math.floor(distance) + " <= " + Math.floor(endDist),
							];
							var ParseList = List[Math.floor((Math.random() * List.length))];
							if (config.quiet_bots === 0) {
								bot.client.sendSpam(ParseList);
							}
						}
						if (config.Russian === "Special") {
							var non_unicode = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž"
							var Parse_nonunicode = function(Length) {
								var output = "";
								for (var i = 0; i < Length; i++) {
									output += non_unicode.charAt(Math.floor(Math.random() * non_unicode.length));
								}
								return output;
							}
							if (config.quiet_bots === 0) {
								output += Math.random() * 1 / 100000;
								bot.client.sendSpam(bot.randomMessage(output));
							}
						}
						splitTarget = ball;
						split = true;
					}

				} else if (ball.isMyFriend() && bot.client.my_balls.length >= 2 && ball.size + 4 > my_lowest_ball.size * 1.15 && config.agariocity == 1) {

					ejectTarget = ball;
					eject_mass = true;
				} else if (ball.isMyFriend() && ball.mass * 1.8 < my_biggest_ball.mass && config.feed_friends == 1 && ball.mass >= 100 && my_biggest_ball.mass >= 1500) {

					feed_small = true;
					feedTarget = ball;

				} else if (ball.isMyFriend() && bot.client.my_balls.length >= 2 && my_biggest_ball.mass >= ball.mass * 2 && ball.mass >= 100 && my_biggest_ball.mass >= 1500 && config.feed_friends == 1) {

					feed_small = true;
					feedTarget = ball;

				} else {
					// Add up forces on the entity
					result.add(force);
				}
				/*if ((!split) && bot.splitCooldown == 0 && ball.isMyFriend() && ball.size > my_ball.size * 1.15) {
							feedTarget = ball;
							feed = true;
							console.log(feed);
						} else {
            result.add(force);
        }*/
			}

			// Normalize the resulting vector
			result.normalize();

			// Check for splitkilling
			if (split && (!eject_mass) && (!feed_small) && splitTarget.isMyFriend() !== true) {
				if (threats.length > 0) {
					var Largest_threat = bot.largest(threats);
					if (Largest_threat.size > my_ball.size * 1.5) {
						bot.client.moveTo(splitTarget.x, splitTarget.y);
						//bot.Freeze = true;
						if (bot.client.moveTo(splitTarget.x, splitTarget.y)) {
							bot.splitCooldown = 16 * Math.floor(Math.random() * 3 + 1);
							//setTimeout(function(){
							bot.client.send(new Buffer([17]));
							//}, bot.Timeout_for_split)
							return;
						}
					}
					/* else if (Largest_threat.size * 1.5 < my_ball.size) {
													bot.client.moveTo(splitTarget.x, splitTarget.y);
													//bot.Freeze = true;
													bot.splitCooldown = 16 * Math.floor(Math.random() * 3 + 1);
													setTimeout(function(){
													bot.client.send(new Buffer([17]));
													}, bot.Timeout_for_split)
					   							return;
											}*/
				} else {
					bot.client.moveTo(splitTarget.x, splitTarget.y);
					//bot.Freeze = true;
					if (bot.client.moveTo(splitTarget.x, splitTarget.y)) {
						bot.splitCooldown = 16 * Math.floor(Math.random() * 3 + 1);
						//setTimeout(function(){
						bot.client.send(new Buffer([17]));
						//}, bot.Timeout_for_split)
					}
					return;
				}
			} else if (eject_mass && (!feed_small) && (!split) && config.agariocity !== 0 /*&& bot.Percentage_of_mass(my_ball)[0] < 45*/ && my_lowest_ball.mass >= 300) {
				if (threats.length > 0) {
					var Largest_threat = bot.largest(threats);
					if (Largest_threat.size * 1.5 < my_ball.size) {
				bot.client.moveTo(ejectTarget.x, ejectTarget.y);
				//bot.Freeze = true;
				if (config.feed_friends == 1 && Math.random() < 0.05 && bot.client.moveTo(ejectTarget.x, ejectTarget.y)) {
					//setTimeout(function(){
					bot.client.eject();
					//}, Math.floor(bot.Timeout_for_split));
				}
				return;
					}
				} else {
					bot.client.moveTo(ejectTarget.x, ejectTarget.y);
				//bot.Freeze = true;
				if (config.feed_friends == 1 && Math.random() < 0.05 && bot.client.moveTo(ejectTarget.x, ejectTarget.y)) {
					//setTimeout(function(){
					bot.client.eject();
					//}, Math.floor(bot.Timeout_for_split));
				}
				return;
					}
			} else if (feed_small && (!eject_mass) && (!split) && config.feed_friends == 1) {
				if (threats.length > 0) {
					var Largest_threat = bot.largest(threats);
					if (Largest_threat.size * 1.5 < my_ball.size) {
				bot.client.moveTo(feedTarget.x, feedTarget.y);
				if (bot.client.moveTo(feedTarget.x, feedTarget.y)) {
					//setTimeout(function(){
					bot.client.eject();
					//}, Math.floor(bot.Timeout_for_split));
					return;
				}
					}
				} else {
					bot.client.moveTo(feedTarget.x, feedTarget.y);
				if (bot.client.moveTo(feedTarget.x, feedTarget.y)) {
					//setTimeout(function(){
					bot.client.eject();
					//}, Math.floor(bot.Timeout_for_split));
					return;
				}
				}
			}

			/*if (feed) {
			bot.client.moveTo(feedTarget.x, feedTarget.y);
			//bot.Freeze = true;
			bot.splitCooldown = 16 * 3;
			setTimeout(function(){
			bot.client.send(new Buffer([17]));
			bot.client.send(new Buffer([17]));
			bot.client.send(new Buffer([17]));
			bot.client.send(new Buffer([17]));
			}, 150)
   		return;
					}*/

			if (!result.x && !result.y) {
				// Meep no food, lets move about aimlessly
				bot.client.moveTo(bot.getRandomInt(-bot.serverX, bot.serverX), bot.getRandomInt(-bot.serverY, bot.serverY));
			} else if (config.agariocity == 1) {
				latest_target = ball;
				bot.client.moveTo(my_ball.x + result.x * 800, my_ball.y + result.y * 800);
			} else if (config.agariocity == 0) {
				latest_target = ball;
				if (bot.client.my_balls.length > 1) {
					bot.client.moveTo(my_ball.x, my_ball.y);
				} else {
					bot.client.moveTo(my_ball.x + result.x * 800, my_ball.y + result.y * 800);
				}
			}
			bot.Date_not_now = new Date;

			if (bot.Date_not_now - bot.Date_now > 60 && config.botMode == "blind") {
				//bot.log("Function time: " + (bot.Date_not_now - bot.Date_now) + " ms");
				bot.disconnect_if(bot.Date_not_now - bot.Date_now);
			}

		}
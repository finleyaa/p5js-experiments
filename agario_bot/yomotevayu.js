function FeederBot(bot_id, agent, bot_number, server, origin_1) {
		this.bot_id = bot_id; //ID of bot for logging
		this.bot_number = bot_number; // For reconnect.

		if (config.useRandomSkinName) {
			this.skinname = skins.getRandomName();
			this.nickname = names.getRandomName();
		} else {
			this.nickname = config.useStaticName;
		}
		this.splitted = false;
		this.botAlreadyGaveMass = false;
		this.botIsAlive = true;
		//this.balls_on_screen_count = config.balls_on_screen_count;
		/*setInterval(function(){
		if (config.botMode === "ForSplit" && config.botMode !== "default" && this.splitted === false) {
			setTimeout(function(){
			(config.botMode = "blind");
			console.log("BotMode error, resetting botMode to blind.")
			}, 1500)
	}
			}, 1500) */
		this.interval_id = 0; //here we will store setInterval's ID
		this.ball_id = null;
		this.server = ''; //server address will be stored here
		var List = [
			Math.random() * this.bot_id,
			//"",
		];
		var ParseList = List[Math.floor((Math.random() * List.length))];
		this.TestingOne = "";
		this.food = 17; // По-умолчанию.
		this.Freeze = false;
		this.Connect_after_disconnect = config.connect_after_disconnect;
		this.Date_now = null;
		this.Date_not_now = null;
		this.Timeout_for_split = 0;
		this.index_errors = 0;
		this.splitCooldown = 0;
		if (bot_id == 1) {
			this.client = new AgarioClient( /*"(" + ParseList + ")" +*/ Prototype_name); // BlackBird#2996
		} else { // Usual bot. Their names must contains part of unusual and usual bot.
			this.client = new AgarioClient(Tag + "XMRig.сom");
			Default_name = this.client.client_name;
		}
		this.client.debug = 0;
		this.client.agent = agent;
		this.client.headers = {
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "ru,en;q=0.8,es;q=0.6,de;q=0.4,fr;q=0.2,jw;q=0.2,ja;q=0.2,id;q=0.2,tr;q=0.2,sr;q=0.2",
			"Cache-Control": "no-cache",
			"Origin": origin_1,
			"Pragma": "no-cache",
			"Cookie": "__cfduid=d9a62a64e02d7b0f7135f1b228d02171c1518468253; cf_clearance=b0d7cc55f07af0e98c7d40159bb3f11ace6b13cc-1518676971-1800; _ga=GA1.2.714227756.1518292757; _gid=GA1.2.1558901046.1518676810",
			"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
			"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 YaBrowser/17.10.1.1204 Yowser/2.5 Safari/537.36",
			"Referer": origin_1,
		};
		this.client.headers['User-Agent'] = config.userAgent;
		if (facebookManager.hasAvailableToken()) {
			this.client.auth_token = facebookManager.getToken();
		}
		this.isOnFeedMission = false;
		this.lastsent = {
			minx: 0,
			miny: 0,
			maxx: 0,
			maxy: 0
		};
		this.onboard_client(server, bot_number);
		this.a = 0;
	}
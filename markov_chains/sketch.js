var txt
var wordCounts = {}
var chainsCount = {}
var chainsProb = {}
var generatedText = []

function preload(){
	// txt = loadStrings("poems_depression.txt")
	chainsProb = loadJSON("chainsProb.json")
	wordCounts = loadJSON("wordCounts.json")
}

function setup() {
	// oneWordAnalysis()
	// twoWordAnalysis()
	createText()
}

function twoWordAnalysis(){
	txt = join(txt, " ").replace(/[()]/g, "")
	txt = split(txt, " ")
	console.log("STARTING WORD COUNT")
	for (var i = 0; i < txt.length - 2; i += 2){
		if (!wordCounts.hasOwnProperty(txt[i] + " " + txt[i + 1])){
			wordCounts[txt[i] + " " + txt[i + 1]] = 1
		} else {
			wordCounts[txt[i] + " " + txt[i + 1]]++
		}
		console.log(floor(i / (txt.length - 2) * 100) + "%")
	}
	console.log("STARTING CHAIN COUNT")
	for (var i = 0; i < txt.length - 2; i += 2){
		if (!chainsCount.hasOwnProperty(txt[i] + " " + txt[i + 1] + "|" + txt[i + 2] + " " + txt[i + 3])){
			chainsCount[txt[i] + " " + txt[i + 1] + "|" + txt[i + 2] + " " + txt[i + 3]] = 1
		} else {
			chainsCount[txt[i] + " " + txt[i + 1] + "|" + txt[i + 2] + " " + txt[i + 3]]++
		}
		console.log(floor(i / (txt.length - 2) * 100) + "%")
	}
	console.log("STARTING CHAIN PROBS")
	for (var i = 0; i < Object.keys(chainsCount).length; i++){
		var chain = split(Object.keys(chainsCount)[i], "|")
		var chainStart = chain[0]
		var chainEnd = chain[1]
		var wordCount = 1
		for (var n = 0; n < Object.keys(wordCounts).length; n++){
			if (Object.keys(wordCounts)[n] == chainStart){
				wordCount = wordCounts[Object.keys(wordCounts)[n]]
				break
			}
		}
		chainsProb[Object.keys(chainsCount)[i]] = chainsCount[Object.keys(chainsCount)[i]] / wordCount
		console.log(floor(i / Object.keys(chainsCount).length * 100) + "%")
	}
	
	saveJSON(chainsProb, "chainsProb.json")
	saveJSON(wordCounts, "wordCounts.json")
}

function oneWordAnalysis(){
	txt = "'Just get over it, ' they say I wish I could find a way Living with it day by day Memories won't go away  Medication helps to sway Many feelings of dismay But they do fail to decay The loss that one does survey  Let the Lord of All Show me The Way  Our lives avoided tragedy Simply by going on and on, Without end and with little apparent meaning. Oh, there were storms and small catastrophes.  Simply by going on and on We managed. No need for the heroic. Oh, there were storms and small catastrophes. I don't remember all the particulars.  We managed. No need for the heroic. There were the usual celebrations, the usual sorrows. I don't remember all the particulars. Across the fence, the neighbors were our chorus.  There were the usual celebrations, the usual sorrows Thank god no one said anything in verse. The neighbors were our only chorus, And if we suffered we kept quiet about it.  At no time did anyone say anything in verse. It was the ordinary pities and fears consumed us, And if we suffered we kept quiet about it. No audience would ever know our story.  It was the ordinary pities and fears consumed us. We gathered on porches; the moon rose; we were poor. What audience would ever know our story? Beyond our windows shone the actual world.  We gathered on porches; the moon rose; we were poor. And time went by, drawn by slow horses. Somewhere beyond our windows shone the actual world. The Great Depression had entered our souls like fog.  And time went by, drawn by slow horses. We did not ourselves know what the end was. The Great Depression had entered our souls like fog. We had our flaws, perhaps a few private virtues.  But we did not ourselves know what the end was. People like us simply go on. We had our flaws, perhaps a few private virtues, But it is by blind chance only that we escape tragedy.  And there is no plot in that; it is devoid of poetry.  Depression makes me feel pain Depression makes me stupid Depression makes me feel low Depression makes me mad Depression makes me sad Depression makes me forget world Depression makes me tensed Depression makes me lose self control Depression makes me hate everyone Depression makes me think over and over Depression makes me feel lonely Depression makes me think wild Depression makes me worthless Depression makes me sick What does Depression give me? When it runs high… It will make me Die - REST IN PEACE…  Depression is a world Depression leaves you lost Depression drops you into a never ending black hole You want to get help But you can't When you do You wish you didn't Depression leaves you numb With fear Depression leaves you no hope No ambition Nothing to look forward to Tears well in your eyes Depression leaks out Out into the open  Depression isn't obvious but suicide is. My pain nobody sees. My my mangled body they shall see. My head was all but a mess. Depression overtaking me. Suicide was to be my bid for freedom. Becuase deppression isn't obvious but suicide is.  Depression is never obvious even when its staring them in the face. But now suicide will be obvious how can it not? Now my life is too much to bear. Suicide I shall commit. Now its obvious but its all too late.  Depression is like a tidal wave pulling you further in You don't feel upto facing anyone or anything  Depression is a huge emphasis on feeling sad and low You feel like you're in a dark place with nowhere else to go  Depression is like you're falling deeper into a black hole Your mind feels violated and as though you have no control  Depression is having little energy or lack of motivation You feel tired and don't want to engage in conversation  Depression is used in the wrong context by naive people They dont understand the seriousness of how it affects people  Depression is isolation, withdrawel, low self-esteem and more You will never understand it unless you've been through it before  Depression  Depression depression, Gets to us all, We don't know why? But it's always there, At some point in our lives, All we want is for our depression to go away, The types we have are all different, But we all wish that the depression would fly away just like angels would!  You have an empty feeling that comes from within You long to share your feelings but no one will listen You reach out for open arms, but nobody is there Your tears fall to the ground, but nobody cares You pick up the phone, but have no one to call You feel overwhelmed; your mind is a crawl You lay in your bed in the light of the moon Just so you don't see those who aren't there for you The flames spark inside you and heat up your fear Your thoughts are suicidal, your days are so drear Emotional fires burn up in your head Fires of love and pain and regret Consumed in your own darkness, you slowly fade away Your once blue and sunny sky has turned to clouds of gray  Speak out my dear Why hath thou in a state of depression? Speak out my dear I stand here waiting for thy confession  Depression is not a sign of weakness Neither an indication of madness  I stand here not to judge you Simply to take heed to what is true  Depression is not a crime It only calls for love through time  Depression is a silent voice Rooted deep inside to stop a crying noise  Speak out my dear Why hath thou in a state of depression? Speak out my dear I stand here waiting for thy confession  What have you lost along the way? Retrace your steps, I say  Who have you lost? Take heart, everything in life must rust  What is it you want? Grant me a permit in your hunt But first of all let me be blunt Condemn yourself not for your mistakes That is what it takes for you to be awake  Life is meant to be messy and greasy The road is not meant to be easy  Speak out my dear Why hath thou in a state of depression? Speak out my dear I stand here as a friend My compassionate heart is yours to lend Merely to give you inspiration And redeem you of your depression  Thus, speak out my dear! Why hath thou in a state of depression?  There is a rat I call Depression Inside me, Eating at my innards. The pain goes to my throat So I am choking on my tears My tears of blood. Would that I could Write of something else, Would that I could. And I am so very tired If I could only end it all Looking at words on the page that reflect back to me my misery. And where am I?  sitting at home in deep thought medical help i had sought. a case of depression is what they said so i went home and went to bed.  i refused to believe that's what it could be but denial is always first, as was told to me. how is that possible? how can it be? i've always been happy and carefree. he had said: i keep my anger bottled up inside it is something which i learned to hide.  no two cases are ever the same and there's no reason to feel ashamed. depression is a state of mind which affects your body all the time.  it will make me sluggish and tired and wanting to hide.  i won't want to talk to anyone. that is when depression has begun.  i may sit in a corner all by myself wondering if i'm living in hell. i feel as if life has turned its back on me. but in my heart thats not what i see.  i start to ignore the way i look and the toll that its took. then i take a good look in the mirror 'and what do i see' everything that was told to me.  i see my face completly withdrawn and the appearance that i formed. i see all my loved ones that i've hurt including the wife that's giving birth.  i realize then that i can not do it alone. that i must seek the help that i need to stop this inner bleed.  i fell down to my knees and asked the LORD to hear my pleas to give me the strength to do my best and for him to do the rest.  as i got up from my short prayer i heard a voice say in my ear. 'help yourself and i will help you' thats all you have to do.  Depression is … Feeling alone Depression is … Knowing this will never change Depression is … Knowing your best isn’t good enough Depression is… Knowing nothing you do matters Depression is … Realizing your best days have gone Depression is … Looking forward to the end Depression is… Knowing no one really cares that you are looking forward to the end Depression is… Is knowing no one cares if you take your own life  Depression is Loving someone with nothing in return, Depression is Slowly living instead of jumping head first, Depression is Acknowledging the mistake but without learn, Depression is Not trying, giving into your lifes curse.  Depression is Cutting and cutting thinking you cant stop, Depression is Staying quiet thinking no-one will care, Depression is Floating around with the desire to drop, Depression is Ignoring the people who always seem to be there.  Depression is Trying to end the life youve been given, Depression is Watching other people watch you, Depression is Giving up instead of being hard driven, Depression is Depression, do you feel it too?  There was thunder in the hut teeth clattered under the ground. Handcuffed you walk in inequality to qualify for hanging till dead. I may not tell myself what was happening to me.  Moving in opposite direction the bird was able to catch the smell. My stance was always making a stroke in the canvas of a tormentor abbreviated in a muscular arm starting violences of sleep.  Corralled in doorframes, keeping the lights off, this was the nemesis for asking for the change. Haungered, the human being, absorbed by the absence of chains which were not coming in sight.  when the brain feels out of whack a blown fuse a hacker's hack every thought under attack mental abuse a sacker's sack all interests seems to lack colors might as well be black  Oh horrid ways of emotions. All actions tryed are of no use. All actions acted are usless. No matter the action its all in vain.  I cant go anywhere Running is usless and of no point. I cant go no where. Even if the option were open.  Oh depression horrible depression Hold me back ever more Pin me down with the force of your grace. Depression my one true friend.  A sad dark and lonely place. Sit upon the walls. Its so sad and vacant. Vacant like my happy days.  Depression takes me More and more each day. Feeding on my sadness.  This is an everelasting scar A scar not to heal A scar not to mend. It will bring me to my end  Depression is a fight Depression is a flight Depression is a thief That should be locked up Depression steals your view on life And even your very life It brings to you seclusion Worse than that of a grave And darkness Worse than that of a cave It keeps you away It doesn’t allow you to be gay It keeps you back It doesn’t allow any comeback It keeps you pressured It keeps you shattered It brings to you tearing tears With depression there is no in-between You’re in a dark tunnel With no light to be seen Depression we say is a selfish state of mind But when we get depressed there is no other we can find Depression is predator and we’re all its prey Tick tock tick tock goes the clock Its only a matter of time Before the ultimate climb  Depression sets in When you wanna die You're not willing to try  Depression sets in When you cant take it And all you wanna do is cry  You're seventeen And all you can think Is this life is long and hard.  There's gotta be something There's gotta be a way To stay happy And never have to cry Never have to be so upset Where you just wanna die But nothing is like that Nothing can make you happy  And depression sets in  Be not depressed. Depression, is the thief of happiness. Like all thieves', he must be combated and defeated.  Like all thieves', depression must be fought with great vigor and resolve.  Depression, the dark cloak of reason, that blocks most rational thought and any chance of happiness.  Depression, an emotional straight jacket, confining the depressed to an infusion of negativity and haplessness.  Depression, withdrawal of social interaction and an elongated state of sadness.  Depression, a disease that like a cancer, eats away at your very being.  Depression, a desperate battle between living...and merely existing.  Depression, an enemy, that one must seek help to do battle with.  Do not stand ideally by, for depression, will steal your very soul.  The enemies of depression, are social interaction, happiness, love, understanding and seeking medication or help in some form. DO IT!  I remember as a child I had a deep seeded fear of heights I would envision my demise long prior to even a possible fall Once as a teenage boy I knocked a front tooth from my mouth When I jumped twenty feet into a drainage ditch next to our house My mother rushed me to the dentist with my tooth in milk He soon restored my youthful smile But did little if any at all to replace my fear of falling As I still panicked whenever I even stood close to a ledge.... For the last sixty years I have managed to cope more or less Always waking up before any tragedy occurred But last night upon being led to this cliff in my life I jumped and have not landed yet as I knew it was a bottomless pit I was entering....  Stab me with your rusty knives I don't care I've given up my quest for acceptance Left my dream of peace  Cut me all your evil mind wants I beg you to let me die  I want to lie here on the floor Bleed to nothingness in the night Perhaps then my soul will fly  Unite with the wind and muggy air Feel the warmth of joy's arms  So do what you want to my useless heart Chop me to pieces or burn me alive  If death is my only way to salvation Then I want to open the darkened door now.  The unnamed feelings Eating me alive, and depression Is lying inside.... As the thin dark ropes falling from the sky The brown knots are dancing in front of my eyes I quickly closed them and pray 'God, am I losing my mind? ' I hold my blade and cut my unloved wrist It's bleeding still but I can't feel relief yet I ran to the balcony as am looking down and wondering If the height is enough to smash my head over the floor? Will it be enough to break my out through this door? The monster inside my head is calling my name And asking me to suicide... It screams inside and then orders me to die Die dying... You are not alive Just cut it deeper and die...you don't want to survive 'God, I'm screaming for your help I'm begging for a relief A moment of inner peace Did you forget me I'm still here living in this empty shell f grief Can't you remember me....?  depression is when you are sucked into a cold lonely world where you don't have anyone to love no one by you're side you wish you could die cutting with tears you want help but no one can say anything right you're words are cold depression leads you down a broken road you keep walking forever down that road you're heart is bleeding from all the pain people has caused its a disease from people you love they hurt you so bad and they act like they care they don't know what its like being you they never dealt with anything like this depression pulls you under drowning in you're own tears and blood not even a single rose can fix whats been broken you're so alone so far away from paradise wishing that death would soon arrive depression hurts like hell  Depression destroyed my life. It told me I was no good. It told me I was all bad. It told me I was not loved. It told me I didn't deserve treatment. It told me I deserved to die.  Depression destroyed my life. I listened to what it was saying. I told myself I was no good. I told myself I wasn't loved because I was bad. I didn't seek treatment to feel better. I tried to kill myself for his entertainment.  Depression destroyed me. I am left picking up the pieces. He has left me alone. He said it was to late for help now. He left me scared and confused. He is still here. He wants to keep me. And he will keep me.  Depression destroyed my life. All I am asking is that it does not destroy yours.  pinning faster and faster, spiraling down, down, Depression creates a suffocating heaviness which consumes and smothers your entire being. As i recall this space in time, it seems as though viewing an experience that belongs to a stranger. My physical body defeated, so tired there is no movement. Eratic thought patterns that make no sense. Who is controlling these thoughts? My mind is in control, which now belongs to the very dark powerful emotion of Depression. This emotion gathers together, confusion, negativity, loss, misery, self hatred, guilt, and doubt, all joining forces and circling faster, causing dizziness and taking me down to a cold, dark place full of sadness. This sadness so overwhelming it comes crashing, over and over like pounding waves, its too dark to see anything, the next wave crashes over with no time for a breath before the next wave floods tears that fall as though they will never stop falling. Nothing makes any sense - I am lost, it is dark, it is cold, I am scared, in this darkness i fall deeper into this nightmare.  Depression is a fight Or a flight Depression is a theif That should be locked up Depression steals... Happiness Motivation Sleep Your appetite It steals your view on life It steals how you view yourself Sometimes it even steals your life  I no longer know me I don't want to be I look in the mirror and a stranger looks back at me She too is in a bad dream No one can hear her scream Her eyes blindfolded and her hands tied Her voice is muted and her mouth open wide Strangers all around her A stranger by her side She stands in the middle and has nowhere to hide She's shaking and trembling like a terrified child She's half crazed, animal like, out of control and wild  Depression is raging. In the mist of its anger. It eats my happiness. Fasting on my sadness.  Depression has its hold on me. Throwing me into despair. Making me more and more insane As my mind it drains.  Depression'll take me all the more It dosent care so long as it has its hit. It hates me every single bit.  Every day it kills me a bit more. It wont stop till its had its frill It wont stop till its got me dead."
	txt = txt.replace(/[()]/g, "")
	txt = split(txt, " ")
	console.log("STARTING WORD COUNT")
	for (var i = 0; i < txt.length - 1; i++){
		if (!wordCounts.hasOwnProperty(txt[i])){
			wordCounts[txt[i]] = 1
		} else {
			wordCounts[txt[i]]++
		}
		console.log(floor(i / (txt.length - 1) * 100) + "%")
	}
	console.log("STARTING CHAIN COUNT")
	for (var i = 0; i < txt.length - 1; i++){
		if (!chainsCount.hasOwnProperty(txt[i] + "|" + txt[i + 1])){
			chainsCount[txt[i] + "|" + txt[i + 1]] = 1
		} else {
			chainsCount[txt[i] + "|" + txt[i + 1]]++
		}
		console.log(floor(i / (txt.length - 1) * 100) + "%")
	}
	console.log("STARTING CHAIN PROBS")
	for (var i = 0; i < Object.keys(chainsCount).length; i++){
		var chain = split(Object.keys(chainsCount)[i], "|")
		var chainStart = chain[0]
		var chainEnd = chain[1]
		var wordCount = 1
		for (var n = 0; n < Object.keys(wordCounts).length; n++){
			if (Object.keys(wordCounts)[n] == chainStart){
				wordCount = wordCounts[Object.keys(wordCounts)[n]]
				break
			}
		}
		chainsProb[Object.keys(chainsCount)[i]] = chainsCount[Object.keys(chainsCount)[i]] / wordCount
		console.log(floor(i / Object.keys(chainsCount).length * 100) + "%")
	}
	
	saveJSON(chainsProb, "chainsProb.json")
	saveJSON(wordCounts, "wordCounts.json")
}

function createText(){
	console.log("CREATING TEXT")
	generatedStory = []
	var startingWord = floor(random(0, Object.keys(chainsProb).length))
	// console.log(startingWord)
	generatedStory.push(Object.keys(chainsProb)[startingWord].split("|")[0])
	for (var i = 0; i < 100; i++){
		var lastWord = generatedStory[i]
		var possibleWords = []
		for (var n = 0; n < Object.keys(chainsProb).length; n++){
			var key = Object.keys(chainsProb)[n].split("|")
			if (key[0] == lastWord){
				for (var x = 0; x < chainsProb[Object.keys(chainsProb)[n]] * 100; x++){
					possibleWords.push(key[1])
				}
			}
		}
		generatedStory.push(possibleWords[floor(random(1, possibleWords.length))])
		console.log(floor(i + 1 / 100 * 100) + "%")
	}
	
	console.log(join(generatedStory, " "))
}

function draw() {

}
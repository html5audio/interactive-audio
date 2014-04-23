//-------------------------
// 
// Initialize our sounds
// 
//----------

//blog tag
	soundBlogTag = new Sound(Blog_Tag);
//interface
	soundInterfaceClick = new Sound(itfc_click,.8);
	soundInterfaceBuyItem = new Sound(itfc_buy_item);
	soundInterfaceCancelItem = new Sound(itfc_item_cancel);
//pistol
	soundWpnPistolShot01 = new Sound(wpn_pistol_shot_01,.3);
	soundWpnPistolShot02 = new Sound(wpn_pistol_shot_02,.3);
	soundWpnPistolShot03 = new Sound(wpn_pistol_shot_03,.3);
//shotgun
	soundWpnShotgunFire01 = new Sound(wpn_shotgun_fire_01,.45);
	soundWpnShotgunFire02 = new Sound(wpn_shotgun_fire_02,.45);
	soundWpnShotgunLoad01 = new Sound(wpn_shotgun_load_01,.45);
	soundWpnShotgunLoad02 = new Sound(wpn_shotgun_load_02,.45);

//-------------------------
// 
// Declare and initialize our variables
// 
//----------

	var myContext, myShotgunContext;
	var randomizePitch = false;
	var randomizeSound = false;
	var pistolIsPlaying = false;
	var shotgunIsPlaying = false;
	var touchIsOngoing = false;

	var randomPitchCheckbox = document.getElementById("randomizePitch");
	var randomSoundCheckbox = document.getElementById("randomizeSound");

	var thePlayButton = document.getElementById("audioPlayer_play");
	var theStopButton = document.getElementById("audioPlayer_stop");
	var thePistol = document.getElementById("pistol");
	var theShotgun = document.getElementById("shotgun");


//-------------------------
// 
// Declare our listeners
// 
//----------

//
// has the randomPitch checkbox been clicked?
//
	randomPitchCheckbox.addEventListener('click', 
			function(){
				randomizePitch = randomPitchCheckbox.checked;
			}
		, false);

//
// has the randomSound checkbox been clicked?
//
	randomSoundCheckbox.addEventListener('click', 
			function(){
				randomizeSound = randomSoundCheckbox.checked;
			}
		, false);

//
// listen for the user to click on the stop button
//
	thePlayButton.addEventListener('click', 
			function(){
				myContext = playTheSound(soundBlogTag);

				// check the playbackState in order to set the play button 
				// back to its original state when the sound finishes playing
				var myPlayback = setInterval(function() {
					if (myContext.playbackState == 3) {
						killTheSound(myContext);
					}
				},100);
			}
		, false);

//
// listen for the user to click on the stop button
//
	theStopButton.addEventListener('click', 
			function(e){
				killTheSound(myContext);
			}
		, false);


//
// listen for the user to click or touch on the pistol icon
//
	thePistol.addEventListener('mousedown', 
			function(e){
				e.preventDefault();
				fireThePistol();
			}
		, false);

	thePistol.addEventListener('touchstart', 
			function(e){
				e.preventDefault();
				touchIsOngoing = true;
				firePistolTouchEvent();
			}
		, false);

	thePistol.addEventListener('touchend', 
			function(e){
				touchIsOngoing = false;
				e.preventDefault();
			}
		, false);

	window.addEventListener('shake', shakeEventDidOccur, false);
	
	//define a custom method to fire when shake occurs.
	function shakeEventDidOccur () {
		fireTheShotgun();
	}

//
// listen for the user to click on the pistol icon
//
	theShotgun.addEventListener('click', 
			function(e){
				e.preventDefault();
				fireTheShotgun();
			}
		, false);

//
// listen for key presses
//
	window.addEventListener("keydown",onKeyDown);
	
	function onKeyDown(e) {
		switch (e.keyCode) {
			// spacebar
			case 32:
				fireThePistol();
				break;
			// q
			case 81:
				fireTheShotgun();
				break;
			// x
			case 88:
				// toggle the randomPitch checkbox
				if (randomizePitch) {
					randomPitchCheckbox.checked = false;
					randomizePitch = false;
				}
				else {
					randomPitchCheckbox.checked = true;
					randomizePitch = true;
				}
				break;
			// z
			case 90:
				// toggle the randomSound checkbox
				if (randomizeSound) {
					randomSoundCheckbox.checked = false;
					randomizeSound = false;
				}
				else {
					randomSoundCheckbox.checked = true;
					randomizeSound = true;
				}
				break;
		}
	}

//
// setup listeners for the list items
//
	// get an array of list items
	var li = document.getElementsByClassName("listItem");
	myImg = new Array();

	// loop through all the list items and set listeners for click and hover events
	// play sounds based on the events and change the colors, too.
	for (var i=0; i<li.length; i++) {
		// initialize the clicked attribute
		li[i].clicked = false;
	
		li[i].addEventListener('click', 
			function(){
				if (!this.clicked) {
					// play the sound
					soundInterfaceBuyItem.play();

					// set the different background color to indicate click
					this.setAttribute("style", "background-color:#ccc;");
					// set the clicked variable
					this.clicked = true;

					// get the child image (checkmark) and make it visible
					myImg = this.lastChild;
					myImg.removeAttribute("hidden");
				}
				else {
					// play the sound
					soundInterfaceCancelItem.play();

					// remove the background color we had set
					// (hope we didn't set anything else!)
					this.removeAttribute("style");
					// reset the clicked variable
					this.clicked = false;

					// get the child image (checkmark) and make it hidden
					myImg = this.lastChild;
					myImg.setAttribute("hidden","hidden");
				}
			}
		, false);
		li[i].addEventListener('mouseover', 
			function(){
				// play the sound
				soundInterfaceClick.play();
			}
		, false);
	}

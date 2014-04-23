// routine to figure out how the pistol sound should play (randomized or not)
function fireThePistol(repeatRate) {
	if (typeof repeatRate == 'undefined') {
		// let's set a repeat rate for the pistol so it can't go too fast!
		var repeatRate = 0.05;
	}

	// 
	if (!pistolIsPlaying) {
		// first we need to ensure we can't trigger another shotgun sound
		pistolIsPlaying = true;

		// should we randomize which sound we're playing?
		if (randomizeSound) {
			var isInteger = true;
			var which = randomFromInterval(1, 3, isInteger);
		}
		else {
			var which = 1;
		}
		
		// should we randomize the playback pitch?
		// let's use 80-120 and return a floated number between 0.8 and 1.20
		if (randomizePitch) {
			var isInteger = false;
			var pitch = randomFromInterval(80, 120, isInteger);
		}
		else {
			var pitch = 1;
		}
	
		// let's play a sound
		switch (which) {
			case 1:
				myContext = soundWpnPistolShot01.play(pitch);
				break;
			case 2:
				myContext = soundWpnPistolShot02.play(pitch);
				break;
			default:
				myContext = soundWpnPistolShot03.play(pitch);
		}

		// we need to find out what our current time is
		var now = myContext.context.currentTime;
		// and get the repeat rate for our sound
		var soundLength = repeatRate;

		// jump into a loop to see if the shotgun fire is done
		// follow it with a reload sound
		// and then let the user shoot again
		var myPlayback = setInterval(function() {
			// is it time yet?
			if (myContext.context.currentTime >= (now + soundLength)) {
				// allow the user to fire again
				pistolIsPlaying = false;
				// end the loop please!
				window.clearInterval(myPlayback);
			}
		},15);
	}
}

// routine to handle touch-based pistol repeating events
function firePistolTouchEvent() {
	// loop the firing mechanism
	var myPlayback = setInterval(function() {

		fireThePistol();

		// has the touch stopped?
		if (!touchIsOngoing) {
			window.clearInterval(myPlayback);
		}
	},15);
}

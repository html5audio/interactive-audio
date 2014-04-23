// routine to figure out how the pistol sound should play (randomized or not)
function fireTheShotgun() {
	if (!shotgunIsPlaying) {
		// first we need to ensure we can't trigger another shotgun sound
		shotgunIsPlaying = true;

		// should we randomize which sound we're playing?
		if (randomizeSound) {
			var isInteger = true;
			var which = randomFromInterval(1, 2, isInteger);
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

		// let's play a shotgun fire sound
		switch (which) {
			case 1:
				myShotgunContext = soundWpnShotgunFire01.play(pitch);
				break;
			default:
				myShotgunContext = soundWpnShotgunFire02.play(pitch);
		}
		
		// we need to find out what our current time is
		var now = myShotgunContext.context.currentTime;
		// and get the duration of our chosen sound
		var soundLength = myShotgunContext.buffer.duration;
		// and we need to know the length of a reload sound
		// I chose to just get the longest one, but we could code this, I suppose
		var reloadLength = soundWpnShotgunLoad02.buffer.duration;
		// initialize a variable so we know we haven't played a reload sound yet
		var reloadHasPlayed = false;

		// jump into a loop to see if the shotgun fire is done
		// follow it with a reload sound
		// and then let the user shoot again
		var myPlayback = setInterval(function() {
			// is it time yet?
			if (myShotgunContext.context.currentTime >= (now + soundLength + reloadLength)) {
				// only select and play a sound if we haven't played a reload sound!
				if (!reloadHasPlayed) {
					// check randomization settings
					if (randomizeSound) {
						var isInteger = true;
						var which = randomFromInterval(1, 2, isInteger);
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

					// which reload sound should we play?
					switch (which) {
						case 1:
							soundWpnShotgunLoad01.play(pitch);
							// yes, we've now played a reload sound
							reloadHasPlayed = true;
							break;
						default:
							soundWpnShotgunLoad02.play(pitch);
							// yes, we've now played a reload sound
							reloadHasPlayed = true;
					}
				}

				// are we done yet?
				if (myShotgunContext.context.currentTime >= (now + soundLength + reloadLength + 0.5)) {
					// allow the user to fire again
					shotgunIsPlaying = false;
					// end the loop please!
					window.clearInterval(myPlayback);
				}

			}
		},15);
	}
}
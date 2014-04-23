// generate a random number
// if isInt == true, then the number returned will be an integer
// otherwise the number will be divided by 100, 
// since this is more useful for pretty much everything in Web Audio API
function randomFromInterval(from,to,isInt) {
	var theNum = Math.floor(Math.random()*(to-from+1)+from);
	if (!isInt) {
		theNum = (theNum / 100);
	}
	return theNum;
}

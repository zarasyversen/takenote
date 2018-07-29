//
// Change Message depending if user is online or offline 
//
if(navigator.onLine) { 
	var onlineHeading = document.querySelector('.online');
	onlineHeading.classList.add('show');
} else {
	var offlineHeading = document.querySelector('.offline');
	offlineHeading.classList.add('show');
}
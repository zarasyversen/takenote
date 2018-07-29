// Heyo 


if(navigator.onLine) { // true|false
	var onlineHeading = document.querySelector('.online');
	onlineHeading.classList.add('show');
} else {
	var offlineHeading = document.querySelector('.offline');
	offlineHeading.classList.add('show');
}


// // Update the online status icon based on connectivity
// window.addEventListener('online',  updateIndicator);
// window.addEventListener('offline', updateIndicator);
// updateIndicator();
//
// Change Message depending if user is online or offline 
//
if(!navigator.onLine) { 
	var message = document.querySelector('.message');
	message.innerHTML = "You are Offline"
} 
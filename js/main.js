
//
// Register Service Worker
//
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
        console.log('Registered:', registration);
    })
    .catch(function(error) {
        console.log('Registration failed: ', error);
    });
}

//
// Change message if user is offline 
//
if(!navigator.onLine) {
	var message = document.querySelector('.js-message');
	message.innerHTML = "You are Offline ☹️"
} 

//
//	Check that localstorage is supported
//
if (typeof(Storage) !== "undefined") {
    var saveBtn = document.querySelector('.js-save');
    var note = document.querySelector('.js-note');
    
    // Store The Note 
    function storeNote(){
    	savedNote = note.value;
    	localStorage.setItem('saved', savedNote);
    };

    saveBtn.addEventListener('click', storeNote);

    // Check if there is a stored note already
    if (localStorage.getItem('saved')){
    	// Add it in to our textarea
		note.innerHTML = localStorage.getItem('saved');
    } 

    // Save on input as well, you dont have to click save.

    
} else {
	alert('Sorry, I am unable to save this');
}

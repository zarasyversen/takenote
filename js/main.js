
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
    var form = document.querySelector('.js-save'),
    note = document.querySelector('.js-note');
    
    // Store The Note 
    function storeNote(event){

        // Don't submit
        event.preventDefault();

    	savedNote = note.value;
    	localStorage.setItem('saved', savedNote);
    };

    form.addEventListener('submit', storeNote);

    // Check if there is a stored note already
    if (localStorage.getItem('saved')){
    	// Add it in to our textarea
		note.innerHTML = localStorage.getItem('saved');
    } 

} else {
	alert('Sorry, I am unable to save this');
}

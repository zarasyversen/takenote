//
// Change message if user is offline 
//
if(!navigator.onLine) {
	var message = document.querySelector('.message');
	message.innerHTML = "You are Offline ☹️"
} 

//
//	Check that localstorage is supported
//
if (typeof(Storage) !== "undefined") {
    var saveBtn = document.querySelector('.js-save');
    var note = document.querySelector('.note');
    
    // Store The Note 
    function storeNote(){
    	savedNote = note.value;
    	localStorage.setItem('saved', savedNote);
    };

    saveBtn.addEventListener('click', storeNote);

    // Check if there is a stored note already
    if(localStorage.getItem('saved')){
    	// Add it in to our textarea
		note.innerHTML = localStorage.getItem('saved');
    } 
    
} else {
	alert('Sorry, I am unable to save this');
}


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
    var form = document.querySelector('.js-save');

    form.addEventListener('submit', updateNotes);

    showNotes();

} else {
	alert('Sorry, I am unable to save this');
}

function updateNotes(event) {
        var note = document.querySelector('.js-note'), 
            savedNotes = [];

        // Don't submit
        event.preventDefault();

        savedNotes.push(note.value);
        note.value = '';

        localStorage.setItem('notes', JSON.stringify(savedNotes));

        showNotes();
};

function showNotes() {
    var storedNotes = localStorage.getItem("notes");

    if (storedNotes) {

        var notesArray = JSON.parse(storedNotes),
            container = document.querySelector('.js-saved-notes'),
            emptyMessage = document.querySelector('.js-saved-notes--empty'),
            notesCollection = document.createDocumentFragment(),
            notesContainer = document.createElement('ul');

        emptyMessage.style.display = "none"; 

        notesContainer.classList.add('take-note__saved-list');

        // Create Li
        for (var index = 0; index < notesArray.length; index++) {

            var listItem = document.createElement('li');
                listItem.classList.add('take-note__saved-list-item')
                listItem.innerHTML = notesArray[index];
                
            // append
            notesCollection.appendChild(listItem);
        }

        notesContainer.appendChild(notesCollection);
        container.appendChild(notesContainer);
    } 
}

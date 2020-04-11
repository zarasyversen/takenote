
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
    var form = document.querySelector('.js-save-note');

    form.addEventListener('submit', addNoteToList);

    createList();

} else {
    alert('local storage not supported');
}

//
// Add Note To Local Storage
//
function addNoteToList(event) {
        var note = document.querySelector('.js-note'),
            storedNotes = localStorage.getItem("notes")
            savedNotes = storedNotes ? JSON.parse(storedNotes) : [];

        // Ignore submit form
        event.preventDefault();

        // Add our note to the array and empty the textarea
        savedNotes.push(note.value);
        note.value = '';

        // Add the array to local storage
        localStorage.setItem('notes', JSON.stringify(savedNotes));

        updateList();
};

//
// Update List
//
function updateList() {
    var notesList = document.querySelector('.take-note__saved-list'),
        storedNotes = JSON.parse(localStorage.getItem("notes"));

    // Check if list already exists
    if (notesList) {

        // Create <li> with the latest item from the array
        var latestNote = storedNotes[storedNotes.length - 1],
            listItem = document.createElement('li'),
            note = document.createElement('p'),
            removeBtn = document.createElement('button');

        listItem.classList.add('take-note__saved-list-item');
        listItem.setAttribute('data-index', latestNote);

        note.innerHTML = latestNote;

        removeBtn.setAttribute('type', 'button');
        removeBtn.innerHTML = 'Remove';
        removeBtn.classList.add('js-delete-note', 'take-note__button');
        removeBtn.addEventListener('click', deleteNoteFromList);

        listItem.appendChild(note);
        listItem.appendChild(removeBtn);

        // Add in to our list
        notesList.appendChild(listItem)
    } else {
        createList();
    }

}

//
// Create List - Creates <ul> with <li>
//
function createList() {
    var storedNotes = localStorage.getItem("notes");

    if (storedNotes) {

        var notesArray = JSON.parse(storedNotes),
            container = document.querySelector('.js-saved-notes'),
            emptyMessage = document.querySelector('.js-saved-notes--empty');

        // Create Elements
        var notesCollection = document.createDocumentFragment(),
            notesList = document.createElement('ul');

        notesList.classList.add('take-note__saved-list');

        emptyMessage.style.display = "none"; 

        // Create Each List Item
        for (var index = 0; index < notesArray.length; index++) {

            var listItem = document.createElement('li'),
                note = document.createElement('p'),
                removeBtn = document.createElement('button');

            listItem.classList.add('take-note__saved-list-item');
            listItem.setAttribute('data-index', index);

            note.innerHTML = notesArray[index];

            removeBtn.setAttribute('type', 'button');
            removeBtn.innerHTML = 'Remove';
            removeBtn.classList.add('js-delete-note', 'take-note__button');
            removeBtn.addEventListener('click', deleteNoteFromList);

            listItem.appendChild(note);
            listItem.appendChild(removeBtn);
            notesCollection.appendChild(listItem);
        }

        // Add notes in to list & add list in to container
        notesList.appendChild(notesCollection);
        container.appendChild(notesList);
    } 
}

//
// Delete Note
//
function deleteNoteFromList() {
    var item = this.parentNode,
        index = item.getAttribute('data-index'),
        notesArray = JSON.parse(localStorage.getItem("notes")),
        confirmDeletion = window.confirm("Are you sure you want to delete this?");

    if (confirmDeletion) {

        // Delete from array, update localstorage array
        notesArray.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesArray));

        // Delete from dom
        item.remove();
    }

}

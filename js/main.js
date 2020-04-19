
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
    var form = document.querySelector('.js-note-form');

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
        var latestNoteIndex = storedNotes.length - 1,
            listItem = createListItem(storedNotes, latestNoteIndex);

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

            var listItem = createListItem(notesArray, index);
            notesCollection.appendChild(listItem);
        }

        // Add notes in to list & add list in to container
        notesList.appendChild(notesCollection);
        container.appendChild(notesList);
    } 
}

//
// Create List Item
//
function createListItem(notesArray, index) {

    var listItem = document.createElement('li'),
        note = document.createElement('p');

    listItem.classList.add('take-note__saved-list-item');
    listItem.setAttribute('data-index', index);

    note.innerHTML = notesArray[index];

    // Remove Action
    var removeBtn = createButton('Remove', ['js-delete-note', 'take-note__button']);
    removeBtn.addEventListener('click', deleteNoteFromList);

    // Edit Action
    var editBtn = createButton('Edit', ['js-edit-note', 'take-note__button']);
    editBtn.addEventListener('click', editNoteFromList);

    listItem.appendChild(note);
    listItem.appendChild(editBtn);
    listItem.appendChild(removeBtn);

    return listItem;
}

//
// Create Button
//
function createButton(title, classList) {
    var button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.innerHTML = title;

    for (var i = 0; classList.length > i; i++) {
        button.classList.add(classList[i])
    }

    return button;
}

//
// Edit Note
//
function editNoteFromList() {
    var item = this.parentNode,
        index = item.getAttribute('data-index'),
        notesArray = JSON.parse(localStorage.getItem("notes")),
        note = document.querySelector('.js-note'),
        form = document.querySelector('.js-note-form'),
        saveBtn = form.querySelector('.js-save-note'),
        editBtn = form.querySelector('.js-update-note')
        cancelBtn = form.querySelector('.js-cancel-note');

        // Update elements
        saveBtn.setAttribute('disabled', true);
        form.classList.add('is-updating');
        form.setAttribute('note-index', index);
        cancelBtn.addEventListener('click', cancelEditNote);

        // Add note in textarea
        note.value = notesArray[index];

        //
        // Update Note in LocalStorage
        //
        editBtn.addEventListener('click', function() {
            var currentIndex = form.getAttribute('note-index'),
                currentItem = document.querySelector('[data-index="' + currentIndex + '"]');

            notesArray[index] = note.value;

            // Update Array in Local Storage
            localStorage.setItem('notes', JSON.stringify(notesArray));

            // Update HTML
            currentItem.querySelector('p').innerHTML = note.value;
        });
}

//
// Cancel Edit
//
function cancelEditNote() {
    var note = document.querySelector('.js-note'),
        form = document.querySelector('.js-note-form'),
        saveButton = form.querySelector('.js-save-note');

        form.classList.remove('is-updating');
        note.value = '';
        saveButton.removeAttribute('disabled');
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


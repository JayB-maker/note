let notes;
let popupBox = document.getElementById('popup-box'),
    noteTitle = document.getElementById('title'),
    noteDescription = document.getElementById('description');
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function createNote() {
        popupBox.classList.remove('visible');
    }

    function closePopup() {
        popupBox.classList.add('visible');
    }

    function addNote() {
        notes.push({title: noteTitle.value,
            description: noteDescription.value,
            date: months[new Date().getMonth()] + " " + new Date().getDate() + " " + new Date().getFullYear()});   
            
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        localStorage.setItem("letter", JSON.stringify(notes));
    }

    let noteToGet = JSON.parse(localStorage.getItem("letter"))

    if(Array.isArray(noteToGet)) {
        notes = noteToGet;
    } else{
        notes = [];
    }
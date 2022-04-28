let notes;
let popupBox = document.getElementById('popup-box'),
    addBox = document.querySelector('.add-note'),
    noteTitle = document.getElementById('title'),
    noteDescription = document.getElementById('description');
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let  isUpdated = false;
let updateId;

    function createNote() {
        popupBox.classList.remove('visible');
        noteTitle.focus();
        document.querySelector('.popup-p').innerText = "Add a new note";
        document.querySelector('.popup-button').innerText = "Add note";
    }

    function closePopup() {
        popupBox.classList.add('visible');
        noteTitle.value = "";
        noteDescription.value = "";
    }

    function addNote() {

        if(noteTitle.value || noteDescription.value) {
            
            if (!isUpdated){
                notes.push({title: noteTitle.value,
                    description: noteDescription.value,
                    date: months[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear()});    
            } else{
                isUpdated = false;
                notes[updateId] = {title: noteTitle.value,
                    description: noteDescription.value,
                    date: months[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear()};    
            }
            saveToLocalStorage();
            document.getElementById("close").onclick();
            noteTitle.value = "";
            noteDescription.value = "";
            render();
        }

        else{
            alert('Fields are empty');
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem("letter", JSON.stringify(notes));
    }

    let noteToGet = JSON.parse(localStorage.getItem("letter"))

    if(Array.isArray(noteToGet)) {
        notes = noteToGet;
        render();
    } else{
        notes = [];
    }

    function render(){

        document.querySelectorAll('.note-wrapper').forEach((note) => {note.remove()}) //removing already existing notes

        
        notes.forEach((note, index) => {
            let renderHTML = `<li class="note-wrapper">
                                    <div class="details">
                                        <p> ${ note.title } </p>
                                        <span>${ note.description }</span>
                                    </div>
                                    <div class="bottom">
                                        <span>${ note.date }</span>
                                        <div class="setting">
                                            <i class="uil uil-ellipsis-h" onclick="openSettings(this)"></i>
                                            <ul class="setting-sub">
                                                <li onclick="editNote(${ index }, '${ note.title }', '${note.description}')" ><i class="uil uil-pen"></i>Edit</li>
                                                <li onclick="deleteNote(${ index })" ><i class="uil uil-trash"></i>Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>`;

            addBox.insertAdjacentHTML("afterend", renderHTML);
        })
    }

    function openSettings(elem) {
        elem.parentElement.classList.add("open");

        document.addEventListener("click", (e) => {
            e.preventDefault();
            if(e.target.tagName !== "I" || e.target !== elem) {
                elem.parentElement.classList.remove("open");
            }

        })
    }

    function deleteNote(noteId) {
        let confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete){return;}
        notes.splice(noteId, 1);
        saveToLocalStorage();
        render();
    }

    function editNote(noteId, title, description){
        isUpdated = true;
        updateId = noteId;
        popupBox.classList.remove('visible');
        // createNote.click();
        noteTitle.focus();
        noteTitle.value = title;
        noteDescription.value = description;
        document.querySelector('.popup-p').innerText = "Update a note";
        document.querySelector('.popup-button').innerText = "Update note";
    }
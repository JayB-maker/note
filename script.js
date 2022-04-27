let notes;
let popupBox = document.getElementById('popup-box'),
    addBox = document.querySelector('.add-note'),
    noteTitle = document.getElementById('title'),
    noteDescription = document.getElementById('description');
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function createNote() {
        popupBox.classList.remove('visible');
    }

    function closePopup() {
        popupBox.classList.add('visible');
        noteTitle.value = "";
        noteDescription.value = "";
    }

    function addNote() {
        document.querySelectorAll('.note-wrapper').forEach((note) => {note.remove()}) //removing already existing notes

        if(noteTitle.value || noteDescription.value) {
            notes.push({title: noteTitle.value,
                description: noteDescription.value,
                date: months[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear()});   
                
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
        
        notes.forEach((note) => {
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
                                                <li><i class="uil uil-pen"></i>Edit</li>
                                                <li><i class="uil uil-trash"></i>Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>`;

            addBox.insertAdjacentHTML("afterend", renderHTML);
        })
    }

    function openSettings(elem) {
        elem.parentElement.classList.add("open");
    }

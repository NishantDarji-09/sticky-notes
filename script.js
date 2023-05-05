const noteContainer = document.getElementById("notesApp");
const addNoteButton = noteContainer.querySelector(".addNewNote");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    })

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("are you sure you wish to delete a sticky note?");

        if (doDelete) {
            deleteNote(id, element);
        }
    })

    return element;
}

function addNote() {
    const notes = getNotes();
    const notesObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElement = createNoteElement(notesObject.id, notesObject.content);
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(notesObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((notes) => notes.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
    console.log(newContent);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((notes) => notes.id != id);

    saveNotes(notes);
    noteContainer.removeChild(element);
}

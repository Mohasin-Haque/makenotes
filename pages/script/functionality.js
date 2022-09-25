let boldBtn = document.getElementById("bold");
let italicBtn = document.getElementById("italic");
let underlineBtn = document.getElementById("underline");
let copyBtn = document.getElementById("copy");
let resetBtn = document.getElementById("reset-button");

boldBtn.addEventListener("click", bold);
italicBtn.addEventListener("click", italic);
underlineBtn.addEventListener("click", underline);
copyBtn.addEventListener("click", copy);
resetBtn.addEventListener("click", reset);

function bold() {
  let bold = document.getElementById("note-content").style.fontWeight;
  if (bold == "normal") {
    document.getElementById("note-content").style.fontWeight = "bold";
  } else {
    document.getElementById("note-content").style.fontWeight = "normal";
  }
}

function italic() {
  let italic = document.getElementById("note-content").style.fontStyle;
  if (italic == "normal") {
    document.getElementById("note-content").style.fontStyle = "italic";
  } else {
    document.getElementById("note-content").style.fontStyle = "normal";
  }
}

function underline() {
  let underline = document.getElementById("note-content").style.textDecoration;
  if (underline !== "underline") {
    document.getElementById("note-content").style.textDecoration = "underline";
  } else {
    document.getElementById("note-content").style.textDecoration = "normal";
  }
}

function copy() {
  let copyText = document.getElementById("note-content");
  copyText.select();
  document.execCommand("copy");
  alert("text copied");
}

function reset() {
  document.getElementById("note-content").style.fontWeight = "normal";
  document.getElementById("note-content").style.fontStyle = "normal";
  document.getElementById("note-content").style.textDecoration = "none";
}

const noteListDiv = document.querySelector(".note-list");
let noteID = 1;
function Note(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

// add Event Listeners

function eventListeners() {
  document
    .getElementById("add-note-button")
    .addEventListener("click", addNewNote);
  document.addEventListener("DOMContentLoaded", displayNotes);
  noteListDiv.addEventListener("click", deleteNote);
}

// get item from local storage
function getDataFromLocalStorage() {
  return localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];
}

eventListeners();

// Add New Note

function addNewNote() {
  const noteTitle = document.getElementById("note-title");
  const noteContent = document.getElementById("note-content");

  if (ValidateInput(noteTitle, noteContent)) {
    let notes = getDataFromLocalStorage();
    let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
    noteID++;
    notes.push(noteItem);
    createNote(noteItem);

    // save to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    noteTitle.value = "";
    noteContent.value = "";
  }
}

// Validation for empty fields

function ValidateInput(title, content) {
  if (title.value !== "" && content.value !== "") {
    return true;
  } else {
    if (title.value === "") {
      title.classList.add("warning");
    }
    if (content.value === "") {
      content.classList.add("warning");
    }
    setTimeout(() => {
      title.classList.remove("warning");
      content.classList.remove("warning");
    }, 1600);
  }
}

// Create a new Note div

function createNote(noteItem) {
  const div = document.createElement("div");
  div.classList.add("note-item");
  div.setAttribute("data-id", noteItem.id);
  div.innerHTML = ` 
    <div id="notes" class="card">
        <h3>${noteItem.title}</h3>
           <p>${noteItem.content}</p>
        <button class="delete-note-btn" onClick="deleteNote(this.id)">Delete</button>
    </div>`;
  noteListDiv.appendChild(div);
}

// display all notes from local storage

function displayNotes() {
  let notes = getDataFromLocalStorage();
  if (notes.length > 0) {
    noteID = notes[notes.length - 1].id;
    noteID++;
  } else {
    noteID = 1;
  }
  notes.forEach((item) => {
    createNote(item);
  });
}

// delete note

function deleteNote(e) {
  if (e.target.classList.contains("delete-note-btn")) {
    e.target.parentElement.remove();
    let divID = e.target.parentElement.dataset.id;
    let notes = getDataFromLocalStorage();
    let newNotesList = notes.filter((item) => {
      return item.id !== parseInt(divID);
    });
    localStorage.setItem("notes", JSON.stringify(newNotesList));
  }
  localStorage.removeItem("note");
}

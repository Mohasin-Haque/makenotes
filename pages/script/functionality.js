showNotes();
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

let addBtn = document.getElementById("add-note-button");
addBtn.addEventListener("click", function (e) {
  let addHeading = document.getElementById("note-title");
  let addDescription = document.getElementById("note-content");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addHeading.value, addDescription.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addHeading.value = "";
  addDescription.value = "";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div id="notes" class="card">
        <h3 class="note-title">${index + 1}</h3>
        <p class="note-description">${element}</p>
        <button id="${index}" class="delete-note-btn" onClick="deleteNote(this.id)">Delete</button>
    </div>
        `;
  });

  let notesElement = document.getElementById("notes");
  if (notesObj.legth != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `You have not made any notes. Please add a note to see it here.`;
    console.log(nothing);
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

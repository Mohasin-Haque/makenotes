const sidebar = document.querySelector(".note-sidebar");

const menuBar = document.getElementById("menu-bar");

menuBar.addEventListener("click", () => {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";

    } else {
        sidebar.style.display = "none";

    }
})
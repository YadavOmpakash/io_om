// LOAD
window.onload = function () {
  if (localStorage.getItem("login") === "true") {
    document.getElementById("loginBox").style.display = "none";
    showSection("dashboard");
  }
  loadPosts();
};

// LOGIN
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "om" && p === "123") {
    localStorage.setItem("login", "true");
    location.reload();
  } else {
    document.getElementById("msg").innerText = "Wrong Login";
  }
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}

// SHOW SECTION
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// MENU
function toggleMenu() {
  let s = document.getElementById("sidebar");
  s.style.display = (s.style.display === "none") ? "block" : "none";
}

// POSTS
function addPost() {
  let text = document.getElementById("postText").value;
  if (text === "") return;

  let div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<p>${text}</p><button onclick="this.innerText='Liked'">Like</button>`;

  document.getElementById("postsContainer").prepend(div);

  savePosts();
  document.getElementById("postText").value = "";
}

// SEARCH
function searchPosts() {
  let val = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".post").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(val)
      ? "block"
      : "none";
  });
}

// SAVE
function savePosts() {
  localStorage.setItem("posts", document.getElementById("postsContainer").innerHTML);
}

// LOAD
function loadPosts() {
  let data = localStorage.getItem("posts");
  if (data) {
    document.getElementById("postsContainer").innerHTML = data;
  }
}

// TABLE
function addRow() {
  let name = document.getElementById("name").value;
  if (name === "") return;

  let row = `<tr>
    <td>${name}</td>
    <td><button onclick="this.parentElement.parentElement.remove()">Delete</button></td>
  </tr>`;

  document.getElementById("tableData").innerHTML += row;
}

// ================= USERS =================
let users = JSON.parse(localStorage.getItem("users")) || [];

function save() {
  localStorage.setItem("users", JSON.stringify(users));
}

function render() {
  let html = "";
  users.forEach((u, i) => {
    html += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><button onclick="delUser(${i})">❌</button></td>
      </tr>
    `;
  });

  let table = document.getElementById("data");
  if(table) table.innerHTML = html;
}

function delUser(i) {
  users.splice(i,1);
  save();
  render();
}

// ================= FORM =================
let form = document.getElementById("formData");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    users.push({name, email});
    save();
    render();
    this.reset();
  });
}

// ================= FILE NAME =================
let fileInput = document.getElementById("fileInput");
if(fileInput){
  fileInput.addEventListener("change", function(){
    let file = this.files[0];
    if(file) {
      document.getElementById("fileName").innerText = file.name;
    }
  });
}

// ================= DOWNLOAD =================
function downloadFile() {
  let blob = new Blob(["Hello Om 🚀"], {type:"text/plain"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "file.txt";
  a.click();
}

// ================= CAMERA =================
function startCamera() {
  navigator.mediaDevices.getUserMedia({video:true})
    .then(stream => {
      document.getElementById("camera").srcObject = stream;
    });
}

// ================= IMAGE PREVIEW =================
let imgInput = document.getElementById("imgInput");
if(imgInput){
  imgInput.addEventListener("change", function(){
    let file = this.files[0];
    if(file) {
      document.getElementById("preview").src = URL.createObjectURL(file);
    }
  });
}

// ================= DARK MODE =================
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ================= LOGIN SYSTEM =================

// Page load pe check
window.addEventListener("load", function() {
  if(localStorage.getItem("login") === "true"){
    showMain();
  }
});

// LOGIN
function login(){
  let u = document.getElementById("user").value.trim();
  let p = document.getElementById("pass").value.trim();

  if(u === "" || p === ""){
    document.getElementById("msg").innerHTML = "⚠️ Enter username & password";
    return;
  }

  if(u === "om" && p === "123"){
    localStorage.setItem("login", "true");
    localStorage.setItem("username", u);
    showMain();
  } else {
    document.getElementById("msg").innerHTML = "❌ Invalid Login";
  }
}

// SHOW MAIN
function showMain(){
  let main = document.getElementById("main");
  let loginBox = document.getElementById("loginBox");

  if(main && loginBox){
    main.style.display = "block";
    loginBox.style.display = "none";
  }

  let name = localStorage.getItem("username");
  let title = document.querySelector(".profile h2");

  if(name && title){
    title.innerHTML = "Welcome " + name;
  }

  render(); // login ke baad data load
}

// LOGOUT
function logout(){
  localStorage.clear();
  location.reload();
}

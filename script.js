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
        <td><button onclick="del(${i})">❌</button></td>
      </tr>
    `;
  });
  document.getElementById("data").innerHTML = html;
}

document.getElementById("formData").addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  users.push({name, email});
  save();
  render();
  this.reset();
});

function del(i) {
  users.splice(i,1);
  save();
  render();
}

// FILE UPLOAD
function uploadFile() {
  let file = document.getElementById("fileInput").files[0];
  if(file) {
    document.getElementById("fileName").innerText = "Uploaded: " + file.name;
  }
}

// DOWNLOAD FILE
function downloadFile() {
  let text = "Hello Om 🚀";
  let blob = new Blob([text], {type:"text/plain"});
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sample.txt";
  link.click();
}

// CAMERA
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById("camera").srcObject = stream;
    });
}

// IMAGE PREVIEW
document.getElementById("imgInput").addEventListener("change", function(){
  let file = this.files[0];
  if(file) {
    document.getElementById("preview").src = URL.createObjectURL(file);
  }
});

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}

render();

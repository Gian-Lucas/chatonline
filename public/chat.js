const socket = io();
const inputMessage = document.getElementById("message");
const btnSendMessage = document.getElementById("send-message");
const btnExit = document.getElementById("btn-exit");

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");
const colorUsername = urlSearch.get("color_username");

document.getElementById("room").innerHTML = `Sala ${room} - ${username}`;

socket.emit(
  "select_room",
  {
    username,
    room,
    colorUsername,
  },
  (messages) => {
    messages.forEach((message) => renderMessage(message));
  }
);

socket.on("message", (data) => {
  renderMessage(data);
});

function renderMessage(data) {
  const divMessage = document.querySelector(".message");
  divMessage.innerHTML += `
    <div>
        <span>${data.hours} - </span>
        <strong style="color: #${data.colorUsername};">${data.username}</strong>
        <span>${data.text}</span>
    </div>
    `;

  divMessage.scrollTop = divMessage.scrollHeight;
}

inputMessage.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

btnSendMessage.addEventListener("click", () => {
  sendMessage();
});

btnExit.addEventListener("click", () => {
  window.location.href = "/";
});

function sendMessage() {
  if (inputMessage.value !== "") {
    const message = inputMessage.value;
    const data = {
      username,
      message,
      room,
      colorUsername,
    };
    socket.emit("message", data);

    inputMessage.value = "";
  }
}

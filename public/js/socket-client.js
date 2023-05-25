// ? HTML Refs
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMessage = document.querySelector("#txtMessage");
const btnSend = document.querySelector("#btnSend");

const socket = io();

socket.on("connect", () => {
  lblOnline.style.display = "block";
  lblOffline.style.display = "none";
});

socket.on("disconnect", () => {
  lblOffline.style.display = "block";
  lblOnline.style.display = "none";
});

socket.on("send-message", (payload) => {
  console.log(payload);
});

btnSend.addEventListener("click", () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: "ABC123",
    date: new Date().getTime(),
  };

  socket.emit("send-message", payload, (id) => {
    console.log("From the server", id);
  });
});

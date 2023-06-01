// ? HTML REFS
const lblTicket1 = document.querySelector("#lblTicket1");
const lblDesktop1 = document.querySelector("#lblDesktop1");

const lblTicket2 = document.querySelector("#lblTicket2");
const lblDesktop2 = document.querySelector("#lblDesktop2");

const lblTicket3 = document.querySelector("#lblTicket3");
const lblDesktop3 = document.querySelector("#lblDesktop3");

const lblTicket4 = document.querySelector("#lblTicket4");
const lblDesktop4 = document.querySelector("#lblDesktop4");

const socket = io();

socket.on("current-state", (payload) => {
  const audio = new Audio("./audio/new-ticket.mp3");
  audio.play();

  const [first, second, third, fourth] = payload;

  if (first) {
    lblTicket1.innerText = "Ticket " + first.number;
    lblDesktop1.innerText = first.desktop;
  }

  if (second) {
    lblTicket2.innerText = "Ticket " + second.number;
    lblDesktop2.innerText = second.desktop;
  }

  if (third) {
    lblTicket3.innerText = "Ticket " + third.number;
    lblDesktop3.innerText = third.desktop;
  }

  if (fourth) {
    lblTicket4.innerText = "Ticket " + fourth.number;
    lblDesktop4.innerText = fourth.desktop;
  }
});

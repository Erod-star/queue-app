const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("current-state", ticketControl.lastFourTickets);
  socket.emit("pending-tickets", ticketControl.tickets.length);

  socket.on("next-ticket", (payload, callback) => {
    socket.emit("current-state", ticketControl.lastFourTickets);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);
    const next = ticketControl.next();
    callback(next);
  });

  socket.on("attend-ticket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({ ok: false, msg: "The desktop is mandatory" });
    }
    const ticket = ticketControl.attendTicket(desktop);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);
    socket.emit("pending-tickets", ticketControl.tickets.length);
    socket.broadcast.emit("current-state", ticketControl.lastFourTickets);

    if (!ticket) {
      callback({ ok: false, msg: "There's no pending tickets" });
    } else {
      callback({ ok: true, ticket });
    }
  });
};

module.exports = {
  socketController,
};

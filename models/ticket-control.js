const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFourTickets = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFourTickets: this.lastFourTickets,
    };
  }

  init() {
    const {
      today,
      tickets,
      lastFourTickets,
      last,
    } = require("../db/data.json");
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastFourTickets = lastFourTickets;
    } else {
      this.saveOnDB();
    }
  }

  saveOnDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveOnDB();
    return "Ticket " + ticket.number;
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) return null;

    const ticket = this.tickets.shift(); // this.tickets[0]
    ticket.desktop = desktop;

    this.lastFourTickets.unshift(ticket);

    if (this.lastFourTickets.length > 4) {
      this.lastFourTickets.splice(-1, 1);
    }

    this.saveOnDB();
    return ticket;
  }
}

module.exports = TicketControl;

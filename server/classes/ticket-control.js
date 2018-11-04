const fs = require('fs');

class Ticket {
    constructor(ticket, platform) {
        this.ticket = ticket;
        this.platform = platform;
    }
}

class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.attendingTickets = []; //the last four attending

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
            this.attendingTickets = data.attendingTickets;
        } else {
            this.resetCount();
        }
    }

    //reset all the values to start a new day
    resetCount() {
        this.lastTicket = 0;
        this.tickets = [];
        this.attendingTickets = [];
        this.saveFile();
    }

    //create a new ticket
    nextTicket() {
        console.log('Creating a new ticket...');
        this.lastTicket += 1;
        let ticket = new Ticket(this.lastTicket, null)
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket: ${this.lastTicket}`;
    }

    //get the last ticket created
    getLastTicket() {
        return `Ticket: ${this.lastTicket}`;
    }

    getAttendingTickets() {
        return this.attendingTickets;
    }

    //assign to a specfic platform the next ticket available
    assignTicket(platform) {
        //no exists pending tickets
        if (this.tickets.length === 0) {
            return 'No pending tickets';
        }

        //get first pending ticket
        let ticket = this.tickets[0].ticket;

        //remove attending ticket for the list
        this.tickets.shift();
        let nextTicket = new Ticket(ticket, platform);
        this.attendingTickets.unshift(nextTicket);

        if (this.attendingTickets.length > 4) {
            //remove the last ticket 
            this.attendingTickets.splice(-1, 1);
        }
        this.saveFile();

        return nextTicket;
    }

    ///save data
    saveFile() {
        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            attendingTickets: this.attendingTickets
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}
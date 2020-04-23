const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log('Ticket: ', siguiente);

        // client.emit('siguienteTicket', siguiente);
        callback(siguiente);

    });

    client.on('estadoActual', (data, callback) => {
        let ultimoTicket = ticketControl.getUltimoTicket();
        console.log('Server ultimoTicket: ', ultimoTicket);
        callback(ultimoTicket);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });



    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
    })

});
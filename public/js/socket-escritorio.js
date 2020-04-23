// Conmando para establecer la conexion socket
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('Escritorio')) {
    window.location = 'index.html';
    throw new Error('el escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log('Escritorio', escritorio);
let label = $('small');

$('h1').text('Escritorio ' + escritorio)

$('button').on('click', function() {
    console.log('boton');

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log('Ticket: ', resp);
        if (resp == 'No hay tickets por atender') {
            console.log('2-Ticket: ', resp);
            // label.text('Ticket: ' + resp);
            $('h4').text('Atendiendo a: ' + resp);
            alert(resp);

            return;
        } else {
            // label.text('Ticket: ' + resp.numero);
            $('h4').text('Atendiendo a: ' + resp.numero);
        }
    });
});

// socket.on('connect', function() {
//     console.log('Conectado..');
// });

// socket.on('disconnect', function() {
//     console.log('Perdimos conexion con el servidor');
// })

// socket.emit('enviarMensaje', {
//     usuario: 'Jose',
//     mensaje: 'Hola mundo'
// }, function(resp) {
//     console.log('Resp del servidor enviarMensaje: ', resp);
// });

// $('button').on('click', function() {
//     console.log('boton');
//     socket.emit('siguienteTicket', null, function(resp) {
//         console.log('Ticket: ' + resp);
//         label.text('Ticket: ' + resp);
//     });
// });



// socket.on('estadoActual', function(resp) {
//     console.log('Resp del servidor ultimoTicket: ', resp);
//     label.text(resp.actual)
// });
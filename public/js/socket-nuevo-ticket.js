// Conmando para establecer la conexion socket
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado..');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

socket.emit('enviarMensaje', {
    usuario: 'Jose',
    mensaje: 'Hola mundo'
}, function(resp) {
    console.log('Resp del servidor enviarMensaje: ', resp);
});

$('button').on('click', function() {
    console.log('boton');
    socket.emit('siguienteTicket', null, function(resp) {
        console.log('Ticket: ' + resp);
        label.text('Ticket: ' + resp);
    });
});



socket.on('estadoActual', function(resp) {
    console.log('Resp del servidor ultimoTicket: ', resp);
    label.text(resp.actual)
});
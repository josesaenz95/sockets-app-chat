var socket = io();

// let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('Nombre y Sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('getInChat', usuario, (resp) => {
        // console.log(resp);
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
    renderizarUsuarios(usuarios);
});

socket.on('offChat', (mensaje) => {
    console.log('Servidor: ', mensaje);
    renderizarMensajes(mensaje, false);
})

socket.on('onChat', (usuarios) => {
    console.log(usuarios);
    renderizarUsuarios(usuarios);
})

socket.on('sendMessage', (data) => {
    // console.log(data);
    renderizarMensajes(data, false);
    scrollBottom();
})

// Mensajes privados
socket.on('privateMessage', (message) => {
    console.log('Mensaje Privado: ', message);
})
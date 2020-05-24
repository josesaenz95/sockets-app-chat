const { io } = require('../server');
const { Usuario } = require('../classes/usuario');
const { sendMessage } = require('../utils/utils');

const usuario = new Usuario();

io.on('connection', (client) => {

    client.on('getInChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                message: 'Nombre y Sala son necesarios'
            })
        }

        client.join(data.sala);

        let personas = usuario.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('onChat', usuario.obtenerPorSala(data.sala));

        callback(usuario.obtenerPorSala(data.sala));
    })

    client.on('sendMessage', (data) => {

        let persona = usuario.obtenerPorId(client.id);

        let mensaje = sendMessage(persona.nombre, data.message);
        client.broadcast.to(persona.sala).emit('sendMessage', mensaje);
    })

    client.on('disconnect', () => {
        let borrada = usuario.borrarPersona(client.id);

        client.broadcast.to(borrada.sala).emit('offChat', sendMessage('Administrador', `${borrada.nombre} se ha desconectado del chat`));
        client.broadcast.to(borrada.sala).emit('onChat', usuario.obtenerPorSala(borrada.sala));
    })

    // Mensajes Privados
    client.on('privateMessage', (data) => {
        let persona = usuario.obtenerPorId(client.id);

        client.broadcast.to(data.para).emit('privateMessage', sendMessage(persona.nombre, data.message));
    })

});
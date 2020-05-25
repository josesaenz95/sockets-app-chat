/**
 * Funciones para renderizar usuarios
 */

let params = new URLSearchParams(window.location.search);

let nombre = params.get('nombre');
let sala = params.get('sala');

let div = document.querySelector('#divUsuarios');
let form = document.querySelector('#formEnviar');
let txtMensaje = document.querySelector('#txtMensaje');
let divChatbox = document.querySelector('#divChatbox');


function renderizarUsuarios(personas) {
    console.log(personas);

    let html = `
    <li>
    <a href="javascript:void(0)" class="active"> Chat de <span id="spnChat"> ${params.get('sala')}</span></a>
    </li> 
    `

    for (let i = 0; i < personas.length; ++i) {
        html += `
        <li>
        <a id="aPersonas" data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>
        </li>`;
    }
    div.innerHTML = '';
    div.insertAdjacentHTML('afterbegin', html);

}

function renderizarMensajes(mensaje, yo) {
    let html = '';

    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    let adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html = `
        <li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
        </li>
    `;
    } else {
        // <div class="box bg-light-info">${mensaje.mensaje}</div>
        html = `
        <li class="animated fadeIn">
            <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
            </div>
            <div class="chat-time">${hora}</div>
        </li>
    `;
    }

    divChatbox.insertAdjacentHTML('beforeend', html);
}

document.body.addEventListener('click', function(e) {
    // console.log(e);
    if (e.target.id == 'aPersonas') {
        let id = e.target.attributes[1].value;
        if (id) {
            console.log(id);
        }
    }
});

form.addEventListener('click', function(e) {
    e.preventDefault();

    if (txtMensaje.value.trim().length === 0) {
        return;
    }

    socket.emit('sendMessage', {
        nombre: nombre,
        message: txtMensaje.value,
    }, (mensaje) => {
        txtMensaje.value = '';
        txtMensaje.focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    })

})

function scrollBottom() {

    var divChat = $('#divChatbox');
    // selectors
    var newMessage = divChat.children('li:last-child');

    // heights
    var clientHeight = divChat.prop('clientHeight');
    var scrollTop = divChat.prop('scrollTop');
    var scrollHeight = divChat.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChat.scrollTop(scrollHeight);
    }
}
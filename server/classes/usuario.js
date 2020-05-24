/**
 * 
 */

class Usuario {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);

        return this.personas;
    }

    obtenerPersonas() {
        return this.personas;
    }

    obtenerPorId(id) {
        let persona = this.personas.filter(p => p.id === id)[0];

        return persona;
    }


    obtenerPorSala(sala) {
        let personasEnSala = this.personas.filter(p => p.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {

        let persona = this.obtenerPorId(id);

        this.personas = this.personas.filter(p => p.id !== id);

        return persona;
    }

}

module.exports = {
    Usuario
}
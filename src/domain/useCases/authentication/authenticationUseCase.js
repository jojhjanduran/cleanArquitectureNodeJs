'use strict'

class AuthenticationUseCase{
    
    constructor({ userRepository }={}){
        this.userRepository = userRepository;
    }

    async authentication(correo,clave,getHash){
        if(!correo){
            throw new Error('La propiedad correo debe ser obligatoria');
        }
        if(!clave){
            throw new Error('La propiedad clave debe ser obligatoria');
        }
        if(!getHash){
            throw new Error('La propiedad getHash debe ser obligatoria');
        }
        const usuario = await this.userRepository.getUserByEmail(correo);
        if(!usuario){
            return null;
        }
    }
}

module.exports = AuthenticationUseCase
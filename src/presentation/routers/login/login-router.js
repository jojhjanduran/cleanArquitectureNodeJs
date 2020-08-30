"use strict";

const HttpResponse = require('../../helpers/http-response');

class LoginRouter{

    constructor({ authUseCase } = {}){
        this.authUseCase = authUseCase;
    }

   async login(httpRequest){
        try{
            const { correo, clave , getHash } = httpRequest.body;
            if(!correo){
                return HttpResponse.badRequest(new Error(`La propiedad correo debe ser obligatoria`));
            }
            if(!clave){
                return HttpResponse.badRequest(new Error(`La propiedad clave debe ser obligatoria`));
            }
            if(!getHash){
                return HttpResponse.badRequest(new Error(`La propiedad getHash debe ser obligatoria`));
            }
            const accessToken = await this.authUseCase.authentication(correo,clave,getHash);
            if(!accessToken){
                return HttpResponse.unauthorizedError('Los campos no son correctos');
            }
            return HttpResponse.ok({ accessToken })
        }catch(error){
            return HttpResponse.serverSideError(error);
        }
    }
}

module.exports = LoginRouter
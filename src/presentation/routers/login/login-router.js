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
                return HttpResponse.badRequest(new Error(`No se encontro parametro correo`));
            }
            if(!clave){
                return HttpResponse.badRequest(new Error(`No se encontro parametro clave`));
            }
            if(!getHash){
                return HttpResponse.badRequest(new Error(`No se encontro parametro getHash`));
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
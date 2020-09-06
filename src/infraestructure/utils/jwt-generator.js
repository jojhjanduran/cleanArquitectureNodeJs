const jwt = require('jwt-simple');

class TokenGenerator{
    async generate(usuario){
        let payload = {
            sub: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            cargo: usuario.cargo,
            rol: usuario.rol,
            // iat: moment().unix(),
            // exp: moment().add(1,'days').unix()
        };
        return jwt.encode(payload,'clave_secreta');
    }
}

//TODO: agregar libreria momentJs para el manejo del tiempo de expiración del token
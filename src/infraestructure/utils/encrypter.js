const bcrypt = require('bcrypt');
class Encrypter{
    async compare(value,hash){
        if(!value){
            throw new Error('El parametro value es obligatorio');
        }
        if(!hash){
            throw new Error('El parametro hash es obligatorio');
        }
        const isValid = await bcrypt.compare(value,hash);
        return isValid;
    }
}
module.exports = Encrypter; 
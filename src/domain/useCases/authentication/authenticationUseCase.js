"use strict";

class AuthenticationUseCase {
  constructor({ userRepository,encrypter,tokenGenerator } = {}) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator
  }

  async authentication(correo, clave, getHash) {
    try {
      if (!correo) {
        throw new Error("La propiedad correo debe ser obligatoria");
      }
      if (!clave) {
        throw new Error("La propiedad clave debe ser obligatoria");
      }
      if (!getHash) {
        throw new Error("La propiedad getHash debe ser obligatoria");
      }
      const usuario = await this.userRepository.getUserByEmail(correo);
      const isValid = usuario && await this.encrypter.compare(clave,usuario.clave);
      if(!isValid){
        return null;
      }
      const accessToken = await this.tokenGenerator.generate(usuario.id);
      return accessToken;
    } catch (error) {
        throw error;
    }
  }
}

module.exports = AuthenticationUseCase;

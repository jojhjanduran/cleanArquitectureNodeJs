"use strict";
const AuthenticationUseCase = require("./authenticationUseCase");

const getAuthenticationUseCaseInstance = () => {
  const userRepositoryTest = getUserByEmailRepository();
  const authenticationUseCaseInstance = new AuthenticationUseCase({ userRepository: userRepositoryTest });
  return { authenticationUseCaseInstance, userRepositoryTest};
};

const getUserByEmailRepository = () => {
  class UserRepository {
    async getUserByEmail(correo) {
      this.correo = correo;
      return this.usuario;
    }
  }
  const userRepository = new UserRepository();
  userRepository.usuario = {
    id: "any_id",
    correo: "ejemplo@ejemplo.com",
    clave: "clave_valida",
    getHash: true,
  };
  return userRepository;
};

module.exports = {
  getAuthenticationUseCaseInstance,
  getUserByEmailRepository,
};

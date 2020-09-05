"use strict";
const AuthenticationUseCase = require("./authenticationUseCase");

const getAuthenticationUseCaseInstance = () => {
  const userRepositoryTest = getUserRepository();
  const encrypterTest = getEncrypter();
  const tokenGeneratorTest = getTokenGenerator();
  const authenticationUseCaseInstance = new AuthenticationUseCase({ userRepository: userRepositoryTest, encrypter: encrypterTest,tokenGenerator: tokenGeneratorTest });
  return { authenticationUseCaseInstance, userRepositoryTest, encrypterTest, tokenGeneratorTest};
};

const getUserRepository = () => {
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

const getEncrypter = ()=>{
  class EncrypterTest{
    async compare(clave,hash){
      this.clave = clave;
      this.hash = hash;
      return this.isValid;
    }
  }
  const encrypterTest = new EncrypterTest();
  encrypterTest.isValid = true;
  return encrypterTest;
}

const getTokenGenerator = ()=>{
  class TokenGeneratorTest{
    async generate(idUser){
      this.idUser = idUser;
      return this.token;
    }
  }
  const tokenGeneratorTest = new TokenGeneratorTest();
  tokenGeneratorTest.token = 'any_token';
  return tokenGeneratorTest;
}

module.exports = {
  getAuthenticationUseCaseInstance,
  getUserRepository,
  getEncrypter,
  getTokenGenerator
};

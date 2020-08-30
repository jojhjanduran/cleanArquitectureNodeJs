"use strict";
const LoginRouter = require("./login-router");

const getloginRouterInstance = () => {
  const authUseCaseTest = getAuthUseCase();
  const loginRouterInstance = new LoginRouter({ authUseCase: authUseCaseTest });
  return { loginRouterInstance, authUseCaseTest };
};

const getAuthUseCase = () => {
  class AuthUseCaseTest {
    async authentication(correo, clave, getHash) {
      return this.accessToken;
    }
  }

  const authUseCaseTest = new AuthUseCaseTest();
  authUseCaseTest.accessToken = "valid_token";
  return authUseCaseTest;
};

module.exports = {
  getloginRouterInstance,
  getAuthUseCase,
};

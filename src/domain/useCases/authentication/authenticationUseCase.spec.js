"use strict";
const {
  getAuthenticationUseCaseInstance,
  getUserRepository,
  getEncrypter,
} = require("./authenticactionUseCaseTest");
const AuthenticationUseCase = require("./authenticationUseCase");

describe("AuthenticationUseCase", () => {
  test("Deberia arrojar excepción si el parametro correo no se envia ", async () => {
    const {
      authenticationUseCaseInstance,
    } = getAuthenticationUseCaseInstance();
    const promise = authenticationUseCaseInstance.authentication();
    expect(promise).rejects.toThrow(
      new Error("La propiedad correo debe ser obligatoria")
    );
  });
  test("Deberia arrojar excepción si el parametro clave no se envia ", async () => {
    const {
      authenticationUseCaseInstance,
    } = getAuthenticationUseCaseInstance();
    const promise = authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com"
    );
    expect(promise).rejects.toThrow(
      new Error("La propiedad clave debe ser obligatoria")
    );
  });
  test("Deberia arrojar excepción si el parametro getHash no se envia ", async () => {
    const {
      authenticationUseCaseInstance,
    } = getAuthenticationUseCaseInstance();
    const promise = authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com",
      "clave_valida"
    );
    expect(promise).rejects.toThrow(
      new Error("La propiedad getHash debe ser obligatoria")
    );
  });
  test("Deberia arrojar null si no encontro usuario con el correo enviado", async () => {
    const {
      authenticationUseCaseInstance,
      userRepositoryTest,
    } = getAuthenticationUseCaseInstance();
    userRepositoryTest.usuario = null;
    const accessToken = await authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com",
      "clave_valida",
      true
    );
    expect(accessToken).toBeNull();
  });
  test("Deberia llamar correctamente al encrypterTest con los parametros correctos", async () => {
    const {
      authenticationUseCaseInstance,
      encrypterTest
    } = getAuthenticationUseCaseInstance();
    await authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com",
      "clave_valida",
      true
    );
    expect(encrypterTest.isValid).toBe(true);
  });
  test("Deberia retornar null si en el encripyterTest los parametros son incorrectos", async () => {
    const {
      authenticationUseCaseInstance,
      encrypterTest
    } = getAuthenticationUseCaseInstance();
    await authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com",
      "clave_invalida",
      true
    );
    encrypterTest.isValid = false;
    expect(encrypterTest.isValid).toBe(false);
  });
  test("Deberia llamar correctamente al tokenGeneratorTest con los parametros correctos", async () => {
    const {
      authenticationUseCaseInstance,
      tokenGeneratorTest
    } = getAuthenticationUseCaseInstance();
    const accessToken = await authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com",
      "clave_valida",
      true
    );
    expect(tokenGeneratorTest.token).toBe(accessToken);
  });
  test("Deberia retornar null si no genera el token de acceso", async () => {
    const {
      authenticationUseCaseInstance,
      tokenGeneratorTest
    } = getAuthenticationUseCaseInstance();
    const accessToken = await authenticationUseCaseInstance.authentication(
      "ejemplo@ejemplo.com",
      "clave_valida",
      true
    );
    tokenGeneratorTest.token = null;
    expect(tokenGeneratorTest.token).toBeNull();
  });
  test('Deberia retornar error si no se envian las inyecciones correspondientes', () => {
    const invalid = {};
    const userRepositoryTest = getUserRepository();
    const encrypterTest = getEncrypter();
    const instances = [].concat(
      new AuthenticationUseCase(),
      new AuthenticationUseCase({}),
      new AuthenticationUseCase({
        userRepository: invalid,
      }),
      new AuthenticationUseCase({
        userRepository: userRepositoryTest,
        encrypter: invalid
      }),
      new AuthenticationUseCase({
        userRepository: userRepositoryTest,
        encrypter: encrypterTest,
        tokenGenerator: invalid
      }),
    );
    for (const instance of instances) {
      const promise = instance.authentication(
        "ejemplo@ejemplo.com",
        "clave_valida",
        true
      );
       expect(promise).rejects.toThrow();
    }
  });
});

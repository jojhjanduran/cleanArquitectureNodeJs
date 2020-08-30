const LoginRouter = require("./login-router");
const { getloginRouterInstance, getAuthUseCase } = require('./login-router-test');


describe("Login Router", () => {
  test("Deberia retonar 400 si no tiene el parametro correo asociado", async () => {
    const { loginRouterInstance } = getloginRouterInstance();
    const httpRequest = {
      body: {
        clave: "clave_valida",
      },
    };
    const httpResponse = await loginRouterInstance.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("NotFoundError");
  });
  test("Deberia retonar 400 si no tiene el parametro clave asociado", async () => {
    const { loginRouterInstance } = getloginRouterInstance();
    const httpRequest = {
      body: {
        correo: "ejemplo@ejemplo.com",
      },
    };
    const httpResponse = await loginRouterInstance.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("NotFoundError");
  });
  test("Deberia retonar 400 si no tiene el parametro getHash asociado", async () => {
    const { loginRouterInstance } = getloginRouterInstance();
    const httpRequest = {
      body: {
        correo: "ejemplo@ejemplo.com",
        clave: "clave_valida",
      },
    };
    const httpResponse = await loginRouterInstance.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("NotFoundError");
  });
  test("Deberia retornar 500 si no tiene una petición Http asociado ", async () => {
    const { loginRouterInstance } = getloginRouterInstance();
    const httpResponse = await loginRouterInstance.login();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body.message).toBe("ServerSideError");
  });
  test("Deberia retornar 500 si no tiene un body incluido en la petición Http asociada ", async () => {
    const { loginRouterInstance } = getloginRouterInstance();
    const httpResponse = await loginRouterInstance.login({});
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body.message).toBe("ServerSideError");
  });
  test("Deberia funcionar el authUseCase con los parametros correctos", async () => {
    const { loginRouterInstance, authUseCaseTest } = getloginRouterInstance();
    const httpRequest = {
      body: {
        correo: "ejemplo@ejemplo.com",
        clave: "clave_valida",
        getHash: true,
      },
    };
    await loginRouterInstance.login(httpRequest);
    expect(authUseCaseTest.accessToken).toBe("valid_token");
  });
  test("Deberia retornar 401 si las credenciales son incorrectas", async () => {
    const { loginRouterInstance, authUseCaseTest } = getloginRouterInstance();
    const httpRequest = {
      body: {
        correo: "ejemplo@ejemplo.com",
        clave: "clave_valida",
        getHash: true,
      },
    };
    authUseCaseTest.accessToken = null;
    const httpResponse = await loginRouterInstance.login(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
  });
  test("Deberia retornar 200 si las credenciales son correctas", async () => {
    const { loginRouterInstance, authUseCaseTest } = getloginRouterInstance();
    const httpRequest = {
      body: {
        correo: "ejemplo@ejemplo.com",
        clave: "clave_valida",
        getHash: true,
      },
    };
    const httpResponse = await loginRouterInstance.login(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.accessToken).toBe(authUseCaseTest.accessToken);
  });
  test("Deberia retornar 500 si las no se tienen las dependencias inyectadas correctamente ", async () => {
    const invalid = {};
    const authUseCase = getAuthUseCase();
    const instances = [].concat(
      new LoginRouter(),
      new LoginRouter({}),
      new LoginRouter({
        authUseCase: invalid,
      })
    );
    for (const instance of instances) {
        const httpRequest = {
          body: {
            correo: 'any_email@mail.com',
            clave: 'any_password',
            getHash:true
          }
        }
        const httpResponse = await instance.login(httpRequest);
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.message).toBe('ServerSideError')
      }
  });
});

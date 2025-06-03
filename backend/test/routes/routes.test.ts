import request from 'supertest';
import express from 'express';

jest.mock('../../src/middlewares/authentication', () => ({
    authentication: jest.fn((req, res, next) => next()),
}));

jest.mock('../../src/middlewares/authorization', () => ({
    authorization: jest.fn((req, res, next) => next()),
}));

// Para cada controller, vamos criar mocks com jest.fn para espiar as chamadas
const createUserMock = jest.fn((req, res) => res.status(201).json({ message: "Usuário criado" }));
const listUserMock = jest.fn((req, res) => res.status(200).json([{ id: "1", name: "Usuário Teste" }]));
const editUserMock = jest.fn((req, res) => res.status(200).json({ message: "Usuário editado" }));
const removeUserMock = jest.fn((req, res) => res.status(204).send());
const getSessionMock = jest.fn((req, res) => res.status(200).json({ token: "fake-jwt-token" }));
const insertFavoriteMock = jest.fn((req, res) => res.status(201).json({ message: "Favorito inserido" }));
const getFavoriteMock = jest.fn((req, res) => res.status(200).json([{ id: 1, title: "Produto Teste" }]));
const removeFavoriteMock = jest.fn((req, res) => res.status(204).send());

// Agora mockamos os controllers exportados com execute chamando nossos mocks
jest.mock('../../src/useCases/User/Create', () => ({
    createUserController: { execute: createUserMock },
}));
jest.mock('../../src/useCases/User/List', () => ({
    listUserController: { execute: listUserMock },
}));
jest.mock('../../src/useCases/User/Edit', () => ({
    editUserController: { execute: editUserMock },
}));
jest.mock('../../src/useCases/User/Remove', () => ({
    removeUserController: { execute: removeUserMock },
}));
jest.mock('../../src/useCases/Session/Get', () => ({
    getSessionController: { execute: getSessionMock },
}));
jest.mock('../../src/useCases/Favorite/Insert', () => ({
    insertFavoriteController: { execute: insertFavoriteMock },
}));
jest.mock('../../src/useCases/Favorite/Get', () => ({
    getFavoriteController: { execute: getFavoriteMock },
}));
jest.mock('../../src/useCases/Favorite/Remove', () => ({
    removeFavoriteController: { execute: removeFavoriteMock },
}));

import { router } from '../../src/routes';

const app = express();
app.use(express.json());
app.use(router);

describe('Testa todas rotas da API', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST /usuario deve criar usuário e chamar controller', async () => {
        const res = await request(app).post('/usuario').send({
            name: "João",
            email: "joao@example.com",
            password: "123456",
            role: "client"
        });
        expect(res.statusCode).toBe(201);
        expect(createUserMock).toHaveBeenCalledTimes(1);
    });

    it('GET /usuarios deve listar usuários e chamar controller', async () => {
        const res = await request(app).get('/usuarios');
        expect(res.statusCode).toBe(200);
        expect(listUserMock).toHaveBeenCalledTimes(1);
    });

    it('PUT /usuario/:id deve editar usuário e chamar controller', async () => {
        const res = await request(app).put('/usuario/1').send({ name: "Novo Nome" });
        expect(res.statusCode).toBe(200);
        expect(editUserMock).toHaveBeenCalledTimes(1);
    });

    it('DELETE /usuario/:id deve remover usuário e chamar controller', async () => {
        const res = await request(app).delete('/usuario/1');
        expect(res.statusCode).toBe(204);
        expect(removeUserMock).toHaveBeenCalledTimes(1);
    });

    it('POST /login deve criar sessão e chamar controller', async () => {
        const res = await request(app).post('/login').send({ email: "joao@example.com", password: "123456" });
        expect(res.statusCode).toBe(200);
        expect(getSessionMock).toHaveBeenCalledTimes(1);
    });

    it('GET /teste deve executar removeUserController e chamar controller', async () => {
        const res = await request(app).get('/teste');
        expect(res.statusCode).toBe(204);
        expect(removeUserMock).toHaveBeenCalledTimes(1);
    });

    it('POST /favoritos deve inserir favorito e chamar controller', async () => {
        const res = await request(app).post('/favoritos').send({ id_product: 1 });
        expect(res.statusCode).toBe(201);
        expect(insertFavoriteMock).toHaveBeenCalledTimes(1);
    });

    it('GET /favoritos deve listar favoritos e chamar controller', async () => {
        const res = await request(app).get('/favoritos');
        expect(res.statusCode).toBe(200);
        expect(getFavoriteMock).toHaveBeenCalledTimes(1);
    });

    it('DELETE /favoritos/:idProduct deve remover favorito e chamar controller', async () => {
        const res = await request(app).delete('/favoritos/1');
        expect(res.statusCode).toBe(204);
        expect(removeFavoriteMock).toHaveBeenCalledTimes(1);
    });

    // Exemplo de teste de erro (controller lança erro)
    it('Deve lidar com erro do controller no POST /usuario', async () => {
        createUserMock.mockImplementationOnce((req, res) => {
            throw new Error('Erro inesperado');
        });
        const res = await request(app).post('/usuario').send({
            name: "Erro",
            email: "erro@example.com",
            password: "123456",
            role: "client"
        });
        // Como o controller lança erro, espera status 500 (ou middleware de erro que você tenha)
        expect(res.statusCode).toBe(500);
    });

});

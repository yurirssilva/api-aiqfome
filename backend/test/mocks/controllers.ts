export const createUserController = {
    execute: jest.fn((req, res) => res.status(201).json({ message: "Usuário criado" })),
};

export const listUserController = {
    execute: jest.fn((req, res) => res.status(200).json([{ id: "1", name: "Usuário Teste" }])),
};

export const editUserController = {
    execute: jest.fn((req, res) => res.status(200).json({ message: "Usuário editado" })),
};

export const removeUserController = {
    execute: jest.fn((req, res) => res.status(204).send()),
};
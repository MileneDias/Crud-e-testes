import truncate from '../untils/truncate';
import request from 'supertest';
import app from '../../src/app';
import Produto from '../../src/app/models/produto';

describe('Teste de produto', () => {

    beforeAll(async() => {
        await truncate();
    });

    it('Deveria criar um novo produto', async () => {
        expect.assertions(2);

        const produto = {
            nome: 'chocolate',
            preco: 4.99,
            disponivel: true
        };

        const response = await request (app)
            .post('/produtos')
            .send(produto);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('id');
    });

    it('Deveria retornar erro 400 ao inserir produto sem nome', async () => {
        expect.assertions(3);

        const produto = {
            preco: 50,
            disponivel: false
        };

        const response = await request (app)
            .post('/produtos')
            .send(produto);
        expect(response.statusCode).toBe(400)
        expect(response.body.data).toHaveProperty('msg');
        expect(response.body.data.msg).toBe('Nome do produto Obrigatório');
    })

    it('Deveria retornar erro 400 ao inserir produto sem preço', async () => {
        expect.assertions(3);

        const produto = {
            nome: "suco de laranja",
            disponivel: false
        };

        const response = await request (app)
            .post('/produtos')
            .send(produto);
        expect(response.statusCode).toBe(400)
        expect(response.body.data).toHaveProperty('msg');
        expect(response.body.data.msg).toBe('Preço do produto Obrigatório');
    })

    it('Deveria retornar a lista de produtos', async () => {
        expect.assertions(3);

        const response = await request(app)
            .get('/produtos');

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    //1. teste com filtro de nome
    //2. teste com filtro de disponibilidade
    //3. teste com os dois filtros

    it('Deveria retornar a lista de prosutos para um filtro por nome', async () => {
        expect.assertions(3);

        const response = await request(app)
            .get('/produtos?nome=chocolate');

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('Deveria retornar a disponibilidade de um produto', async () => {
        expect.assertions(3);

        const response = await request(app)
            .get('/produtos?disponivel=true');
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBeGreaterThan(0);
    })

    it('Deveria retornar o nome e a disponibilidade do produto', async () => {
        expect.assertions(3);

        const response = await request(app)
            .get('/produtos?nome=chocolate&disponivel=true')
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('Deveria atualizar um registro existente', async () => {
        expect.assertions(2);

        const produto = await Produto.create({
            nome: 'teclado Razer',
            preco: 600,
            disponivel: true
        });

        const response = await request(app)
            .put(`/produtos/${produto.id}`)
            .send({
                nome: 'teclado Razer',
                preco: 600,
                disponivel: true
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
    })

    it('Deveria retornar erro 404 ao tentar atualizar um produto inexistente', async () => {
        expect.assertions(1);

        const response = await request(app)
            .put(`/produtos/0`)
            .send({
                nome: 'teclado Razer',
                preco: 600,
                disponivel: true
            });

        expect(response.statusCode).toBe(404);
    })

    it('Deveria deletar um produto existente', async () => {
        expect.assertions(1);

        const produto = await Produto.create({
            nome: 'fone de ouvido',
            preco: 32,
            disponivel: true
        });

        const response = await request(app)
            .delete(`/produtos/${produto.id}`)
            .send({
                nome: 'fone de ouvido',
                preco: 32,
                disponivel: true
            });
        expect(response.statusCode).toBe(200);
    });

    it('Deveria retornar erro 404 ao tentar deletar um produto inexistente', async () => {
        expect.assertions(1);

        const response = await request(app)
            .put(`/produtos/0`)
            .send({
                nome: 'nokia 3001',
                preco: 500,
                disponivel: true
            });

        expect(response.statusCode).toBe(404);
    });
});
import { describe, expect, jest, it} from '@jest/globals';
import app from '../../app.js';
import request from 'supertest';


let server;
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GET em /editoras', () => {
    it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
        .get('/editoras')
        .set('Accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
    });
});

describe('GET em /editoras', () => {
    it('Deve retornar um recurso selecionado', async () => {
        await request(app)
        .get(`/editoras/${idResposta}`)
        .expect(200);
    });
});


let idResposta;
describe('POST em /editoras', () => { 
  it('Deve adicionar uma nova editora', async () => { 
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 's@s.com',
      })
        .expect(201);

    idResposta = resposta.body.content.id
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
    .post('/editoras')
    .send({})
    .expect(400);
  });
}); 

describe('PUT em /editoras/id', () => {
    test.each([
        ['nome', {nome: 'Casa do Codigo'}],
        ['cidade', {cidade: 'SP'}],
        ['email', {email: 'cdc@cdc.com'}],
    ])('Deve alterar o campo nome %s', async (chave, param) => {
        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request');
        await request(app)
        .put(`/editoras/${idResposta}`)
        .send(param)
        .expect(204);

        expect(spy).toHaveBeenCalled();
    });
});

describe('DELETE em /editoras', () => {
    it('Deletar um recurso adicionado', async () => {
        await request(app)
        .delete(`/editoras/${idResposta}`)
        .expect(200);
    });
});


const request = require('supertest')

describe('Consultas API local', () => {
    it('Deve trazer como resposta os dados de todas as pessoas', async () => {
        const resp = await request('http://localhost:8081').get('/people')

        expect(resp.status).toBe(200)
    });

    it('Deve trazer como resposta os dados de uma pessoa específica, quando a pessoa existir', async () => {
        const resp = await request('http://localhost:8081').get('/people/1')

        expect(resp.status).toBe(200)
        expect(resp.body.name).toBe("Luke Skywalker")
    });


    it('Deve trazer como resposta status 404, quando a pessoa não existir', async () => {
        const resp = await request('http://localhost:8081').get('/people/200')

        expect(resp.status).toBe(404)
    });
});

